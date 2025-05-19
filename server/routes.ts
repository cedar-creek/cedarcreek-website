import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertAssessmentSchema, 
  insertContactSchema,
  insertNewsletterSchema,
  insertBookingSchema
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

  const httpServer = createServer(app);
  return httpServer;
}
