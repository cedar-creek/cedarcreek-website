import { useState, useEffect } from "react";
import { CalendarCheck, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { BookingWidget } from "../booking/booking-widget";
import { useFormProgress } from "@/hooks/use-form-progress";

export function ContactSection() {
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const { loadProgress } = useFormProgress<any>('ai-assessment-form');
  
  // Load assessment data when component mounts
  useEffect(() => {
    const savedData = loadProgress();
    if (savedData) {
      setAssessmentData(savedData);
    }
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Schedule your free consultation with our AI implementation experts. We'll discuss your business needs and provide a customized strategy to accelerate your AI adoption.
            </p>

            <div className="space-y-6 mb-8 max-w-md mx-auto text-left">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <CalendarCheck className="h-5 w-5 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-neutral-900">30-Minute Expert Consultation</p>
                  <p className="text-neutral-600 mb-2">Discuss your AI strategy and implementation roadmap</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Custom Implementation Plan</p>
                  <p className="text-neutral-600">Receive a tailored roadmap for AI adoption</p>
                </div>
              </div>
            </div>

            <BookingWidget 
              buttonText="Book Your Free Consultation" 
              fullWidth={true}
              assessmentData={assessmentData} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}