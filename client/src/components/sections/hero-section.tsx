import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Accelerate Your Business Growth Through Strategic AI Adoption
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Transform your business operations with AI technologies designed for real-world impact. 
              Our AI Accelerator Blueprint™ delivers measurable results in weeks, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollToSection("assessment")}
                className="bg-white text-primary hover:bg-neutral-100"
              >
                Get Your AI Readiness Score
              </Button>
              <Button 
                size="lg" 
                onClick={() => scrollToSection("approach")} 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Learn Our Approach
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
              alt="Team collaborating on AI strategy" 
              className="rounded-lg shadow-xl" 
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-3">
                <div className="text-primary">
                  <Zap className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-bold text-neutral-800">3x ROI</p>
                  <p className="text-sm text-neutral-500">Within 90 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
