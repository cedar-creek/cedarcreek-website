import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";

const intakeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  legacyEnvironment: z.string().min(1, "Please select your legacy environment"),
  modernizationGoals: z.array(z.string()).min(1, "Please select at least one goal"),
  productivityStack: z.array(z.string()),
  projectUrgency: z.string().min(1, "Please select project urgency"),
});

type IntakeFormData = z.infer<typeof intakeFormSchema>;

export function IntakeForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<IntakeFormData>>({
    name: "",
    company: "",
    email: "",
    legacyEnvironment: "",
    modernizationGoals: [],
    productivityStack: [],
    projectUrgency: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const modernizationOptions = [
    { id: "ai-automation", label: "AI Automation" },
    { id: "go-microservices", label: "Go Microservices Migration" },
    { id: "svelte-frontend", label: "Svelte Frontend Overhaul" },
    { id: "ionic-mobile", label: "Ionic Mobile App" },
  ];

  const productivityOptions = [
    { id: "clickup", label: "ClickUp" },
    { id: "google-workspace", label: "Google Workspace" },
    { id: "microsoft-365", label: "Microsoft 365" },
    { id: "slack", label: "Slack" },
  ];

  const handleCheckboxChange = (field: "modernizationGoals" | "productivityStack", value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      return { ...prev, [field]: updated };
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    try {
      intakeFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please check your form",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/intake", formData);
      setIsSubmitted(true);
      toast({
        title: "Request Submitted",
        description: "Your AI Acceleration Plan request has been received!",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="bg-primary/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-neutral-300 mb-4 max-w-md mx-auto">
          Your request has been received. Our team will prepare your custom 
          AI Acceleration Plan and deliver it within 24 hours.
        </p>
        <p className="text-neutral-400 text-sm">
          Check your email for confirmation and next steps.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Request Your Custom AI Acceleration Plan
        </h2>
        <p className="text-neutral-400">
          Receive your 90-day modernization roadmap within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-neutral-200 mb-2 block">
              Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
              }}
              className="bg-neutral-900 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-primary focus:ring-primary"
              placeholder="Your full name"
              data-testid="intake-name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="company" className="text-neutral-200 mb-2 block">
              Company Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, company: e.target.value }));
                if (errors.company) setErrors(prev => ({ ...prev, company: "" }));
              }}
              className="bg-neutral-900 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-primary focus:ring-primary"
              placeholder="Your company name"
              data-testid="intake-company"
            />
            {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-neutral-200 mb-2 block">
              Work Email <span className="text-primary">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
              }}
              className="bg-neutral-900 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-primary focus:ring-primary"
              placeholder="you@company.com"
              data-testid="intake-email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="legacyEnvironment" className="text-neutral-200 mb-2 block">
              Legacy Environment <span className="text-primary">*</span>
            </Label>
            <Select
              value={formData.legacyEnvironment}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, legacyEnvironment: value }));
                if (errors.legacyEnvironment) setErrors(prev => ({ ...prev, legacyEnvironment: "" }));
              }}
            >
              <SelectTrigger 
                id="legacyEnvironment"
                className="bg-neutral-900 border-neutral-600 text-white focus:border-primary focus:ring-primary"
                data-testid="intake-legacy-environment"
              >
                <SelectValue placeholder="Select your primary legacy stack" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-700">
                <SelectItem value="coldfusion" className="text-white hover:bg-neutral-700">ColdFusion</SelectItem>
                <SelectItem value="sql-server" className="text-white hover:bg-neutral-700">SQL Server</SelectItem>
                <SelectItem value="legacy-dotnet" className="text-white hover:bg-neutral-700">Legacy .NET</SelectItem>
                <SelectItem value="java" className="text-white hover:bg-neutral-700">Java</SelectItem>
                <SelectItem value="other" className="text-white hover:bg-neutral-700">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.legacyEnvironment && <p className="text-red-400 text-sm mt-1">{errors.legacyEnvironment}</p>}
          </div>

          <div>
            <Label className="text-neutral-200 mb-3 block">
              Modernization Goals <span className="text-primary">*</span>
            </Label>
            <div className="space-y-3">
              {modernizationOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <Checkbox
                    id={option.id}
                    checked={(formData.modernizationGoals || []).includes(option.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("modernizationGoals", option.id, checked === true)
                    }
                    className="border-neutral-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    data-testid={`intake-goal-${option.id}`}
                  />
                  <Label
                    htmlFor={option.id}
                    className="ml-3 text-neutral-300 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.modernizationGoals && <p className="text-red-400 text-sm mt-1">{errors.modernizationGoals}</p>}
          </div>

          <div>
            <Label className="text-neutral-200 mb-3 block">
              Current Productivity Stack
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {productivityOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <Checkbox
                    id={option.id}
                    checked={(formData.productivityStack || []).includes(option.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("productivityStack", option.id, checked === true)
                    }
                    className="border-neutral-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    data-testid={`intake-stack-${option.id}`}
                  />
                  <Label
                    htmlFor={option.id}
                    className="ml-3 text-neutral-300 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="projectUrgency" className="text-neutral-200 mb-2 block">
              Project Urgency <span className="text-primary">*</span>
            </Label>
            <Select
              value={formData.projectUrgency}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, projectUrgency: value }));
                if (errors.projectUrgency) setErrors(prev => ({ ...prev, projectUrgency: "" }));
              }}
            >
              <SelectTrigger 
                id="projectUrgency"
                className="bg-neutral-900 border-neutral-600 text-white focus:border-primary focus:ring-primary"
                data-testid="intake-urgency"
              >
                <SelectValue placeholder="When do you need to start?" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-700">
                <SelectItem value="immediate" className="text-white hover:bg-neutral-700">Immediate (Next 30 days)</SelectItem>
                <SelectItem value="short-term" className="text-white hover:bg-neutral-700">Short-term (1-3 months)</SelectItem>
                <SelectItem value="exploring" className="text-white hover:bg-neutral-700">Exploring</SelectItem>
              </SelectContent>
            </Select>
            {errors.projectUrgency && <p className="text-red-400 text-sm mt-1">{errors.projectUrgency}</p>}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
          data-testid="intake-submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Get Your Custom AI Acceleration Plan"
          )}
        </Button>

        <p className="text-center text-neutral-500 text-sm">
          By submitting, you agree to receive your personalized modernization roadmap 
          and occasional updates from CedarCreek.AI.
        </p>
      </form>
    </div>
  );
}
