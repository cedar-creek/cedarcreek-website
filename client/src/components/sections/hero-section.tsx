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
    <section className="text-white" 
      style={{ 
        background: "linear-gradient(to bottom, #0f0f0f, #141414, #181410)"
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Accelerate Your Business Growth Through
            <span className="gradient-text block mt-2">Strategic AI Adoption</span>
          </h1>
          <p className="text-xl mb-10 text-neutral-400 max-w-2xl mx-auto">
            Transform your business operations with AI technologies designed for real-world impact. 
            Our AI Accelerator Blueprint™ delivers measurable results in weeks, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Start Your AI Journey
            </Button>
            <Button 
              size="lg" 
              onClick={() => scrollToSection("approach")} 
              variant="outline" 
              className="border-2 border-neutral-500 text-white bg-neutral-800/50 hover:bg-neutral-800"
            >
              Learn Our Approach
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
