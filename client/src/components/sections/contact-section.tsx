import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().min(1, "Company name is required"),
  interest: z.string().min(1, "Please select an option"),
  message: z.string().optional(),
});

// Newsletter schema
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function ContactSection() {
  const { toast } = useToast();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form
      const validatedData = contactSchema.parse(contactForm);
      
      // Submit to API
      await apiRequest('POST', '/api/contact', validatedData);
      
      // Show success state
      setContactSubmitted(true);
      
      toast({
        title: "Contact Request Submitted",
        description: "Thank you for your interest! We'll be in touch shortly.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.map(err => err.message);
        toast({
          title: "Validation Error",
          description: fieldErrors.join(", "),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Error",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate email
      const { email } = newsletterSchema.parse({ email: newsletterEmail });
      
      // Submit to API
      await apiRequest('POST', '/api/newsletter', { email });
      
      // Reset form
      setNewsletterEmail("");
      
      toast({
        title: "Newsletter Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription Error",
          description: "There was an error processing your subscription. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="py-16 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business with AI?</h2>
            <p className="text-lg text-neutral-300 mb-8">
              Schedule a free consultation with our AI implementation experts to discuss your business 
              needs and how our AI Accelerator Blueprint™ can help you achieve measurable results.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">30-Minute Free Consultation</p>
                  <p className="text-neutral-400">Get personalized insights from our AI experts</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Custom Implementation Plan</p>
                  <p className="text-neutral-400">Receive a tailored proposal for your business</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">No Obligation</p>
                  <p className="text-neutral-400">Learn about our approach with no strings attached</p>
                </div>
              </div>
            </div>
            
            <img 
              src="https://cdn.pixabay.com/photo/2023/05/22/13/45/artificial-intelligence-8010912_1280.jpg" 
              alt="Abstract AI visualization" 
              className="rounded-lg shadow-lg hidden md:block" 
            />
          </motion.div>
          
          <motion.div 
            className="bg-neutral-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {!contactSubmitted ? (
              <>
                <h3 className="text-xl font-bold mb-6">Schedule Your Free Consultation</h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Full Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-neutral-600 bg-neutral-700 text-white rounded-md focus:ring-primary focus:border-primary" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-neutral-600 bg-neutral-700 text-white rounded-md focus:ring-primary focus:border-primary" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">Phone Number</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-neutral-600 bg-neutral-700 text-white rounded-md focus:ring-primary focus:border-primary" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="block text-sm font-medium text-neutral-300 mb-1">Company Name</Label>
                    <Input 
                      type="text" 
                      id="company" 
                      name="company"
                      value={contactForm.company}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-neutral-600 bg-neutral-700 text-white rounded-md focus:ring-primary focus:border-primary" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="interest" className="block text-sm font-medium text-neutral-300 mb-1">I'm interested in:</Label>
                    <Select 
                      value={contactForm.interest} 
                      onValueChange={(value) => setContactForm(prev => ({ ...prev, interest: value }))}
                    >
                      <SelectTrigger id="interest" className="w-full px-4 py-2 border border-neutral-600 bg-neutral-700 text-white rounded-md focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rapid-start">Rapid Start Accelerator ($15,000)</SelectItem>
                        <SelectItem value="growth">Growth Accelerator ($35,000)</SelectItem>
                        <SelectItem value="enterprise">Enterprise Accelerator (Custom)</SelectItem>
                        <SelectItem value="consultation">Just a consultation for now</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Any specific questions or needs? (optional)</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      rows={3} 
                      className="w-full px-4 py-2 border border-neutral-600 bg-neutral-700 text-white rounded-md focus:ring-primary focus:border-primary" 
                    />
                  </div>
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-md transition-colors"
                    >
                      {isSubmitting ? "Processing..." : "Book My Free Consultation"}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Consultation Request Received!</h3>
                <p className="text-neutral-300 mb-6">
                  Thank you for your interest in CedarCreek.AI. One of our AI specialists will 
                  contact you within 1 business day to schedule your free consultation.
                </p>
                <p className="font-medium">In the meantime, why not check out:</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => scrollToSection("approach")}
                    className="block w-full px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
                  >
                    Our Approach to AI Implementation
                  </button>
                  <button
                    onClick={() => scrollToSection("assessment")}
                    className="block w-full px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
                  >
                    Take the AI Readiness Assessment
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Email Capture Bar */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold mb-2">Stay Updated on AI Trends & Insights</h3>
              <p className="text-white text-opacity-90">
                Join our newsletter for the latest AI implementation strategies and success stories.
              </p>
            </div>
            <div className="md:col-span-2">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleNewsletterSubmit}>
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 rounded-md flex-1 text-neutral-800" 
                  required 
                />
                <Button 
                  type="submit" 
                  className="bg-white text-primary hover:bg-neutral-100 px-6 py-3 rounded-md font-semibold transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
