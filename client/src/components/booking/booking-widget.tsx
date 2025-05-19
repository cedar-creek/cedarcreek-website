
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookingCalendar } from "./booking-calendar";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useFormProgress } from "@/hooks/use-form-progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";

interface BookingWidgetProps {
  className?: string;
  buttonText?: string;
  fullWidth?: boolean;
}

export function BookingWidget({ 
  className = "", 
  buttonText = "Book a Free Consultation", 
  fullWidth = false 
}: BookingWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    company: "",
    industry: "",
    size: "",
    systems: [] as string[],
    aiInterests: [] as string[],
    name: "",
    email: "",
    phone: "",
  });

  const { saveProgress } = useFormProgress('consultation-form');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      saveProgress(updated);
      return updated;
    });
  };

  const handleCheckboxChange = (field: "systems" | "aiInterests", value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      
      return { ...prev, [field]: updated };
    });
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        return formData.company && formData.industry && formData.size;
      case 2:
        return true; // Optional fields
      default:
        return true;
    }
  };

  const nextStep = async () => {
    if (validateCurrentStep()) {
      if (step === 2) {
        await apiRequest('POST', '/api/assessment', formData);
      }
      setStep(prev => prev + 1);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="lg" 
          className={`bg-primary hover:bg-primary/90 text-white flex items-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
        >
          <Calendar className="h-5 w-5" />
          {buttonText}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[700px] overflow-y-auto" side="right">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl">Schedule Your AI Consultation</SheetTitle>
          <SheetDescription>
            {step === 1 && "First, let's understand your business needs better."}
            {step === 2 && "Tell us about your AI interests and current systems."}
            {step === 3 && "Choose a date and time for your consultation."}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(v) => handleInputChange("industry", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Select value={formData.size} onValueChange={(v) => handleInputChange("size", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Which data systems do you currently use?</Label>
                  {["CRM", "ERP", "Analytics", "Cloud Infrastructure"].map((system) => (
                    <div key={system} className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        checked={formData.systems.includes(system)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("systems", system, checked === true)
                        }
                      />
                      <Label>{system}</Label>
                    </div>
                  ))}
                </div>
                <div>
                  <Label className="mb-2 block">What are your AI interests?</Label>
                  {["Process Automation", "Customer Service", "Analytics", "Content Generation"].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        checked={formData.aiInterests.includes(interest)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("aiInterests", interest, checked === true)
                        }
                      />
                      <Label>{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && <BookingCalendar assessmentData={formData} />}

            {step < 3 && (
              <div className="mt-6">
                <Button 
                  onClick={nextStep}
                  className="w-full"
                  disabled={!validateCurrentStep()}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
