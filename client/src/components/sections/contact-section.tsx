import { CalendarCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export function ContactSection() {
  // Load the ClickUp script after component mounts
  useEffect(() => {
    // Check if the script is already loaded
    if (!document.querySelector('script[src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"]')) {
      const script = document.createElement("script");
      script.src = "https://app-cdn.clickup.com/assets/js/forms-embed/v1.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        // Clean up if needed when component unmounts
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

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

            <div className="w-full min-h-[600px] mt-6">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}