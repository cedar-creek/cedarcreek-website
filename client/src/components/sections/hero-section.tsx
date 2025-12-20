import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ lineHeight: '1.2' }}>
            <div>Legacy System Modernization</div>
            <div className="mt-2">
              <span 
                className="text-white"
                style={{ 
                  fontStyle: 'italic',
                  opacity: 0.85
                }}
              >
                &amp;{' '}
              </span>
              <span 
                style={{ 
                  background: 'linear-gradient(180deg, #FFB347 0%, #FF6600 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 10px rgba(255, 102, 0, 0.6), 0 0 30px rgba(255, 102, 0, 0.2)',
                  fontSize: '102%',
                  fontWeight: 800,
                  letterSpacing: '0.02em'
                }}
              >
                AI Integration
              </span>
            </div>
          </h1>
          <p className="text-xl mb-10 text-neutral-400 max-w-2xl mx-auto">
            Modernizing legacy systems with the same battle-tested engines that power SaaS platforms for 100,000+ businesses in 50+ industries across 150+ countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-white"
              data-testid="hero-cta-primary"
            >
              Get Your Custom AI Acceleration Plan
            </Button>
            <Button 
              size="lg" 
              onClick={() => scrollToSection("expertise")} 
              variant="outline" 
              className="border-2 border-neutral-500 text-white bg-neutral-800/50 hover:bg-neutral-800"
              data-testid="hero-cta-secondary"
            >
              See Our Technical Expertise
            </Button>
          </div>
          <p className="text-sm text-neutral-500 mt-4">
            Custom acceleration plans delivered within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
