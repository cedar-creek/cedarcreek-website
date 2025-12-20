import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useRecaptcha } from "@/hooks/use-recaptcha";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const intakeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  legacyEnvironment: z.string().min(1, "Please select your legacy environment"),
  legacyEnvironmentOther: z.string().optional(),
  modernizationGoals: z.array(z.string()).min(1, "Please select at least one goal"),
  modernizationGoalsOther: z.string().optional(),
  productivityStack: z.array(z.string()),
  productivityStackOther: z.string().optional(),
  projectUrgency: z.string().min(1, "Please select project urgency"),
});

type IntakeFormData = z.infer<typeof intakeFormSchema>;

export function IntakeForm() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha, isReady: isRecaptchaReady, loadFailed: recaptchaLoadFailed } = useRecaptcha();
  const [formData, setFormData] = useState<Partial<IntakeFormData>>({
    name: "",
    company: "",
    email: "",
    legacyEnvironment: "",
    legacyEnvironmentOther: "",
    modernizationGoals: [],
    modernizationGoalsOther: "",
    productivityStack: [],
    productivityStackOther: "",
    projectUrgency: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const modernizationOptions = [
    { id: "ai-automation", label: "AI Automation" },
    { id: "go-microservices", label: "Go Microservices Migration" },
    { id: "svelte-frontend", label: "Svelte Frontend Overhaul" },
    { id: "ionic-mobile", label: "Ionic Mobile App" },
    { id: "other-custom", label: "Other / Custom Solution" },
  ];

  const productivityOptions = [
    { id: "clickup", label: "ClickUp" },
    { id: "google-workspace", label: "Google Workspace" },
    { id: "microsoft-365", label: "Microsoft 365" },
    { id: "slack", label: "Slack" },
    { id: "other-tools", label: "Other / Multiple Tools" },
  ];

  const handleCheckboxChange = (field: "modernizationGoals" | "productivityStack", value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      
      // Clear corresponding "Other" field when unchecked
      const updates: Partial<IntakeFormData> = { [field]: updated };
      if (!checked) {
        if (field === "modernizationGoals" && value === "other-custom") {
          updates.modernizationGoalsOther = "";
        }
        if (field === "productivityStack" && value === "other-tools") {
          updates.productivityStackOther = "";
        }
      }
      
      return { ...prev, ...updates };
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
      // Get reCAPTCHA token (will return 'LOAD_FAILED' if script couldn't load)
      const recaptchaToken = await executeRecaptcha('intake_form');
      
      if (!recaptchaToken && !recaptchaLoadFailed) {
        toast({
          title: "Security Check Loading",
          description: "Please wait a moment and try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      await apiRequest("POST", "/api/intake", {
        ...formData,
        recaptchaToken
      });
      
      // Store user data for assessment page
      sessionStorage.setItem("intakeData", JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        legacyEnvironment: formData.legacyEnvironment,
      }));
      
      toast({
        title: "Preliminary Goals Received",
        description: "We've received your information. Continue to the next step...",
      });
      
      // Show empathetic bridge message, then redirect to assessment page
      sessionStorage.setItem("showBridgeMessage", "true");
      setTimeout(() => {
        setLocation("/assessment");
      }, 1000);
    } catch (error: any) {
      console.error("Intake form submission error:", error);
      const errorMessage = error?.message || "There was an error submitting your request. Please try again.";
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Request Your Custom AI Acceleration Plan
        </h2>
        <p className="text-neutral-400">
          Receive your 90-day modernization roadmap within 5 business days
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
                setFormData(prev => ({ 
                  ...prev, 
                  legacyEnvironment: value,
                  legacyEnvironmentOther: value === "other-proprietary" ? prev.legacyEnvironmentOther : ""
                }));
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
                <SelectItem value="other-proprietary" className="text-white hover:bg-neutral-700">Other / Proprietary System</SelectItem>
              </SelectContent>
            </Select>
            {errors.legacyEnvironment && <p className="text-red-400 text-sm mt-1">{errors.legacyEnvironment}</p>}
            
            {formData.legacyEnvironment === "other-proprietary" && (
              <div className="mt-3">
                <Label htmlFor="legacyEnvironmentOther" className="text-neutral-200 mb-2 block text-sm">
                  Specify your current tech stack
                </Label>
                <Input
                  id="legacyEnvironmentOther"
                  type="text"
                  value={formData.legacyEnvironmentOther || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, legacyEnvironmentOther: e.target.value }))}
                  className="bg-neutral-900 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-primary focus:ring-primary"
                  placeholder="e.g., Custom PHP framework, COBOL, etc."
                  data-testid="intake-legacy-other"
                />
              </div>
            )}
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
            
            {(formData.modernizationGoals || []).includes("other-custom") && (
              <div className="mt-3 ml-7">
                <Label htmlFor="modernizationGoalsOther" className="text-neutral-200 mb-2 block text-sm">
                  Please briefly describe your specific goal
                </Label>
                <textarea
                  id="modernizationGoalsOther"
                  value={formData.modernizationGoalsOther || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, modernizationGoalsOther: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-600 text-white placeholder:text-neutral-500 focus:border-primary focus:ring-primary rounded-md px-3 py-2 text-sm min-h-[80px] resize-none"
                  placeholder="Describe your custom modernization goal..."
                  data-testid="intake-goals-other"
                />
              </div>
            )}
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
            
            {(formData.productivityStack || []).includes("other-tools") && (
              <div className="mt-3 col-span-2">
                <Label htmlFor="productivityStackOther" className="text-neutral-200 mb-2 block text-sm">
                  Please specify your primary productivity tools
                </Label>
                <Input
                  id="productivityStackOther"
                  type="text"
                  value={formData.productivityStackOther || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, productivityStackOther: e.target.value }))}
                  className="bg-neutral-900 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-primary focus:ring-primary"
                  placeholder="e.g., Notion, Asana, Jira, etc."
                  data-testid="intake-stack-other"
                />
              </div>
            )}
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
