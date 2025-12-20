import {
  users,
  User,
  InsertUser,
  assessments,
  Assessment,
  InsertAssessment,
  contacts,
  Contact,
  InsertContact,
  newsletters,
  Newsletter,
  InsertNewsletter,
  bookings,
  Booking,
  InsertBooking,
  intakes,
  Intake,
  InsertIntake
} from "@shared/schema";

// Storage interface defines all operations for data persistence
export interface IStorage {
  // User operations (maintained from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Assessment operations
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAssessmentByEmail(email: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: number, assessment: Partial<InsertAssessment>): Promise<Assessment | undefined>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Newsletter operations
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByDate(date: Date): Promise<Booking[]>;
  
  // Intake operations
  createIntake(intake: InsertIntake): Promise<Intake>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assessments: Map<number, Assessment>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private bookings: Map<number, Booking>;
  private intakes: Map<number, Intake>;
  
  private userId: number;
  private assessmentId: number;
  private contactId: number;
  private newsletterId: number;
  private bookingId: number;
  private intakeId: number;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    this.bookings = new Map();
    this.intakes = new Map();
    
    this.userId = 1;
    this.assessmentId = 1;
    this.contactId = 1;
    this.newsletterId = 1;
    this.bookingId = 1;
    this.intakeId = 1;
  }

  // User methods (maintained from original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Assessment methods
  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }
  
  async getAssessmentByEmail(email: string): Promise<Assessment | undefined> {
    return Array.from(this.assessments.values()).find(
      (assessment) => assessment.email === email,
    );
  }
  
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.assessmentId++;
    const now = new Date();
    const assessment: Assessment = { 
      id,
      name: insertAssessment.name || null,
      email: insertAssessment.email || null,
      phone: insertAssessment.phone || null,
      company: insertAssessment.company || null,
      title: insertAssessment.title || null,
      industry: insertAssessment.industry || null,
      annualRevenue: insertAssessment.annualRevenue || null,
      employeeCount: insertAssessment.employeeCount || null,
      legacyStack: insertAssessment.legacyStack || null,
      coldboxFramework: insertAssessment.coldboxFramework || null,
      sqlServerOptimization: insertAssessment.sqlServerOptimization || null,
      coldFusionNeeds: insertAssessment.coldFusionNeeds || null,
      productivityStack: insertAssessment.productivityStack || null,
      businessDescription: insertAssessment.businessDescription || null,
      competitiveAdvantage: insertAssessment.competitiveAdvantage || null,
      departments: insertAssessment.departments || null,
      operationalChallenges: insertAssessment.operationalChallenges || null,
      currentTools: insertAssessment.currentTools || null,
      techInfrastructure: insertAssessment.techInfrastructure || null,
      aiExperience: insertAssessment.aiExperience || null,
      aiGoals: insertAssessment.aiGoals || null,
      manualProcesses: insertAssessment.manualProcesses || null,
      bottleneckProcesses: insertAssessment.bottleneckProcesses || null,
      documentProcesses: insertAssessment.documentProcesses || null,
      customerChannels: insertAssessment.customerChannels || null,
      priorityAreas: insertAssessment.priorityAreas || null,
      modernizationGoal: insertAssessment.modernizationGoal || null,
      implementationTimeframe: insertAssessment.implementationTimeframe || null,
      budgetRange: insertAssessment.budgetRange || null,
      specificOutcomes: insertAssessment.specificOutcomes || null,
      concerns: insertAssessment.concerns || null,
      progress: insertAssessment.progress || 1,
      completed: insertAssessment.completed || false,
      createdAt: now
    };
    this.assessments.set(id, assessment);
    return assessment;
  }
  
  async updateAssessment(id: number, assessmentUpdate: Partial<InsertAssessment>): Promise<Assessment | undefined> {
    const assessment = this.assessments.get(id);
    if (!assessment) return undefined;
    
    const updatedAssessment: Assessment = {
      ...assessment,
      ...assessmentUpdate,
    };
    
    this.assessments.set(id, updatedAssessment);
    return updatedAssessment;
  }
  
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const now = new Date();
    const contact: Contact = { 
      id,
      name: insertContact.name,
      email: insertContact.email,
      phone: insertContact.phone || null,
      company: insertContact.company || null,
      message: insertContact.message || null,
      interest: insertContact.interest || null,
      createdAt: now
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  // Newsletter methods
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingNewsletter = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === insertNewsletter.email,
    );
    
    if (existingNewsletter) {
      return existingNewsletter;
    }
    
    const id = this.newsletterId++;
    const now = new Date();
    const newsletter: Newsletter = { ...insertNewsletter, id, createdAt: now };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  
  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const now = new Date();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "confirmed", 
      createdAt: now 
    };
    this.bookings.set(id, booking);
    return booking;
  }
  
  async getBookingsByDate(date: Date): Promise<Booking[]> {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
    
    return Array.from(this.bookings.values()).filter(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
      return bookingDate.getTime() === selectedDate.getTime();
    });
  }
  
  // Intake methods
  async createIntake(insertIntake: InsertIntake): Promise<Intake> {
    const id = this.intakeId++;
    const now = new Date();
    const intake: Intake = {
      id,
      name: insertIntake.name,
      company: insertIntake.company,
      email: insertIntake.email,
      legacyEnvironment: insertIntake.legacyEnvironment,
      legacyEnvironmentOther: insertIntake.legacyEnvironmentOther || null,
      modernizationGoals: insertIntake.modernizationGoals,
      modernizationGoalsOther: insertIntake.modernizationGoalsOther || null,
      productivityStack: insertIntake.productivityStack || null,
      productivityStackOther: insertIntake.productivityStackOther || null,
      projectUrgency: insertIntake.projectUrgency,
      createdAt: now
    };
    this.intakes.set(id, intake);
    return intake;
  }
}

export const storage = new MemStorage();
