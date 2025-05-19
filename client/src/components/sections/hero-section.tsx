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
    <section className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Accelerate Your Business Growth Through
            <span className="text-primary block mt-2">Strategic AI Adoption</span>
          </h1>
          <p className="text-xl mb-10 text-neutral-400 max-w-2xl mx-auto">
            Transform your business operations with AI technologies designed for real-world impact. 
            Our AI Accelerator Blueprint™ delivers measurable results in weeks, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("assessment")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Get Your AI Readiness Score
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
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">3x ROI</p>
                  <p className="text-sm text-neutral-400">Within 90 days</p>
                </div>
              </div>
              <div className="h-10 w-px bg-neutral-700"></div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">40%</p>
                  <p className="text-sm text-neutral-400">Productivity Increase</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
