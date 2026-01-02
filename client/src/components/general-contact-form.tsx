import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRecaptcha } from "@/hooks/use-recaptcha";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, CheckCircle2, Send, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";
import { generalContactSchema, type GeneralContactInput } from "@shared/schema";

export function GeneralContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { executeRecaptcha, isReady: isRecaptchaReady, loadFailed: recaptchaLoadFailed } = useRecaptcha();
  const [formData, setFormData] = useState<Partial<GeneralContactInput>>({
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    try {
      generalContactSchema.parse(formData);
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
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      if (!recaptchaToken) {
        if (recaptchaLoadFailed) {
          toast({
            title: "Security Verification Unavailable",
            description: "Please refresh the page and try again. If the problem persists, contact us directly.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Security Check Loading",
            description: "Please wait a moment and try again.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }

      await apiRequest("POST", "/api/general-contact", {
        ...formData,
        recaptchaToken,
      });

      setIsSuccess(true);
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-neutral-800 rounded-xl p-8 border border-neutral-700 text-center"
      >
        <div className="bg-green-500/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Message Received</h3>
        <p className="text-neutral-300 mb-6">
          Thank you for reaching out. Our team will review your message and respond within 1-2 business days.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              businessName: "",
              firstName: "",
              lastName: "",
              email: "",
              message: "",
            });
          }}
          className="bg-primary hover:bg-primary/90 text-white"
          data-testid="contact-send-another"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
        <p className="text-neutral-400">Have a question or want to discuss your project? Send us a message.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {recaptchaLoadFailed && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200">
              <p className="font-medium">Security verification unavailable</p>
              <p className="text-amber-300/80 mt-1">Please refresh the page to enable form submission.</p>
            </div>
          </div>
        )}
        
        <div>
          <Label htmlFor="businessName" className="text-neutral-200 mb-2 block">Business Name (Optional)</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            className="bg-neutral-900 border-neutral-600 text-white"
            placeholder="Your company name"
            data-testid="contact-business-name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-neutral-200 mb-2 block">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className={`bg-neutral-900 border-neutral-600 text-white ${errors.firstName ? "border-red-500" : ""}`}
              placeholder="First name"
              data-testid="contact-first-name"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-neutral-200 mb-2 block">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className={`bg-neutral-900 border-neutral-600 text-white ${errors.lastName ? "border-red-500" : ""}`}
              placeholder="Last name"
              data-testid="contact-last-name"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-neutral-200 mb-2 block">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`bg-neutral-900 border-neutral-600 text-white ${errors.email ? "border-red-500" : ""}`}
            placeholder="you@company.com"
            data-testid="contact-email"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="message" className="text-neutral-200 mb-2 block">Message *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className={`bg-neutral-900 border-neutral-600 text-white min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
            placeholder="Tell us about your project or question..."
            data-testid="contact-message"
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
          data-testid="contact-submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </>
          )}
        </Button>

        <p className="text-center text-neutral-500 text-sm">
          Your data is secured with 256-bit SSL encryption and is used solely for direct communication. Cedar Creek never shares client information with third parties.
        </p>
      </form>
    </div>
  );
}
