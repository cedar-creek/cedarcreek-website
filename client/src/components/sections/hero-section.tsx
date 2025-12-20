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
          <p 
            className="text-xl mb-10 text-neutral-400 mx-auto"
            style={{ 
              textWrap: 'balance',
              maxWidth: '800px'
            }}
          >
            Modernizing legacy systems with proven engines powering SaaS for 5,000+ clients across 50+ industries and 190+&nbsp;countries.
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
            Custom acceleration plans delivered within 5 business days
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <p className="text-primary font-semibold text-sm mb-1">Performance Optimization</p>
              <p className="text-neutral-400 text-sm">Eliminate manual workflows and reduce reporting time across legacy infrastructure.</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-primary font-semibold text-sm mb-1">Resilient Modernization</p>
              <p className="text-neutral-400 text-sm">Safer rollouts through incremental, risk-mitigated engineering pathways.</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-primary font-semibold text-sm mb-1">AI-Ready Foundations</p>
              <p className="text-neutral-400 text-sm">Implement AI integration that respects your proprietary business logic and data reality.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
