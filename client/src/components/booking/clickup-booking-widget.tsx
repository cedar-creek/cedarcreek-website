import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, ArrowRight } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useFormProgress } from "@/hooks/use-form-progress";

interface ClickUpBookingWidgetProps {
  className?: string;
  buttonText?: string;
  fullWidth?: boolean;
  assessmentData?: {
    company?: string;
    industry?: string;
    size?: string;
    systems?: string[];
    aiInterests?: string[];
    name?: string;
    email?: string;
    phone?: string;
  };
}

export function ClickUpBookingWidget({
  className = "",
  buttonText = "Book a Free Consultation",
  fullWidth = false,
  assessmentData
}: ClickUpBookingWidgetProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { saveProgress } = useFormProgress('ai-assessment-form');
  
  // Form data state
  const [formData, setFormData] = useState({
    name: assessmentData?.name || "",
    email: assessmentData?.email || "",
    phone: assessmentData?.phone || "",
    company: assessmentData?.company || "",
    industry: assessmentData?.industry || "",
    size: assessmentData?.size || "",
    systems: assessmentData?.systems || [],
    aiInterests: assessmentData?.aiInterests || []
  });

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle checkbox changes for multi-select fields
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        [field]: [...(formData[field as keyof typeof formData] as string[] || []), value]
      });
    } else {
      setFormData({
        ...formData,
        [field]: (formData[field as keyof typeof formData] as string[]).filter(item => item !== value)
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Continue to next step or show booking form
  const handleContinue = () => {
    // Validate current step fields
    if (currentStep === 1) {
      if (!formData.company || !formData.industry || !formData.size) {
        toast({
          title: "Missing Information",
          description: "Please fill out all required fields to continue.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.systems.length || !formData.aiInterests.length) {
        toast({
          title: "Selection Required",
          description: "Please select at least one option in each category.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Contact Information Required",
          description: "Please provide your name and email to continue.",
          variant: "destructive"
        });
        return;
      }
    }

    // Save progress
    saveProgress(formData);

    // If last step, show booking form
    if (currentStep === 3) {
      setShowBookingForm(true);
    } else {
      // Otherwise proceed to next step
      setCurrentStep(currentStep + 1);
    }
  };

  // Load the ClickUp script when the booking form is shown
  useEffect(() => {
    if (showBookingForm) {
      // Check if the script is already loaded
      if (!document.querySelector('script[src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"]')) {
        const script = document.createElement("script");
        script.src = "https://app-cdn.clickup.com/assets/js/forms-embed/v1.js";
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
          // Clean up only if component unmounts and script exists
          const existingScript = document.querySelector('script[src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"]');
          if (existingScript && document.body.contains(existingScript)) {
            document.body.removeChild(existingScript);
          }
        };
      }
    }
  }, [showBookingForm]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="lg" 
          className={`bg-primary hover:bg-primary/90 text-white flex items-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
        >
          <CalendarIcon className="h-5 w-5" />
          {buttonText}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[700px] overflow-y-auto" side="right">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl">Schedule Your AI Consultation</SheetTitle>
          <SheetDescription>
            {!showBookingForm && (
              <>
                {currentStep === 1 && "Tell us about your business to help us prepare for your consultation."}
                {currentStep === 2 && "Help us understand your technology needs and AI interests."}
                {currentStep === 3 && "Provide your contact information to proceed to booking."}
              </>
            )}
            {showBookingForm && "Select a date and time for your free 30-minute consultation."}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          {!showBookingForm ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step === currentStep
                            ? 'bg-primary text-white'
                            : step < currentStep
                              ? 'bg-primary/20 text-primary'
                              : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {step < currentStep ? <Check className="h-4 w-4" /> : step}
                      </div>
                      <span className="ml-2 text-sm hidden md:inline">
                        {step === 1 && "Company Info"}
                        {step === 2 && "Tech Needs"}
                        {step === 3 && "Contact"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company" className="block text-sm font-medium mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="industry" className="block text-sm font-medium mb-1">
                      Industry <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology & Software</SelectItem>
                        <SelectItem value="healthcare">Healthcare & Life Sciences</SelectItem>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="professional">Professional Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="size" className="block text-sm font-medium mb-1">
                      Company Size <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.size} onValueChange={(value) => handleSelectChange("size", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select company size" />
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
              )}
              
              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      Which data systems do you currently use? <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-2">
                      {[
                        { id: "crm", label: "CRM (e.g., Salesforce, HubSpot)" },
                        { id: "erp", label: "ERP System" },
                        { id: "database", label: "Relational Database" },
                        { id: "datawarehouse", label: "Data Warehouse" },
                        { id: "spreadsheets", label: "Spreadsheets/Excel" },
                        { id: "saas", label: "SaaS Applications" },
                        { id: "other", label: "Other" }
                      ].map((system) => (
                        <div key={system.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`system-${system.id}`} 
                            checked={formData.systems.includes(system.id)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("systems", system.id, checked === true)
                            }
                          />
                          <Label htmlFor={`system-${system.id}`}>{system.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      What AI capabilities are you most interested in? <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-2">
                      {[
                        { id: "automation", label: "Process Automation" },
                        { id: "analytics", label: "Predictive Analytics" },
                        { id: "nlp", label: "Natural Language Processing" },
                        { id: "computer-vision", label: "Computer Vision / Image Recognition" },
                        { id: "recommendations", label: "Recommendation Systems" },
                        { id: "chatbots", label: "Chatbots & Conversational AI" },
                        { id: "generative", label: "Generative AI & Content Creation" },
                        { id: "other", label: "Other" }
                      ].map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`interest-${interest.id}`} 
                            checked={formData.aiInterests.includes(interest.id)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("aiInterests", interest.id, checked === true)
                            }
                          />
                          <Label htmlFor={`interest-${interest.id}`}>{interest.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Your phone number (optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div> 
                )}
                
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={handleContinue}
                >
                  {currentStep < 3 ? (
                    <span className="flex items-center">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  ) : (
                    "Proceed to Booking"
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="h-[calc(100vh-150px)] pb-6">
              <iframe 
                className="clickup-embed clickup-dynamic-height" 
                src="https://forms.clickup.com/2480527/f/2bpcf-30876/STP74QRVCWP41CIDZJ" 
                onWheel={() => {}} 
                width="100%" 
                height="100%" 
                style={{ 
                  background: "transparent", 
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  minHeight: "600px"
                }}
              ></iframe>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}