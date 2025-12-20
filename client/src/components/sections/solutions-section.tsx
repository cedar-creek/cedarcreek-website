import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Brain, Database, FileSearch, BarChart3 } from "lucide-react";
import { Link } from "wouter";

export function SolutionsSection() {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const plans = [
    {
      name: "Strategic Discovery",
      priceUSD: "Consultative Engagement",
      bestFor: "Best for auditing legacy technical debt and defining a 5-day modernization roadmap.",
      description: "AI Readiness Assessments and identifying legacy modules for quick-win automation and integration opportunities.",
      features: [
        "AI Readiness Assessment",
        "Legacy Module Analysis",
        "Quick-Win Identification",
        "Integration Roadmap",
        "Dedicated Support",
        "Implementation Planning"
      ],
      popular: false,
      buttonVariant: "primary",
    },
    {
      name: "Strategic Partnership",
      priceUSD: "Consultative Engagement",
      bestFor: "Best for high-scale modernization of core systems using Go and Svelte.",
      description: "Technical modernization with Go microservices, Svelte interfaces, and ClickUp/Google Workspace orchestration.",
      features: [
        "Full Technical Assessment",
        "Go (Golang) Microservices",
        "Svelte Frontend Development",
        "Security & Performance Audit",
        "BlazeMeter Load Testing",
        "ClickUp & Google Workspace Integration",
        "Extended Support"
      ],
      popular: true,
      buttonVariant: "primary",
    },
    {
      name: "Enterprise Partnership",
      priceUSD: "Consultative Engagement",
      bestFor: "Best for multi-system digital transformation and long-term architectural support.",
      description: "Full-scale digital transformation with Ionic mobile apps, custom API tools, and long-term strategic support.",
      features: [
        "Enterprise System Strategy",
        "Full System Modernization",
        "Ionic Mobile Applications",
        "Security & Performance Audit",
        "BlazeMeter Load Testing",
        "Custom API-Driven Tools",
        "Long-Term Strategic Support",
        "Dedicated Team Access"
      ],
      popular: false,
      buttonVariant: "dark",
    },
  ];

  return (
    <section id="solutions" className="py-16 bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto" style={{ textWrap: 'balance' }}>
            Select the consultative engagement that aligns with your business transformation&nbsp;goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-neutral-800 rounded-lg overflow-hidden hover:shadow-xl transition-all ${plan.popular ? "shadow-lg relative transform md:scale-105 md:-translate-y-2 z-10 border-2 border-primary" : "shadow-md border border-neutral-700"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`plan-card-${index}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-medium px-3 py-1 uppercase rounded-bl tracking-wider">
                  Strategic Standard
                </div>
              )}
              <div className={`p-6 pt-8 ${plan.popular ? "bg-primary/20 border-b border-primary" : "border-b border-neutral-700"}`}>
                <h3 className={`text-xl font-bold ${plan.popular ? "text-primary" : "text-white"}`}>
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-white mt-2">
                  {plan.priceUSD}
                </p>
                <p className="mt-3 text-sm text-neutral-400">{plan.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-neutral-300">
                      <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <Button 
                    onClick={() => scrollToSection("contact")} 
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-neutral-700 hover:bg-neutral-600"} text-white`}
                    data-testid={`plan-cta-${index}`}
                  >
                    Get Your Custom Plan
                  </Button>
                  {index === 0 && (
                    <Link href="/assessment" className="block">
                      <Button 
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10"
                        data-testid="plan-start-assessment"
                      >
                        Start Assessment
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary/10 via-neutral-900 to-secondary/10 border border-neutral-700 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          data-testid="rag-callout"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Unified Intelligence & <span className="text-primary">RAG Architecture</span>
            </h3>
          </div>
          
          <p className="text-neutral-300 mb-6 max-w-3xl">
            Bridging the data silos of multi-subsidiary organizations. We design and implement secure, 
            group-wide RAG layers that unify Financial, Operational, and HR data into a single, 
            automated management reporting architecture.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <FileSearch className="h-5 w-5 text-primary mb-2" />
              <h4 className="font-semibold text-white text-sm mb-1">Cross-Subsidiary Data Discovery</h4>
              <p className="text-xs text-neutral-400">Technical mapping of distributed data sources—from ERPs to cloud HR and CRM systems.</p>
            </div>
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <Brain className="h-5 w-5 text-secondary mb-2" />
              <h4 className="font-semibold text-white text-sm mb-1">Secure RAG Implementation</h4>
              <p className="text-xs text-neutral-400">Custom LLM orchestration via The CedarCreek Engine—private, high-accuracy intelligence.</p>
            </div>
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <BarChart3 className="h-5 w-5 text-accent mb-2" />
              <h4 className="font-semibold text-white text-sm mb-1">Automated Management Insights</h4>
              <p className="text-xs text-neutral-400">Eliminating manual Excel exports with real-time visibility across your portfolio.</p>
            </div>
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <Database className="h-5 w-5 text-primary mb-2" />
              <h4 className="font-semibold text-white text-sm mb-1">The CedarCreek Advantage</h4>
              <p className="text-xs text-neutral-400">Modernizing legacy ColdFusion and SQL environments—no critical business data left behind.</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-white"
              data-testid="rag-cta"
            >
              Discuss Your RAG Architecture
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
