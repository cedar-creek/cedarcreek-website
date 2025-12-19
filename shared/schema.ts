import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (maintained from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Assessment schema
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  title: text("title"),
  industry: text("industry"),
  annualRevenue: text("annual_revenue"),
  employeeCount: text("employee_count"),
  legacyStack: text("legacy_stack"),
  coldboxFramework: text("coldbox_framework"),
  sqlServerOptimization: text("sql_server_optimization"),
  coldFusionNeeds: text("coldfusion_needs").array(),
  productivityStack: text("productivity_stack").array(),
  businessDescription: text("business_description"),
  competitiveAdvantage: text("competitive_advantage"),
  departments: text("departments").array(),
  operationalChallenges: text("operational_challenges").array(),
  currentTools: text("current_tools").array(),
  techInfrastructure: text("tech_infrastructure"),
  aiExperience: text("ai_experience"),
  aiGoals: text("ai_goals").array(),
  manualProcesses: text("manual_processes"),
  bottleneckProcesses: text("bottleneck_processes"),
  documentProcesses: text("document_processes").array(),
  customerChannels: text("customer_channels").array(),
  priorityAreas: text("priority_areas").array(),
  modernizationGoal: text("modernization_goal"),
  implementationTimeframe: text("implementation_timeframe"),
  budgetRange: text("budget_range"),
  specificOutcomes: text("specific_outcomes"),
  concerns: text("concerns"),
  progress: integer("progress").default(1),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

// Contact form schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  interest: text("interest"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Newsletter subscription schema
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

// Booking schema
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  status: text("status").default("confirmed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  id: undefined,
  createdAt: undefined,
  status: undefined
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Intake form schema for lead qualification
export const intakes = pgTable("intakes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  legacyEnvironment: text("legacy_environment").notNull(),
  modernizationGoals: text("modernization_goals").array().notNull(),
  productivityStack: text("productivity_stack").array(),
  projectUrgency: text("project_urgency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertIntakeSchema = createInsertSchema(intakes).omit({
  id: true,
  createdAt: true,
});

export type InsertIntake = z.infer<typeof insertIntakeSchema>;
export type Intake = typeof intakes.$inferSelect;
