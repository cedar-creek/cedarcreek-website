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
import { sendEmail } from "./sendgrid";

// Helper to format legacy stack for display
function formatLegacyStack(stack: string | null | undefined): string {
  const stackMap: Record<string, string> = {
    'coldfusion': 'ColdFusion / ColdBox',
    'php': 'PHP / Laravel / WordPress',
    'sqlserver': 'SQL Server / .NET',
    'java': 'Java / Spring',
    'python': 'Python / Django',
    'mixed': 'Mixed / Multiple Systems',
    'other': 'Legacy System'
  };
  return stackMap[stack || ''] || stack || 'Legacy System';
}

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
Title: ${assessmentData.title || 'N/A'}
Industry: ${assessmentData.industry || 'N/A'}
Employee Count: ${assessmentData.employeeCount || 'N/A'}
Annual Revenue: ${assessmentData.annualRevenue || 'N/A'}

Technology Stack
----------------
Legacy Stack: ${assessmentData.legacyStack || 'N/A'}
ColdBox Framework: ${assessmentData.coldboxFramework || 'N/A'}
SQL Server Optimization: ${assessmentData.sqlServerOptimization || 'N/A'}
ColdFusion Needs: ${Array.isArray(assessmentData.coldFusionNeeds) ? assessmentData.coldFusionNeeds.join(', ') : 'N/A'}
Productivity Stack: ${Array.isArray(assessmentData.productivityStack) ? assessmentData.productivityStack.join(', ') : 'N/A'}

Goals & Investment
------------------
Modernization Goal: ${assessmentData.modernizationGoal || 'N/A'}
Budget Range: ${assessmentData.budgetRange || 'N/A'}
Timeframe: ${assessmentData.implementationTimeframe || 'N/A'}

AI Goals: ${Array.isArray(assessmentData.aiGoals) ? assessmentData.aiGoals.join(', ') : 'N/A'}
Priority Areas: ${Array.isArray(assessmentData.priorityAreas) ? assessmentData.priorityAreas.join(', ') : 'N/A'}
Specific Outcomes: ${assessmentData.specificOutcomes || 'N/A'}
Concerns: ${assessmentData.concerns || 'N/A'}

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
      
      // Send confirmation email via SendGrid
      if (assessmentData.email) {
        try {
          const formattedStack = formatLegacyStack(assessmentData.legacyStack);
          const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { color: #ff6b00; }
    ul { padding-left: 20px; }
    li { margin-bottom: 10px; }
    strong { color: #1a1a1a; }
    .note { background: #f5f5f5; padding: 15px; border-left: 4px solid #ff6b00; margin-top: 20px; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <p>Hi ${assessmentData.name || 'there'},</p>
    <p>Thank you for completing the <strong>CedarCreek AI Readiness Assessment™</strong>.</p>
    <p>Our engineering team is reviewing your <strong>${formattedStack}</strong> environment. Your custom <strong>AI Strategy Roadmap</strong> will be delivered within 24 hours.</p>
    <p><strong>What to expect in your Roadmap:</strong></p>
    <ul>
      <li><strong>Custom AI Acceleration Plan:</strong> A high-level strategy for your specific systems.</li>
      <li><strong>Quick-Win Opportunities:</strong> 2-4 high-impact use cases for immediate ROI.</li>
      <li><strong>Target Impact Metrics:</strong> Benchmarks like our 25-40% target process time reduction.</li>
      <li><strong>90-Day Timeline:</strong> A phased implementation roadmap.</li>
    </ul>
    <div class="note">
      <p><em>Note: This initial roadmap is a strategic guide. A deep-dive Technical Code Audit, security review, and ColdBox/SQL Server optimization are reserved for our <strong>Rapid Start Accelerator</strong> phase ($15,000+).</em></p>
    </div>
    <div class="footer">
      <p>CedarCreek.AI - Legacy Modernization & AI Integration</p>
    </div>
  </div>
</body>
</html>`;

          const plainText = `Hi ${assessmentData.name || 'there'},

Thank you for completing the CedarCreek AI Readiness Assessment™.

Our engineering team is reviewing your ${formattedStack} environment. Your custom AI Strategy Roadmap will be delivered within 24 hours.

What to expect in your Roadmap:
- Custom AI Acceleration Plan: A high-level strategy for your specific systems.
- Quick-Win Opportunities: 2-4 high-impact use cases for immediate ROI.
- Target Impact Metrics: Benchmarks like our 25-40% target process time reduction.
- 90-Day Timeline: A phased implementation roadmap.

Note: This initial roadmap is a strategic guide. A deep-dive Technical Code Audit, security review, and ColdBox/SQL Server optimization are reserved for our Rapid Start Accelerator phase ($15,000+).

CedarCreek.AI - Legacy Modernization & AI Integration`;

          await sendEmail(
            assessmentData.email,
            'Your CedarCreek AI Strategy Roadmap is in Progress 🚀',
            plainText,
            emailHtml
          );
          console.log(`Confirmation email sent to ${assessmentData.email}`);
        } catch (emailError) {
          console.error("SendGrid email failed:", emailError);
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
