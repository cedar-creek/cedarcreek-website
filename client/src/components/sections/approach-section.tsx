import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp } from "lucide-react";
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
      color: "primary-light",
      steps: [
        "Comprehensive AI readiness evaluation",
        "Target high-impact opportunity areas",
        "Establish baseline metrics",
        "Develop implementation roadmap",
      ],
    },
    {
      number: 2,
      title: "Quick-Win Implementation",
      timeframe: "Weeks 3-4",
      color: "secondary",
      steps: [
        "Deploy first AI solution",
        "Focus on ROI-driven implementations",
        "Staff training and adoption",
        "Measure initial results",
      ],
    },
    {
      number: 3,
      title: "Scale & Optimize",
      timeframe: "Months 2-3",
      color: "accent",
      steps: [
        "Expand AI implementation",
        "Integration with existing systems",
        "Performance optimization",
        "Long-term strategy development",
      ],
    },
  ];

  return (
    <section id="approach" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="gradient-text">AI Accelerator Blueprint™</span> Methodology
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            A proven three-phase approach that delivers measurable AI results in just 90 days, 
            tailored to your specific business needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className={`${index < 2 ? "phase-connector" : ""} bg-white rounded-lg shadow-md overflow-hidden relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {phase.color === "primary-light" && <div className="bg-primary-light h-2 w-full"></div>}
              {phase.color === "secondary" && <div className="bg-secondary h-2 w-full"></div>}
              {phase.color === "accent" && <div className="bg-accent h-2 w-full"></div>}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`${phase.color === "primary-light" ? "bg-primary" : phase.color === "secondary" ? "bg-secondary" : "bg-accent"} rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg z-10`}>
                    {phase.number}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold">{phase.title}</h3>
                </div>
                <p className="text-neutral-600 mb-4">{phase.timeframe}</p>
                <ul className="space-y-2 text-neutral-700">
                  {phase.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <CheckCircle2 className={`h-5 w-5 ${phase.color === "primary-light" ? "text-primary" : phase.color === "secondary" ? "text-secondary" : "text-accent"} mt-0.5 mr-2 flex-shrink-0`} />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6">Implementation Timeline & ROI Projection</h3>
            <div className="w-full bg-neutral-100 h-16 rounded-lg relative mb-8">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent w-3/4 rounded-lg flex items-center px-4">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-primary font-bold mr-2">$</div>
                <span className="text-white font-semibold">Positive ROI achieved</span>
              </div>
              <div className="absolute top-full mt-2 left-0 text-sm text-neutral-600">Day 1</div>
              <div className="absolute top-full mt-2 left-1/4 text-sm text-neutral-600">Week 4</div>
              <div className="absolute top-full mt-2 left-1/2 text-sm text-neutral-600">Week 8</div>
              <div className="absolute top-full mt-2 left-3/4 text-sm text-neutral-600 font-semibold">Break-even</div>
              <div className="absolute top-full mt-2 right-0 text-sm text-neutral-600">3 Months</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&h=1160" 
                  alt="Business growth chart with AI implementation" 
                  className="rounded-lg shadow-md" 
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Typical ROI Metrics:</h4>
                <ul className="space-y-4">
                  {[
                    { month: "Month 1", title: "Initial Savings", description: "20-30% productivity increase in target areas" },
                    { month: "Month 2", title: "Break-Even", description: "Implementation costs fully recovered" },
                    { month: "Month 3", title: "Positive ROI", description: "3x return on initial investment" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`${index === 0 ? "bg-primary/10" : index === 1 ? "bg-secondary/10" : "bg-accent/10"} rounded-full p-2 mr-4 mt-1`}>
                        <TrendingUp className={`h-5 w-5 ${index === 0 ? "text-primary" : index === 1 ? "text-secondary" : "text-accent"}`} />
                      </div>
                      <div>
                        <p className="font-semibold">{item.month}: {item.title}</p>
                        <p className="text-neutral-600">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => scrollToSection("assessment")} 
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white"
              >
                Start Your AI Journey Today
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
