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
import { verifyRecaptcha } from "./recaptcha";

// Helper to format legacy stack for display
function formatLegacyStack(stack: string | null | undefined): string {
  const stackMap: Record<string, string> = {
    'coldfusion': 'ColdFusion / ColdBox',
    'php': 'PHP / Laravel / WordPress',
    'sqlserver': 'SQL Server / .NET',
    'sql-server': 'SQL Server',
    'legacy-dotnet': 'Legacy .NET',
    'java': 'Java / Spring',
    'python': 'Python / Django',
    'mixed': 'Mixed / Multiple Systems',
    'other': 'Legacy System',
    'other-proprietary': 'Proprietary System'
  };
  return stackMap[stack || ''] || stack || 'Legacy System';
}

// Helper to format modernization goals for display
function formatModernizationGoals(goals: string[], otherGoal?: string | null): string {
  const goalMap: Record<string, string> = {
    'ai-automation': 'AI Automation',
    'go-microservices': 'Go Microservices Migration',
    'svelte-frontend': 'Svelte Frontend Overhaul',
    'ionic-mobile': 'Ionic Mobile App',
    'other-custom': 'Custom Solution'
  };
  
  const formattedGoals = goals.map(g => goalMap[g] || g);
  
  // Replace "Custom Solution" with actual custom goal if provided
  if (otherGoal && goals.includes('other-custom')) {
    const customIndex = formattedGoals.indexOf('Custom Solution');
    if (customIndex !== -1) {
      formattedGoals[customIndex] = otherGoal;
    }
  }
  
  return formattedGoals.join(', ');
}

// Generate dark-themed intake confirmation email
function generateIntakeConfirmationEmail(data: {
  firstName: string;
  companyName: string;
  legacyStack: string;
  modernizationGoals: string;
  assessmentUrl: string;
}): { html: string; text: string } {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering Review in Progress</title>
</head>
<body style="margin: 0; padding: 0; background-color: #111111; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #111111;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 30px; border-bottom: 1px solid #333333;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.5px;">
                Personalized Engineering Review in Progress
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px 0;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
                Hello ${data.firstName},
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
                Thank you for requesting your Custom AI Acceleration Plan.
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
                At CedarCreek, we don't believe in generic roadmaps. Our engineering team is currently reviewing your submission regarding your <strong style="color: #FF6600;">${data.legacyStack}</strong> infrastructure and your goals for <strong style="color: #FF6600;">${data.modernizationGoals}</strong>.
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
                Our approach is built on a foundation of proven architectures—the same engines that have powered SaaS platforms for 100,000+ businesses and systems serving millions of global users. We specialize in preserving the critical business logic of legacy systems while unlocking modern performance.
              </p>
              
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
                While we evaluate your specific requirements and vendor ecosystem (supporting 50+ enterprise vendors), the next step is to complete our Technical Intake & Engineering Audit. This allows us to map your data schemas accurately for a Strategic Partnership engagement.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 6px; background-color: #FF6600;">
                    <a href="${data.assessmentUrl}" target="_blank" style="display: inline-block; padding: 16px 32px; font-size: 16px; font-weight: 600; color: #FFFFFF; text-decoration: none; border-radius: 6px;">
                      Begin Technical Assessment
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px; border-top: 1px solid #333333;">
              <p style="margin: 0; font-size: 14px; color: #888888; text-align: center;">
                CedarCreek.ai &nbsp;|&nbsp; mytickup.com &nbsp;|&nbsp; bunity.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Personalized Engineering Review in Progress

Hello ${data.firstName},

Thank you for requesting your Custom AI Acceleration Plan.

At CedarCreek, we don't believe in generic roadmaps. Our engineering team is currently reviewing your submission regarding your ${data.legacyStack} infrastructure and your goals for ${data.modernizationGoals}.

Our approach is built on a foundation of proven architectures—the same engines that have powered SaaS platforms for 100,000+ businesses and systems serving millions of global users. We specialize in preserving the critical business logic of legacy systems while unlocking modern performance.

While we evaluate your specific requirements and vendor ecosystem (supporting 50+ enterprise vendors), the next step is to complete our Technical Intake & Engineering Audit. This allows us to map your data schemas accurately for a Strategic Partnership engagement.

Begin Technical Assessment: ${data.assessmentUrl}

---
CedarCreek.ai | mytickup.com | bunity.com`;

  return { html, text };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for deployment
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // API endpoint to get reCAPTCHA site key
  app.get("/api/config/recaptcha", (_req: Request, res: Response) => {
    const siteKey = process.env.RECAPTCHA_SITE_KEY || '';
    res.json({ siteKey });
  });

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
      // Verify reCAPTCHA token
      const recaptchaToken = req.body.recaptchaToken;
      const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'assessment_form');
      
      if (!recaptchaResult.success) {
        return res.status(400).json({ 
          message: recaptchaResult.error || 'Security verification failed. Please try again.' 
        });
      }
      
      // Remove recaptchaToken from data before parsing with schema
      const { recaptchaToken: _, ...formData } = req.body;
      const assessmentData = insertAssessmentSchema.parse(formData);
      const assessment = await storage.createAssessment(assessmentData);
      
      // Log raw JSON for 5-page form debugging
      console.log("Full Assessment raw JSON received:", JSON.stringify(assessmentData, null, 2));
      
      // Forward to ClickUp if configured
      const clickupApiToken = process.env.CLICKUP_API_TOKEN;
      const clickupListId = process.env.CLICKUP_LIST_ID;
      
      if (clickupApiToken && clickupListId) {
        try {
          const taskData = {
            name: `[Full Assessment] - ${assessmentData.company || 'Unknown'}`,
            markdown_description: `
# Contact Information
- **Name:** ${assessmentData.name}
- **Email:** ${assessmentData.email}
- **Phone:** ${assessmentData.phone || 'N/A'}
- **Company:** ${assessmentData.company}
- **Title:** ${assessmentData.title || 'N/A'}

# Company Profile
- **Industry:** ${assessmentData.industry || 'N/A'}
- **Employee Count:** ${assessmentData.employeeCount || 'N/A'}
- **Annual Revenue:** ${assessmentData.annualRevenue || 'N/A'}

# Legacy Environment
- **Legacy Stack:** ${assessmentData.legacyStack || 'N/A'}
- **ColdBox Framework:** ${assessmentData.coldboxFramework || 'N/A'}
- **SQL Server Optimization:** ${assessmentData.sqlServerOptimization || 'N/A'}
- **ColdFusion Needs:** ${Array.isArray(assessmentData.coldFusionNeeds) ? assessmentData.coldFusionNeeds.join(', ') : 'N/A'}

# Technical Constraints
- **Productivity Stack:** ${Array.isArray(assessmentData.productivityStack) ? assessmentData.productivityStack.join(', ') : 'N/A'}

# Strategic Goals
- **Modernization Goal:** ${assessmentData.modernizationGoal || 'N/A'}
- **AI Goals:** ${Array.isArray(assessmentData.aiGoals) ? assessmentData.aiGoals.join(', ') : 'N/A'}
- **Priority Areas:** ${Array.isArray(assessmentData.priorityAreas) ? assessmentData.priorityAreas.join(', ') : 'N/A'}
- **Specific Outcomes:** ${assessmentData.specificOutcomes || 'N/A'}
- **Concerns:** ${assessmentData.concerns || 'N/A'}

# Investment & Timeline
- **Budget Range:** ${assessmentData.budgetRange || 'N/A'}
- **Implementation Timeframe:** ${assessmentData.implementationTimeframe || 'N/A'}
- **Submitted:** ${new Date().toISOString()}
            `.trim(),
            priority: 1,
            tags: ["website-lead", "full-assessment"]
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
            const errorText = await response.text();
            console.error("ClickUp API error:", errorText);
            console.error("ClickUp API status:", response.status);
            // FAIL-SAFE: Log full payload so data isn't lost
            console.error("FAIL-SAFE Assessment payload:", JSON.stringify(assessmentData, null, 2));
          } else {
            console.log("ClickUp task created successfully for assessment:", assessmentData.company);
          }
        } catch (clickupError) {
          console.error("ClickUp submission failed:", clickupError);
          // FAIL-SAFE: Log full payload so data isn't lost
          console.error("FAIL-SAFE Assessment payload:", JSON.stringify(assessmentData, null, 2));
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
    <p>Our engineering team is reviewing your <strong>${formattedStack}</strong> environment. Your custom <strong>AI Strategy Roadmap</strong> will be delivered within 5 business days.</p>
    <p><strong>What to expect in your Roadmap:</strong></p>
    <ul>
      <li><strong>Custom AI Acceleration Plan:</strong> A high-level strategy for your specific systems.</li>
      <li><strong>Quick-Win Opportunities:</strong> 2-4 high-impact use cases for immediate ROI.</li>
      <li><strong>Target Impact Metrics:</strong> Benchmarks like our 25-40% target process time reduction.</li>
      <li><strong>90-Day Timeline:</strong> A phased implementation roadmap.</li>
    </ul>
    <div class="note">
      <p><em>Note: This initial roadmap is a strategic guide. A deep-dive Technical Code Audit, security review, and ColdBox/SQL Server optimization are part of our <strong>Strategic Partnership</strong> engagement.</em></p>
    </div>
    <div class="footer">
      <p>CedarCreek.AI - Legacy Modernization & AI Integration</p>
    </div>
  </div>
</body>
</html>`;

          const plainText = `Hi ${assessmentData.name || 'there'},

Thank you for completing the CedarCreek AI Readiness Assessment™.

Our engineering team is reviewing your ${formattedStack} environment. Your custom AI Strategy Roadmap will be delivered within 5 business days.

What to expect in your Roadmap:
- Custom AI Acceleration Plan: A high-level strategy for your specific systems.
- Quick-Win Opportunities: 2-4 high-impact use cases for immediate ROI.
- Target Impact Metrics: Benchmarks like our 25-40% target process time reduction.
- 90-Day Timeline: A phased implementation roadmap.

Note: This initial roadmap is a strategic guide. A deep-dive Technical Code Audit, security review, and ColdBox/SQL Server optimization are part of our Strategic Partnership engagement.

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
      console.log("Intake form submission received");
      
      // Verify reCAPTCHA token
      const recaptchaToken = req.body.recaptchaToken;
      console.log("reCAPTCHA token present:", !!recaptchaToken);
      
      const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'intake_form');
      console.log("reCAPTCHA result:", recaptchaResult);
      
      if (!recaptchaResult.success) {
        console.error("reCAPTCHA verification failed:", recaptchaResult.error);
        return res.status(400).json({ 
          message: recaptchaResult.error || 'Security verification failed. Please try again.' 
        });
      }
      
      // Remove recaptchaToken from data before parsing with schema
      const { recaptchaToken: _, ...formData } = req.body;
      const intakeData = insertIntakeSchema.parse(formData);
      
      // Store locally first
      const intake = await storage.createIntake(intakeData);
      
      // Format legacy stack for display (include custom input if provided)
      const legacyStackDisplay = intakeData.legacyEnvironment === 'other-proprietary' && intakeData.legacyEnvironmentOther
        ? intakeData.legacyEnvironmentOther
        : formatLegacyStack(intakeData.legacyEnvironment);
      
      // Format modernization goals (include custom goal if provided)
      const goalsDisplay = formatModernizationGoals(
        intakeData.modernizationGoals,
        intakeData.modernizationGoalsOther
      );
      
      // Submit to ClickUp if configured
      const clickupApiToken = process.env.CLICKUP_API_TOKEN;
      const clickupListId = process.env.CLICKUP_LIST_ID;
      
      if (clickupApiToken && clickupListId) {
        try {
          const taskData = {
            name: `[Quick Lead] - ${intakeData.company}`,
            markdown_description: `
# Contact Information
- **Name:** ${intakeData.name}
- **Email:** ${intakeData.email}
- **Company:** ${intakeData.company}

# Legacy Environment
- **Current Stack:** ${legacyStackDisplay}${intakeData.legacyEnvironmentOther ? `\n- **Custom Details:** ${intakeData.legacyEnvironmentOther}` : ''}

# Modernization Goals
${goalsDisplay}${intakeData.modernizationGoalsOther ? `\n- **Custom Goal:** ${intakeData.modernizationGoalsOther}` : ''}

# Productivity Stack
${intakeData.productivityStack?.join(', ') || 'N/A'}${intakeData.productivityStackOther ? ` (Other: ${intakeData.productivityStackOther})` : ''}

# Project Details
- **Urgency:** ${intakeData.projectUrgency}
- **Submitted:** ${new Date().toISOString()}
            `.trim(),
            priority: 2,
            tags: ["website-lead", "quick-lead", intakeData.legacyEnvironment.toLowerCase()]
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
            const errorText = await response.text();
            console.error("ClickUp API error:", errorText);
            console.error("ClickUp API status:", response.status);
            // FAIL-SAFE: Log full payload so data isn't lost
            console.error("FAIL-SAFE Intake payload:", JSON.stringify(intakeData, null, 2));
          } else {
            console.log("ClickUp task created successfully for intake:", intakeData.company);
          }
        } catch (clickupError) {
          console.error("ClickUp submission failed:", clickupError);
          // FAIL-SAFE: Log full payload so data isn't lost
          console.error("FAIL-SAFE Intake payload:", JSON.stringify(intakeData, null, 2));
        }
      }
      
      // Send confirmation email via SendGrid
      if (intakeData.email) {
        try {
          // Extract first name from full name
          const firstName = intakeData.name.split(' ')[0] || intakeData.name;
          
          // Build the assessment URL (use host from request or default)
          const host = req.get('host') || 'cedarcreek.ai';
          const protocol = req.secure || host.includes('replit') ? 'https' : 'http';
          const assessmentUrl = `${protocol}://${host}/assessment`;
          
          // Generate email content
          const { html, text } = generateIntakeConfirmationEmail({
            firstName,
            companyName: intakeData.company,
            legacyStack: legacyStackDisplay,
            modernizationGoals: goalsDisplay,
            assessmentUrl
          });
          
          await sendEmail(
            intakeData.email,
            `Next Steps: Engineering Review for ${intakeData.company}`,
            text,
            html
          );
          console.log(`Intake confirmation email sent to ${intakeData.email}`);
        } catch (emailError) {
          console.error("SendGrid email failed:", emailError);
        }
      }
      
      res.status(201).json(intake);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Intake error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // API route for general contact form submissions
  app.post("/api/general-contact", async (req: Request, res: Response) => {
    try {
      console.log("General contact form submission received");
      
      // Verify reCAPTCHA token
      const recaptchaToken = req.body.recaptchaToken;
      const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'contact_form');
      
      if (!recaptchaResult.success) {
        console.error("reCAPTCHA verification failed:", recaptchaResult.error);
        return res.status(400).json({ 
          message: recaptchaResult.error || 'Security verification failed. Please try again.' 
        });
      }
      
      // Extract form data
      const { recaptchaToken: _, businessName, firstName, lastName, email, message } = req.body;
      
      // Validate required fields before processing
      if (!firstName || !lastName) {
        return res.status(400).json({ message: "First name and last name are required" });
      }
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      
      // Build payload with transformed data
      const fullName = `${firstName} ${lastName}`;
      const contactPayload = {
        name: fullName,
        email: email,
        message: message,
        company: businessName || undefined,
        phone: undefined,
        interest: undefined
      };
      
      // Validate using the existing schema
      const validatedData = insertContactSchema.parse(contactPayload);
      
      // Submit to ClickUp if configured
      const clickupApiToken = process.env.CLICKUP_API_TOKEN;
      const clickupListId = process.env.CLICKUP_LIST_ID;
      
      if (clickupApiToken && clickupListId) {
        try {
          const taskData = {
            name: `New Lead: ${firstName} ${lastName}${businessName ? ` - ${businessName}` : ''}`,
            markdown_description: `
# Contact Form Submission

## Contact Information
- **Name:** ${fullName}
- **Email:** ${email}
- **Business:** ${businessName || 'Not provided'}

## Message
${message}

---
*Submitted via General Contact Form on ${new Date().toISOString()}*
            `.trim(),
            priority: 3,
            tags: ["contact-form", "website-lead"]
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
            const errorText = await response.text();
            console.error("ClickUp API error:", errorText);
            console.error("FAIL-SAFE Contact payload:", JSON.stringify({ businessName, firstName, lastName, email, message }, null, 2));
          } else {
            console.log("ClickUp task created successfully for contact:", fullName);
          }
        } catch (clickupError) {
          console.error("ClickUp submission failed:", clickupError);
          console.error("FAIL-SAFE Contact payload:", JSON.stringify({ businessName, firstName, lastName, email, message }, null, 2));
        }
      }
      
      // Store in database using validated data
      const contact = await storage.createContact(validatedData);
      
      // Send confirmation email
      try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #171717; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #171717;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #262626; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Partnership Inquiry Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 16px; line-height: 1.6;">
                Hello ${firstName},
              </p>
              <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to Cedar Creek. We have successfully received your message.
              </p>
              <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 16px; line-height: 1.6;">
                Our team is currently reviewing your inquiry and will be in touch shortly to discuss how we can support your specific objectives.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #1a1a1a; text-align: center; border-top: 1px solid #333333;">
              <p style="margin: 0; color: #a3a3a3; font-size: 14px;">cedarcreeksolutions.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim();
        
        const emailText = `Partnership Inquiry Received

Hello ${firstName},

Thank you for reaching out to Cedar Creek. We have successfully received your message.

Our team is currently reviewing your inquiry and will be in touch shortly to discuss how we can support your specific objectives.

---
cedarcreeksolutions.com`;

        await sendEmail(
          email,
          "Thank you for reaching out to Cedar Creek",
          emailText,
          emailHtml,
          "Cedar Creek"
        );
        console.log("Confirmation email sent to:", email);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
      
      res.status(201).json({ success: true, id: contact.id });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        console.error("Validation error:", validationError.message);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("General contact error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
