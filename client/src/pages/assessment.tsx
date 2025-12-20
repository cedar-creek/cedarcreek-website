import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useRecaptcha } from "@/hooks/use-recaptcha";
import { apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowLeft, ArrowRight, Clock, AlertCircle } from "lucide-react";

interface AssessmentData {
  name: string;
  email: string;
  company: string;
  phone: string;
  title: string;
  industry: string;
  annualRevenue: string;
  employeeCount: string;
  legacyStack: string;
  coldboxFramework: string;
  sqlServerOptimization: string;
  coldFusionNeeds: string[];
  productivityStack: string[];
  businessDescription: string;
  competitiveAdvantage: string;
  salesProcess: string;
  customerProfile: string;
  operationalChallenges: string[];
  departments: string[];
  currentTools: string[];
  techInfrastructure: string;
  aiExperience: string;
  aiGoals: string[];
  manualProcesses: string;
  bottleneckProcesses: string;
  documentProcesses: string[];
  customerChannels: string[];
  priorityAreas: string[];
  modernizationGoal: string;
  implementationTimeframe: string;
  budgetRange: string;
  specificOutcomes: string;
  concerns: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const initialAssessmentData: AssessmentData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  title: "",
  industry: "",
  annualRevenue: "",
  employeeCount: "",
  legacyStack: "",
  coldboxFramework: "",
  sqlServerOptimization: "",
  coldFusionNeeds: [],
  productivityStack: [],
  businessDescription: "",
  competitiveAdvantage: "",
  salesProcess: "",
  customerProfile: "",
  operationalChallenges: [],
  departments: [],
  currentTools: [],
  techInfrastructure: "",
  aiExperience: "",
  aiGoals: [],
  manualProcesses: "",
  bottleneckProcesses: "",
  documentProcesses: [],
  customerChannels: [],
  priorityAreas: [],
  modernizationGoal: "",
  implementationTimeframe: "",
  budgetRange: "",
  specificOutcomes: "",
  concerns: "",
};

export default function Assessment() {
  const { toast } = useToast();
  const { executeRecaptcha } = useRecaptcha();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<AssessmentData>(initialAssessmentData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [hasIntakeData, setHasIntakeData] = useState(false);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    const storedData = sessionStorage.getItem("intakeData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const hasData = !!(parsed.name && parsed.email);
      setHasIntakeData(hasData);
      setFormData(prev => ({
        ...prev,
        name: parsed.name || "",
        email: parsed.email || "",
        company: parsed.company || "",
      }));
    }
  }, []);

  const updateField = (field: keyof AssessmentData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (field: keyof AssessmentData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = (prev[field] as string[]) || [];
      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      return { ...prev, [field]: updated };
    });
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (step === 1) {
      if (!formData.company.trim()) newErrors.company = "Company name is required";
      if (!formData.industry) newErrors.industry = "Industry is required";
    }
    
    if (step === 2) {
      if (!formData.legacyStack) newErrors.legacyStack = "Primary legacy stack is required";
      if (formData.productivityStack.length === 0) newErrors.productivityStack = "Please select at least one productivity tool";
    }
    
    if (step === 4) {
      if (!formData.modernizationGoal) newErrors.modernizationGoal = "Modernization goal is required";
      if (!formData.budgetRange) newErrors.budgetRange = "Expected budget is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('assessment_form');
      
      await apiRequest("POST", "/api/assessments", {
        ...formData,
        recaptchaToken
      });
      setIsComplete(true);
      sessionStorage.removeItem("intakeData");
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

  if (isComplete) {
    return (
      <>
        <Helmet>
          <title>Assessment Complete | CedarCreek.AI</title>
        </Helmet>
        <div className="min-h-screen bg-neutral-900 py-16">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neutral-800 rounded-xl p-8 border border-neutral-700 text-center"
            >
              <div className="bg-green-500/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
              <p className="text-neutral-300 text-lg mb-4">
                Your free Strategy Roadmap is being generated.
              </p>
              <p className="text-neutral-300 mb-6">
                A deep-dive Technical Code Audit and security review are included as part of our{" "}
                <span className="text-primary font-semibold">Rapid Start Accelerator</span> package{" "}
                <span className="text-white font-medium">($15,000+)</span>.
              </p>
              <div className="bg-neutral-700/50 rounded-lg p-4 mb-6">
                <p className="text-neutral-400 text-sm">
                  A confirmation email has been sent to <span className="text-primary font-medium">{formData.email}</span>
                </p>
              </div>
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="assessment-return-home"
              >
                Return to Homepage
              </Button>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>AI Readiness Assessment | CedarCreek.AI</title>
        <meta name="description" content="Complete our comprehensive AI Readiness Assessment to receive your custom 24-hour Strategy Roadmap." />
      </Helmet>
      <div className="min-h-screen bg-neutral-900 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Step 2: Fast-Track Your Roadmap</p>
                <p className="text-neutral-300 text-sm">
                  <strong>Completion of this assessment is required</strong> to receive your custom 24-hour Strategy Roadmap. 
                  This takes about 10 minutes and covers your legacy architecture and operational bottlenecks.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
            <div className="p-6 border-b border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">AI Readiness Assessment</h1>
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>~10 minutes</span>
                </div>
              </div>
              <Progress value={progress} className="h-2 bg-neutral-700" />
              <p className="text-neutral-400 text-sm mt-2">Step {currentStep} of {totalSteps}</p>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-white mb-4">Contact & Company Profile</h2>
                      
                      {hasIntakeData ? (
                        <div className="bg-neutral-700/50 rounded-lg p-4 mb-4">
                          <p className="text-neutral-300 text-sm mb-2">Contact information from your intake form:</p>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <p className="text-white"><span className="text-neutral-400">Name:</span> {formData.name}</p>
                            <p className="text-white"><span className="text-neutral-400">Email:</span> {formData.email}</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-neutral-200 mb-2 block">Full Name *</Label>
                              <Input
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                className="bg-neutral-900 border-neutral-600 text-white"
                                placeholder="Your full name"
                                data-testid="assessment-name"
                              />
                            </div>
                            <div>
                              <Label className="text-neutral-200 mb-2 block">Email *</Label>
                              <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateField("email", e.target.value)}
                                className="bg-neutral-900 border-neutral-600 text-white"
                                placeholder="you@company.com"
                                data-testid="assessment-email"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Job Title</Label>
                          <Input
                            value={formData.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="bg-neutral-900 border-neutral-600 text-white"
                            placeholder="Your job title"
                            data-testid="assessment-title"
                          />
                        </div>
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Phone</Label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            className="bg-neutral-900 border-neutral-600 text-white"
                            placeholder="Your phone number"
                            data-testid="assessment-phone"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Company Name *</Label>
                          <Input
                            value={formData.company}
                            onChange={(e) => updateField("company", e.target.value)}
                            className={`bg-neutral-900 border-neutral-600 text-white ${errors.company ? "border-red-500" : ""}`}
                            placeholder="Your company name"
                            data-testid="assessment-company"
                          />
                          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                        </div>
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Industry *</Label>
                          <Select value={formData.industry} onValueChange={(v) => updateField("industry", v)}>
                            <SelectTrigger className={`bg-neutral-900 border-neutral-600 text-white ${errors.industry ? "border-red-500" : ""}`} data-testid="assessment-industry">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              <SelectItem value="technology" className="text-white">Technology</SelectItem>
                              <SelectItem value="manufacturing" className="text-white">Manufacturing</SelectItem>
                              <SelectItem value="healthcare" className="text-white">Healthcare</SelectItem>
                              <SelectItem value="finance" className="text-white">Finance</SelectItem>
                              <SelectItem value="retail" className="text-white">Retail</SelectItem>
                              <SelectItem value="professional-services" className="text-white">Professional Services</SelectItem>
                              <SelectItem value="other" className="text-white">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Annual Revenue</Label>
                          <Select value={formData.annualRevenue} onValueChange={(v) => updateField("annualRevenue", v)}>
                            <SelectTrigger className="bg-neutral-900 border-neutral-600 text-white" data-testid="assessment-revenue">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              <SelectItem value="under-1m" className="text-white">Under $1M</SelectItem>
                              <SelectItem value="1m-10m" className="text-white">$1M - $10M</SelectItem>
                              <SelectItem value="10m-50m" className="text-white">$10M - $50M</SelectItem>
                              <SelectItem value="50m-100m" className="text-white">$50M - $100M</SelectItem>
                              <SelectItem value="over-100m" className="text-white">Over $100M</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Number of Employees</Label>
                          <Select value={formData.employeeCount} onValueChange={(v) => updateField("employeeCount", v)}>
                            <SelectTrigger className="bg-neutral-900 border-neutral-600 text-white" data-testid="assessment-employees">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              <SelectItem value="1-10" className="text-white">1-10</SelectItem>
                              <SelectItem value="11-50" className="text-white">11-50</SelectItem>
                              <SelectItem value="51-200" className="text-white">51-200</SelectItem>
                              <SelectItem value="201-1000" className="text-white">201-1000</SelectItem>
                              <SelectItem value="1000+" className="text-white">1000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-white mb-4">Technology & Business Overview</h2>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Primary Legacy Stack *</Label>
                          <Select value={formData.legacyStack} onValueChange={(v) => updateField("legacyStack", v)}>
                            <SelectTrigger className={`bg-neutral-900 border-neutral-600 text-white ${errors.legacyStack ? "border-red-500" : ""}`} data-testid="assessment-legacy-stack">
                              <SelectValue placeholder="Select your legacy environment" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              <SelectItem value="coldfusion" className="text-white">ColdFusion / ColdBox</SelectItem>
                              <SelectItem value="php" className="text-white">PHP / Laravel / WordPress</SelectItem>
                              <SelectItem value="sqlserver" className="text-white">SQL Server / .NET</SelectItem>
                              <SelectItem value="java" className="text-white">Java / Spring</SelectItem>
                              <SelectItem value="python" className="text-white">Python / Django</SelectItem>
                              <SelectItem value="mixed" className="text-white">Mixed / Multiple Systems</SelectItem>
                              <SelectItem value="other" className="text-white">Other Legacy System</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.legacyStack && <p className="text-red-500 text-sm mt-1">{errors.legacyStack}</p>}
                        </div>
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Productivity Stack * (select all that apply)</Label>
                          <div className={`space-y-2 p-3 rounded-lg border ${errors.productivityStack ? "border-red-500" : "border-neutral-700"} bg-neutral-900`}>
                            {["ClickUp", "Google Workspace", "Microsoft 365", "Notion", "Slack", "Monday.com", "Asana", "Jira"].map((tool) => (
                              <div key={tool} className="flex items-center">
                                <Checkbox
                                  id={`productivity-${tool}`}
                                  checked={formData.productivityStack.includes(tool)}
                                  onCheckedChange={(checked) => handleCheckboxChange("productivityStack", tool, checked === true)}
                                  className="border-neutral-500 data-[state=checked]:bg-primary"
                                  data-testid={`assessment-productivity-${tool.toLowerCase().replace(/\s/g, '-')}`}
                                />
                                <Label htmlFor={`productivity-${tool}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{tool}</Label>
                              </div>
                            ))}
                          </div>
                          {errors.productivityStack && <p className="text-red-500 text-sm mt-1">{errors.productivityStack}</p>}
                        </div>
                      </div>

                      {formData.legacyStack === "coldfusion" && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-neutral-800/50 border border-primary/30 rounded-lg p-5 space-y-5"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <h3 className="text-lg font-semibold text-primary">ColdFusion Expertise Questions</h3>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <Label className="text-neutral-200 mb-2 block">Are you currently using the ColdBox Framework?</Label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="coldboxFramework"
                                    value="yes"
                                    checked={formData.coldboxFramework === "yes"}
                                    onChange={(e) => updateField("coldboxFramework", e.target.value)}
                                    className="w-4 h-4 text-primary bg-neutral-900 border-neutral-600 focus:ring-primary"
                                    data-testid="coldbox-yes"
                                  />
                                  <span className="text-neutral-300">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="coldboxFramework"
                                    value="no"
                                    checked={formData.coldboxFramework === "no"}
                                    onChange={(e) => updateField("coldboxFramework", e.target.value)}
                                    className="w-4 h-4 text-primary bg-neutral-900 border-neutral-600 focus:ring-primary"
                                    data-testid="coldbox-no"
                                  />
                                  <span className="text-neutral-300">No</span>
                                </label>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-neutral-200 mb-2 block">Do you require SQL Server Optimization or Administration?</Label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="sqlServerOptimization"
                                    value="yes"
                                    checked={formData.sqlServerOptimization === "yes"}
                                    onChange={(e) => updateField("sqlServerOptimization", e.target.value)}
                                    className="w-4 h-4 text-primary bg-neutral-900 border-neutral-600 focus:ring-primary"
                                    data-testid="sqlserver-yes"
                                  />
                                  <span className="text-neutral-300">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="sqlServerOptimization"
                                    value="no"
                                    checked={formData.sqlServerOptimization === "no"}
                                    onChange={(e) => updateField("sqlServerOptimization", e.target.value)}
                                    className="w-4 h-4 text-primary bg-neutral-900 border-neutral-600 focus:ring-primary"
                                    data-testid="sqlserver-no"
                                  />
                                  <span className="text-neutral-300">No</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-neutral-200 mb-3 block">Which areas require immediate attention?</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {[
                                "Security Reviews & Vulnerability Scans",
                                "Legacy System Maintenance",
                                "Monolithic to Microservices Migration"
                              ].map((need) => (
                                <div key={need} className="flex items-center">
                                  <Checkbox
                                    id={`cfneed-${need}`}
                                    checked={formData.coldFusionNeeds.includes(need)}
                                    onCheckedChange={(checked) => handleCheckboxChange("coldFusionNeeds", need, checked === true)}
                                    className="border-neutral-500 data-[state=checked]:bg-primary"
                                    data-testid={`cfneed-${need.toLowerCase().replace(/\s/g, '-')}`}
                                  />
                                  <Label htmlFor={`cfneed-${need}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{need}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div>
                        <Label className="text-neutral-200 mb-2 block">Describe your core business - what products/services do you offer?</Label>
                        <Textarea
                          value={formData.businessDescription}
                          onChange={(e) => updateField("businessDescription", e.target.value)}
                          className="bg-neutral-900 border-neutral-600 text-white min-h-[100px]"
                          placeholder="Tell us about your business..."
                          data-testid="assessment-business-desc"
                        />
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-2 block">What makes your business unique? What are your competitive advantages?</Label>
                        <Textarea
                          value={formData.competitiveAdvantage}
                          onChange={(e) => updateField("competitiveAdvantage", e.target.value)}
                          className="bg-neutral-900 border-neutral-600 text-white min-h-[100px]"
                          placeholder="Describe your competitive advantages..."
                          data-testid="assessment-competitive"
                        />
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-3 block">Which departments exist in your organization?</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["Sales", "Marketing", "Customer Service", "Operations", "Finance/Accounting", "HR", "IT/Technology", "R&D", "Manufacturing"].map((dept) => (
                            <div key={dept} className="flex items-center">
                              <Checkbox
                                id={`dept-${dept}`}
                                checked={formData.departments.includes(dept)}
                                onCheckedChange={(checked) => handleCheckboxChange("departments", dept, checked === true)}
                                className="border-neutral-500 data-[state=checked]:bg-primary"
                                data-testid={`assessment-dept-${dept.toLowerCase()}`}
                              />
                              <Label htmlFor={`dept-${dept}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{dept}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-3 block">Top operational challenges (select all that apply)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["Manual data entry", "Slow reporting", "System integration issues", "Legacy software limitations", "Data silos", "Compliance tracking", "Customer communication gaps", "Workflow bottlenecks"].map((challenge) => (
                            <div key={challenge} className="flex items-center">
                              <Checkbox
                                id={`challenge-${challenge}`}
                                checked={formData.operationalChallenges.includes(challenge)}
                                onCheckedChange={(checked) => handleCheckboxChange("operationalChallenges", challenge, checked === true)}
                                className="border-neutral-500 data-[state=checked]:bg-primary"
                              />
                              <Label htmlFor={`challenge-${challenge}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{challenge}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-white mb-4">Technology Assessment</h2>
                      
                      <div>
                        <Label className="text-neutral-200 mb-3 block">Which business tools do you currently use?</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["CRM", "ERP", "Marketing Automation", "Customer Service Software", "Project Management", "Communication Tools", "Analytics Tools", "Accounting Software"].map((tool) => (
                            <div key={tool} className="flex items-center">
                              <Checkbox
                                id={`tool-${tool}`}
                                checked={formData.currentTools.includes(tool)}
                                onCheckedChange={(checked) => handleCheckboxChange("currentTools", tool, checked === true)}
                                className="border-neutral-500 data-[state=checked]:bg-primary"
                              />
                              <Label htmlFor={`tool-${tool}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{tool}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-2 block">How would you rate your technology infrastructure?</Label>
                        <Select value={formData.techInfrastructure} onValueChange={(v) => updateField("techInfrastructure", v)}>
                          <SelectTrigger className="bg-neutral-900 border-neutral-600 text-white" data-testid="assessment-tech-level">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-800 border-neutral-700">
                            <SelectItem value="basic" className="text-white">Basic (Minimal digital tools)</SelectItem>
                            <SelectItem value="developing" className="text-white">Developing (Key systems but not integrated)</SelectItem>
                            <SelectItem value="advanced" className="text-white">Advanced (Well-integrated systems)</SelectItem>
                            <SelectItem value="leading" className="text-white">Leading Edge (Fully digital, data-driven)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-2 block">What is your current AI experience level?</Label>
                        <Select value={formData.aiExperience} onValueChange={(v) => updateField("aiExperience", v)}>
                          <SelectTrigger className="bg-neutral-900 border-neutral-600 text-white" data-testid="assessment-ai-exp">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-800 border-neutral-700">
                            <SelectItem value="none" className="text-white">No AI experience</SelectItem>
                            <SelectItem value="exploring" className="text-white">Exploring AI options</SelectItem>
                            <SelectItem value="pilot" className="text-white">Pilot projects underway</SelectItem>
                            <SelectItem value="some" className="text-white">Some AI solutions implemented</SelectItem>
                            <SelectItem value="extensive" className="text-white">Extensive AI implementation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-3 block">Primary goals for AI adoption</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["Reduce operational costs", "Improve efficiency", "Enhance customer experience", "Increase revenue", "Gain competitive advantage", "Improve decision making", "Automate routine tasks", "Better data analysis"].map((goal) => (
                            <div key={goal} className="flex items-center">
                              <Checkbox
                                id={`goal-${goal}`}
                                checked={formData.aiGoals.includes(goal)}
                                onCheckedChange={(checked) => handleCheckboxChange("aiGoals", goal, checked === true)}
                                className="border-neutral-500 data-[state=checked]:bg-primary"
                              />
                              <Label htmlFor={`goal-${goal}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{goal}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-white mb-4">Goals & Investment</h2>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Primary Modernization Goal *</Label>
                          <Select value={formData.modernizationGoal} onValueChange={(v) => updateField("modernizationGoal", v)}>
                            <SelectTrigger className={`bg-neutral-900 border-neutral-600 text-white ${errors.modernizationGoal ? "border-red-500" : ""}`} data-testid="assessment-mod-goal">
                              <SelectValue placeholder="Select your primary goal" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              <SelectItem value="performance" className="text-white">Improve Performance & Speed</SelectItem>
                              <SelectItem value="scalability" className="text-white">Enhance Scalability</SelectItem>
                              <SelectItem value="security" className="text-white">Security & Compliance Updates</SelectItem>
                              <SelectItem value="ai-integration" className="text-white">AI/ML Integration</SelectItem>
                              <SelectItem value="mobile" className="text-white">Mobile App Development</SelectItem>
                              <SelectItem value="cloud-migration" className="text-white">Cloud Migration</SelectItem>
                              <SelectItem value="full-rewrite" className="text-white">Full System Rewrite</SelectItem>
                              <SelectItem value="maintenance" className="text-white">Reduce Maintenance Costs</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.modernizationGoal && <p className="text-red-500 text-sm mt-1">{errors.modernizationGoal}</p>}
                        </div>
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Expected Budget Range *</Label>
                          <Select value={formData.budgetRange} onValueChange={(v) => updateField("budgetRange", v)}>
                            <SelectTrigger className={`bg-neutral-900 border-neutral-600 text-white ${errors.budgetRange ? "border-red-500" : ""}`} data-testid="assessment-budget">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              <SelectItem value="under-25k" className="text-white">Under $25,000</SelectItem>
                              <SelectItem value="25k-50k" className="text-white">$25,000 - $50,000</SelectItem>
                              <SelectItem value="50k-100k" className="text-white">$50,000 - $100,000</SelectItem>
                              <SelectItem value="over-100k" className="text-white">Over $100,000</SelectItem>
                              <SelectItem value="undetermined" className="text-white">Not yet determined</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.budgetRange && <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>}
                        </div>
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-2 block">Which processes are currently manual or semi-automated?</Label>
                        <Textarea
                          value={formData.manualProcesses}
                          onChange={(e) => updateField("manualProcesses", e.target.value)}
                          className="bg-neutral-900 border-neutral-600 text-white min-h-[100px]"
                          placeholder="Describe manual processes..."
                          data-testid="assessment-manual"
                        />
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-2 block">Which processes cause the most bottlenecks or delays?</Label>
                        <Textarea
                          value={formData.bottleneckProcesses}
                          onChange={(e) => updateField("bottleneckProcesses", e.target.value)}
                          className="bg-neutral-900 border-neutral-600 text-white min-h-[100px]"
                          placeholder="Describe bottleneck processes..."
                          data-testid="assessment-bottlenecks"
                        />
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-3 block">Which processes involve significant document processing?</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["Invoice processing", "Contract review", "Customer documentation", "HR documentation", "Quality control docs", "Reports and analytics"].map((doc) => (
                            <div key={doc} className="flex items-center">
                              <Checkbox
                                id={`doc-${doc}`}
                                checked={formData.documentProcesses.includes(doc)}
                                onCheckedChange={(checked) => handleCheckboxChange("documentProcesses", doc, checked === true)}
                                className="border-neutral-500 data-[state=checked]:bg-primary"
                              />
                              <Label htmlFor={`doc-${doc}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{doc}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-white mb-4">Priority & Timeline</h2>
                      
                      <div>
                        <Label className="text-neutral-200 mb-3 block">Priority areas for improvement</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["Process automation", "Customer service enhancement", "Data analysis & reporting", "Document processing", "Quality control", "Decision support", "Sales optimization", "Cost reduction"].map((area) => (
                            <div key={area} className="flex items-center">
                              <Checkbox
                                id={`priority-${area}`}
                                checked={formData.priorityAreas.includes(area)}
                                onCheckedChange={(checked) => handleCheckboxChange("priorityAreas", area, checked === true)}
                                className="border-neutral-500 data-[state=checked]:bg-primary"
                              />
                              <Label htmlFor={`priority-${area}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{area}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-neutral-200 mb-2 block">Implementation Timeframe</Label>
                          <Select value={formData.implementationTimeframe} onValueChange={(v) => updateField("implementationTimeframe", v)}>
                            <SelectTrigger className="bg-neutral-900 border-neutral-600 text-white" data-testid="assessment-timeframe">
                              <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              <SelectItem value="immediate" className="text-white">Immediate (Next 30 days)</SelectItem>
                              <SelectItem value="short-term" className="text-white">Short-term (1-3 months)</SelectItem>
                              <SelectItem value="medium-term" className="text-white">Medium-term (3-6 months)</SelectItem>
                              <SelectItem value="long-term" className="text-white">Long-term (6+ months)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-neutral-200 mb-3 block">Customer interaction channels</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Phone", "Email", "Chat", "Social media", "In-person", "Self-service portal"].map((channel) => (
                              <div key={channel} className="flex items-center">
                                <Checkbox
                                  id={`channel-${channel}`}
                                  checked={formData.customerChannels.includes(channel)}
                                  onCheckedChange={(checked) => handleCheckboxChange("customerChannels", channel, checked === true)}
                                  className="border-neutral-500 data-[state=checked]:bg-primary"
                                />
                                <Label htmlFor={`channel-${channel}`} className="ml-2 text-neutral-300 text-sm cursor-pointer">{channel}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-2 block">What specific outcomes would you like to achieve?</Label>
                        <Textarea
                          value={formData.specificOutcomes}
                          onChange={(e) => updateField("specificOutcomes", e.target.value)}
                          className="bg-neutral-900 border-neutral-600 text-white min-h-[100px]"
                          placeholder="Describe your desired outcomes..."
                          data-testid="assessment-outcomes"
                        />
                      </div>

                      <div>
                        <Label className="text-neutral-200 mb-2 block">Any concerns or constraints we should know about?</Label>
                        <Textarea
                          value={formData.concerns}
                          onChange={(e) => updateField("concerns", e.target.value)}
                          className="bg-neutral-900 border-neutral-600 text-white min-h-[100px]"
                          placeholder="Share any concerns..."
                          data-testid="assessment-concerns"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-6 border-t border-neutral-700 flex justify-between">
              <Button
                onClick={handleBack}
                disabled={currentStep === 1}
                variant="outline"
                className="border-neutral-600 text-neutral-300 hover:bg-neutral-700"
                data-testid="assessment-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90 text-white"
                  data-testid="assessment-next"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="assessment-submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Submit Assessment
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
