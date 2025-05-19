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
    <section id="approach" className="py-16 bg-white">
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
              className={`${index < 2 ? "phase-connector" : ""} bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {phase.color === "primary-light" && <div className="bg-primary h-2 w-full"></div>}
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
        
        <div className="mt-10 text-center">
          <Button 
            onClick={() => scrollToSection("assessment")} 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Start Your AI Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
}
