import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function ApproachSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const phases = [
    {
      number: 1,
      title: "Rapid Assessment",
      timeframe: "Weeks 1-2",
      color: "primary",
      steps: [
        "Legacy system evaluation",
        "ColdFusion & SQL analysis",
        "Identify automation opportunities",
        "Develop modernization roadmap",
      ],
    },
    {
      number: 2,
      title: "Quick-Win Implementation",
      timeframe: "Weeks 3-4",
      color: "secondary",
      steps: [
        "Deploy initial automation",
        "Performance-focused implementations",
        "Staff training and adoption",
        "Measure efficiency gains",
      ],
    },
    {
      number: 3,
      title: "Scale & Optimize",
      timeframe: "Months 2-3",
      color: "accent",
      steps: [
        "Go microservices migration",
        "Svelte frontend development",
        "System integration & optimization",
        "Long-term strategy development",
      ],
    },
  ];

  return (
    <section id="approach" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="gradient-text">System Automation</span> Methodology
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            A proven three-phase approach that transforms your legacy systems into modern, 
            AI-ready platforms in just 90 days.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-sm relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: 'none',
                background: 'none'
              }}
              data-testid={`phase-card-${index}`}
            >
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                height: "100%", 
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div 
                  style={{ 
                    height: "8px", 
                    width: "100%", 
                    backgroundColor: phase.color === "primary" ? "#ff6b00" : 
                                    phase.color === "secondary" ? "#d63b24" : 
                                    "#f9a826"
                  }}
                ></div>
                
                <div style={{ 
                  flex: "1", 
                  backgroundColor: "#fff",
                  borderLeft: "1px solid #e5e7eb", 
                  borderRight: "1px solid #e5e7eb", 
                  borderBottom: "1px solid #e5e7eb",
                  borderTop: "none",
                  borderRadius: "0 0 8px 8px"
                }}>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: phase.color === "primary" ? "#ff6b00" : 
                                        phase.color === "secondary" ? "#d63b24" : 
                                        "#f9a826",
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        zIndex: 10
                      }}>
                        {phase.number}
                      </div>
                      <h3 className="ml-3 text-xl font-semibold">{phase.title}</h3>
                    </div>
                    <p className="text-neutral-600 mb-4">{phase.timeframe}</p>
                    <ul className="space-y-2 text-neutral-700">
                      {phase.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <CheckCircle2 style={{
                            height: '20px',
                            width: '20px',
                            color: phase.color === "primary" ? "#ff6b00" : 
                                   phase.color === "secondary" ? "#d63b24" : 
                                   "#f9a826",
                            marginTop: '2px',
                            marginRight: '8px',
                            flexShrink: 0
                          }} />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 bg-neutral-900 rounded-lg p-6 border border-neutral-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white mb-2">We Don't Just Connect Systems — We <span className="text-primary">Harden</span> Them</h3>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Every modernization includes enterprise-grade reliability validation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-neutral-300 bg-neutral-800 rounded-lg py-3 px-4">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm">Security Scans & Vulnerability Testing</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-neutral-300 bg-neutral-800 rounded-lg py-3 px-4">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span className="text-sm">Regression Testing & QA</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-neutral-300 bg-neutral-800 rounded-lg py-3 px-4">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span className="text-sm">SQL Optimization & Performance</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <Button 
            onClick={() => scrollToSection("contact")} 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
            data-testid="approach-cta"
          >
            Get Your Custom AI Acceleration Plan
          </Button>
        </div>
      </div>
    </section>
  );
}
