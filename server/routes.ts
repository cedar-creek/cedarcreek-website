import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertAssessmentSchema, 
  insertContactSchema,
  insertNewsletterSchema,
  insertBookingSchema,
  insertIntakeSchema
} from "@shared/schema";
import { format } from "date-fns";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for handling assessment form data
  app.post("/api/assessment", async (req: Request, res: Response) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      res.status(201).json(assessment);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/assessment/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      
      res.status(200).json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/assessment/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      
      const assessmentData = insertAssessmentSchema.partial().parse(req.body);
      const updatedAssessment = await storage.updateAssessment(id, assessmentData);
      
      res.status(200).json(updatedAssessment);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // API route for handling contact form submissions
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // API route for newsletter subscriptions
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.createNewsletter(newsletterData);
      res.status(201).json(newsletter);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // API routes for booking management
  app.post("/api/booking", async (req: Request, res: Response) => {
    try {
      // Parse & validate request body using schema
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Check date format and convert to Date object if needed
      if (typeof bookingData.date === 'string') {
        bookingData.date = new Date(bookingData.date);
      }
      
      // Save to storage
      const booking = await storage.createBooking(bookingData);
      
      res.status(201).json(booking);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  app.get("/api/booking/available-slots", async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
      
      if (!date) {
        return res.status(400).json({
          message: "Date parameter is required"
        });
      }
      
      const selectedDate = new Date(date as string);
      
      // Get existing bookings for this date
      const existingBookings = await storage.getBookingsByDate(selectedDate);
      
      // Create a list of all possible time slots
      const allTimeSlots = [
        { time: "09:00", formattedTime: "9:00 AM" },
        { time: "10:00", formattedTime: "10:00 AM" },
        { time: "11:00", formattedTime: "11:00 AM" },
        { time: "13:00", formattedTime: "1:00 PM" },
        { time: "14:00", formattedTime: "2:00 PM" },
        { time: "15:00", formattedTime: "3:00 PM" },
        { time: "16:00", formattedTime: "4:00 PM" }
      ];
      
      // Mark slots as unavailable if they're already booked
      const availableTimeSlots = allTimeSlots.map(slot => {
        const isBooked = existingBookings.some(booking => booking.time === slot.time);
        return {
          ...slot,
          available: !isBooked
        };
      });
      
      res.status(200).json({
        date: format(selectedDate, "yyyy-MM-dd"),
        timeSlots: availableTimeSlots
      });
    } catch (error) {
      console.error("Error fetching available slots:", error);
      res.status(500).json({ 
        message: "Failed to fetch available time slots" 
      });
    }
  });

  // API route for full assessment submissions
  app.post("/api/assessments", async (req: Request, res: Response) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      
      // Forward to ClickUp if configured
      const clickupApiToken = process.env.CLICKUP_API_TOKEN;
      const clickupListId = process.env.CLICKUP_LIST_ID;
      
      if (clickupApiToken && clickupListId) {
        try {
          const taskData = {
            name: `[ASSESSMENT] ${assessmentData.company || 'Unknown'} - Full Assessment`,
            description: `
Full AI Readiness Assessment Submission
========================================
Contact: ${assessmentData.name} (${assessmentData.email})
Phone: ${assessmentData.phone || 'N/A'}
Company: ${assessmentData.company}
Industry: ${assessmentData.industry || 'N/A'}
Size: ${assessmentData.size || 'N/A'}
AI Interests: ${Array.isArray(assessmentData.aiInterests) ? assessmentData.aiInterests.join(', ') : (assessmentData.aiInterests || 'N/A')}
AI Challenges: ${assessmentData.aiChallenges || 'N/A'}
Submitted: ${new Date().toISOString()}
            `.trim(),
            status: "to do",
            priority: 1,
            tags: ["website-lead", "full-assessment"]
          };

          await fetch(`https://api.clickup.com/api/v2/list/${clickupListId}/task`, {
            method: 'POST',
            headers: {
              'Authorization': clickupApiToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
          });
        } catch (clickupError) {
          console.error("ClickUp submission failed:", clickupError);
        }
      }
      
      res.status(201).json(assessment);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Assessment error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // API route for intake form submissions (lead qualification)
  app.post("/api/intake", async (req: Request, res: Response) => {
    try {
      const intakeData = insertIntakeSchema.parse(req.body);
      
      // Store locally first
      const intake = await storage.createIntake(intakeData);
      
      // Submit to ClickUp if configured
      const clickupApiToken = process.env.CLICKUP_API_TOKEN;
      const clickupListId = process.env.CLICKUP_LIST_ID;
      
      if (clickupApiToken && clickupListId) {
        try {
          const taskData = {
            name: `${intakeData.company} - ${intakeData.legacyEnvironment} Modernization`,
            description: `
Contact: ${intakeData.name} (${intakeData.email})
Legacy Stack: ${intakeData.legacyEnvironment}
Modernization Goals: ${intakeData.modernizationGoals.join(', ')}
Productivity Stack: ${intakeData.productivityStack?.join(', ') || 'N/A'}
Project Urgency: ${intakeData.projectUrgency}
Submitted: ${new Date().toISOString()}
            `.trim(),
            status: "to do",
            priority: 2,
            tags: ["website-lead", intakeData.legacyEnvironment.toLowerCase()]
          };

          const response = await fetch(`https://api.clickup.com/api/v2/list/${clickupListId}/task`, {
            method: 'POST',
            headers: {
              'Authorization': clickupApiToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
          });
          
          if (!response.ok) {
            console.error("ClickUp API error:", await response.text());
          }
        } catch (clickupError) {
          console.error("ClickUp submission failed:", clickupError);
        }
      }
      
      res.status(201).json(intake);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
