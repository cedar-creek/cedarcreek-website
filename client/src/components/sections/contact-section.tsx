import { CalendarCheck, TrendingUp, CalendarIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

export function ContactSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!document.querySelector('script[src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"]')) {
      const script = document.createElement("script");
      script.src = "https://app-cdn.clickup.com/assets/js/forms-embed/v1.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
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
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">Get Your Custom AI Acceleration Plan</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Schedule your free consultation to discuss your legacy system modernization needs. 
              Receive a custom acceleration plan identifying high-impact automation opportunities within 24 hours.
            </p>

            <div className="space-y-6 mb-8 max-w-md mx-auto text-left">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <CalendarCheck className="h-5 w-5 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-neutral-900">30-Minute Expert Consultation</p>
                  <p className="text-neutral-600 mb-2">Discuss your legacy modernization strategy</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">24-Hour Plan Delivery</p>
                  <p className="text-neutral-600">Receive your custom acceleration plan quickly</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">High-Impact Opportunities</p>
                  <p className="text-neutral-600">Identify quick-win automation targets</p>
                </div>
              </div>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 mt-4 mx-auto"
                  data-testid="contact-book-consultation"
                >
                  <CalendarIcon className="h-5 w-5" />
                  Get Your Custom AI Acceleration Plan
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full md:max-w-[700px] overflow-y-auto" side="right">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-2xl">Schedule Your Consultation</SheetTitle>
                  <SheetDescription>
                    Fill out the form below to receive your custom AI acceleration plan within 24 hours.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 w-full min-h-[600px]">
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
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
