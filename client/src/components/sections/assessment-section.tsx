import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useFormProgress } from "@/hooks/use-form-progress";
import { CheckCircle2, Target, PieChart, TrendingUp } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { motion } from "framer-motion";

// Assessment form schema
const assessmentSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  systems: z.array(z.string()).optional(),
  dataQuality: z.string().optional(),
  aiInterests: z.array(z.string()).optional(),
  aiChallenges: z.string().optional(),
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to receive the assessment",
  }),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

export function AssessmentSection() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AssessmentFormData>>({
    systems: [],
    aiInterests: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  
  const { saveProgress, loadProgress } = useFormProgress<Partial<AssessmentFormData>>('ai-assessment-form');
  
  // Load saved form data on initial render
  useEffect(() => {
    const savedData = loadProgress();
    if (savedData) {
      setFormData(savedData);
      // If there's saved data, determine the furthest step the user has completed
      if (savedData.email && savedData.name) {
        setCurrentStep(4);
      } else if (savedData.aiInterests || savedData.aiChallenges) {
        setCurrentStep(3);
      } else if (savedData.systems || savedData.dataQuality) {
        setCurrentStep(2);
      }
    }
  }, []);
  
  // Save form progress whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      saveProgress(formData);
    }
  }, [formData]);
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const handleCheckboxChange = (field: "systems" | "aiInterests", value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      
      return { ...prev, [field]: updated };
    });
  };
  
  const validateCurrentStep = () => {
    try {
      switch (currentStep) {
        case 1:
          z.object({
            company: z.string().min(1, "Company name is required"),
            industry: z.string().min(1, "Industry is required"),
            size: z.string().min(1, "Company size is required"),
          }).parse(formData);
          break;
        case 2:
          // No required fields in step 2
          break;
        case 3:
          // No required fields in step 3
          break;
        case 4:
          z.object({
            name: z.string().min(1, "Full name is required"),
            email: z.string().email("Invalid email address"),
            consent: z.boolean().refine(val => val === true, {
              message: "You must agree to receive the assessment",
            }),
          }).parse(formData);
          break;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.map(err => err.message);
        toast({
          title: "Validation Error",
          description: fieldErrors.join(", "),
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep === 4) {
        submitAssessment();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const submitAssessment = async () => {
    try {
      setIsSubmitting(true);
      
      // Submit to API
      await apiRequest('POST', '/api/assessment', {
        ...formData,
        systems: formData.systems || [],
        aiInterests: formData.aiInterests || [],
        completed: true,
      });
      
      // Show completion state
      setSubmissionComplete(true);
      setCurrentStep(5);
      
      // Clear saved form data
      saveProgress({});
      
      toast({
        title: "Assessment Submitted",
        description: "Your AI readiness assessment has been submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressWidth = () => {
    switch (currentStep) {
      case 1: return "25%";
      case 2: return "50%";
      case 3: return "75%";
      case 4: return "100%";
      default: return "0%";
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="assessment" className="py-16 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Get Your AI Readiness Score</h2>
            <p className="text-lg text-neutral-400 mb-8">
              Answer a few quick questions about your business to receive a personalized assessment 
              of your AI readiness and opportunities.
            </p>
            
            {/* Assessment benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/20 rounded-full p-2 mr-4 mt-1">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white">Identify Quick-Win Opportunities</p>
                  <p className="text-neutral-400">Discover areas where AI can make an immediate impact</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-secondary/20 rounded-full p-2 mr-4 mt-1">
                  <PieChart className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-white">Benchmark Your AI Maturity</p>
                  <p className="text-neutral-400">See how you compare to industry peers</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/20 rounded-full p-2 mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white">Personalized Roadmap</p>
                  <p className="text-neutral-400">Receive a tailored implementation plan</p>
                </div>
              </div>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&h=780" 
              alt="Business consultant showing AI solutions" 
              className="rounded-lg shadow-md hidden md:block" 
            />
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Business Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">Company Name</Label>
                    <Input 
                      type="text" 
                      id="company" 
                      value={formData.company || ""} 
                      onChange={(e) => updateFormData("company", e.target.value)}
                      className="custom-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry" className="block text-sm font-medium text-neutral-700 mb-1">Industry</Label>
                    <Select 
                      value={formData.industry || ""} 
                      onValueChange={(value) => updateFormData("industry", value)}
                    >
                      <SelectTrigger id="industry" className="custom-input">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size" className="block text-sm font-medium text-neutral-700 mb-1">Company Size</Label>
                    <Select 
                      value={formData.size || ""} 
                      onValueChange={(value) => updateFormData("size", value)}
                    >
                      <SelectTrigger id="size" className="custom-input">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Current Technology Usage</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-neutral-700 mb-3">
                      Which data systems do you currently use? (Select all that apply)
                    </Label>
                    <div className="space-y-2">
                      {[
                        { id: "crm", label: "CRM (e.g., Salesforce, HubSpot)" },
                        { id: "erp", label: "ERP System" },
                        { id: "analytics", label: "Analytics Platform" },
                        { id: "cloud", label: "Cloud Infrastructure" },
                        { id: "none", label: "None of the above" },
                      ].map(item => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox 
                            id={item.id} 
                            checked={(formData.systems || []).includes(item.id)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("systems", item.id, checked === true)
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                          />
                          <label htmlFor={item.id} className="ml-2 block text-sm text-neutral-700">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dataQuality" className="block text-sm font-medium text-neutral-700 mb-1">
                      How would you rate your data quality?
                    </Label>
                    <Select 
                      value={formData.dataQuality || ""} 
                      onValueChange={(value) => updateFormData("dataQuality", value)}
                    >
                      <SelectTrigger id="dataQuality" className="custom-input">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poor">Poor - Data is scattered and inconsistent</SelectItem>
                        <SelectItem value="fair">Fair - Some organized data, but many gaps</SelectItem>
                        <SelectItem value="good">Good - Mostly organized with some standardization</SelectItem>
                        <SelectItem value="excellent">Excellent - Well-structured and accessible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">AI Objectives & Challenges</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-neutral-700 mb-3">
                      Which areas are you most interested in applying AI? (Select up to 3)
                    </Label>
                    <div className="space-y-2">
                      {[
                        { id: "legacy-modernization", label: "Legacy System Modernization" },
                        { id: "predictive-analytics", label: "Predictive Analytics & Forecasting" },
                        { id: "process-automation", label: "Process & Workflow Automation" },
                        { id: "data-integration", label: "Data Integration & Synchronization" },
                        { id: "decision-support", label: "Decision Support & Insights" },
                      ].map(item => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox 
                            id={item.id} 
                            checked={(formData.aiInterests || []).includes(item.id)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("aiInterests", item.id, checked === true)
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                            disabled={(formData.aiInterests || []).length >= 3 && !(formData.aiInterests || []).includes(item.id)}
                          />
                          <label htmlFor={item.id} className="ml-2 block text-sm text-neutral-700">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="aiChallenges" className="block text-sm font-medium text-neutral-700 mb-1">
                      What's your biggest challenge with AI adoption?
                    </Label>
                    <Select 
                      value={formData.aiChallenges || ""} 
                      onValueChange={(value) => updateFormData("aiChallenges", value)}
                    >
                      <SelectTrigger id="aiChallenges" className="custom-input">
                        <SelectValue placeholder="Select a challenge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expertise">Lack of technical expertise</SelectItem>
                        <SelectItem value="cost">Implementation costs</SelectItem>
                        <SelectItem value="data">Data quality and quantity issues</SelectItem>
                        <SelectItem value="integration">Integration with existing systems</SelectItem>
                        <SelectItem value="strategy">Unclear strategic direction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      value={formData.name || ""} 
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className="custom-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      value={formData.email || ""} 
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="custom-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number (optional)</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      value={formData.phone || ""} 
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="custom-input"
                    />
                  </div>
                  <div className="flex items-start mt-4">
                    <div className="flex items-center h-5">
                      <Checkbox 
                        id="consent" 
                        checked={formData.consent || false}
                        onCheckedChange={(checked) => 
                          updateFormData("consent", checked === true)
                        }
                        className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                      />
                    </div>
                    <div className="ml-2">
                      <Label 
                        htmlFor="consent" 
                        className="text-sm text-neutral-600"
                      >
                        I agree to receive my personalized AI readiness assessment and occasional updates from Cedar Creek Solutions. You can unsubscribe at any time.
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 5: Success/Confirmation */}
            {currentStep === 5 && (
              <div className="text-center">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-neutral-600 mb-6">
                  Your assessment is being prepared. We'll email your personalized AI Readiness Score 
                  and opportunities within 5 business days.
                </p>
                <p className="font-medium">What happens next?</p>
                <ol className="text-left mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center bg-primary-light rounded-full h-6 w-6 text-white text-sm font-medium mr-2">1</span>
                    <span>Review your AI Readiness Score and identified opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center bg-primary-light rounded-full h-6 w-6 text-white text-sm font-medium mr-2">2</span>
                    <span>Schedule a free 30-minute consultation with an AI specialist</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center bg-primary-light rounded-full h-6 w-6 text-white text-sm font-medium mr-2">3</span>
                    <span>Get a tailored AI implementation plan for your business</span>
                  </li>
                </ol>
                <div className="mt-8">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    Schedule Your Consultation
                  </Button>
                </div>
              </div>
            )}
            
            {/* Progress and navigation */}
            {currentStep < 5 && (
              <div className="mt-8">
                <div className="mb-4">
                  <div className="bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full" 
                      style={{ width: getProgressWidth() }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>Step {currentStep} of 4</span>
                    <span>Progress saved</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={previousStep}
                    disabled={currentStep === 1 || isSubmitting}
                    className={`${currentStep === 1 ? 'invisible' : ''} px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors`}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    {isSubmitting ? 
                      "Processing..." : 
                      currentStep < 4 ? 
                        "Continue" : 
                        "Submit Assessment"
                    }
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
