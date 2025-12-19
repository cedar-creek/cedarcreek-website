import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function SolutionsSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const plans = [
    {
      name: "Rapid Start Accelerator",
      price: "From $15,000",
      description: "AI Readiness Assessments and identifying legacy modules for quick-win automation and integration opportunities.",
      features: [
        "AI Readiness Assessment",
        "Legacy Module Analysis",
        "Quick-Win Identification",
        "Integration Roadmap",
        "4 Weeks of Support",
        "Implementation Planning"
      ],
      popular: false,
      buttonVariant: "primary",
    },
    {
      name: "Growth Accelerator",
      price: "From $35,000",
      description: "Technical modernization with Go microservices, Svelte interfaces, and ClickUp/Google Workspace orchestration.",
      features: [
        "Full Technical Assessment",
        "Go (Golang) Microservices",
        "Svelte Frontend Development",
        "Security & Performance Audit",
        "BlazeMeter Load Testing",
        "ClickUp & Google Workspace Integration",
        "12 Weeks of Support"
      ],
      popular: true,
      buttonVariant: "primary",
    },
    {
      name: "Enterprise Accelerator",
      price: "Custom Pricing",
      description: "Full-scale digital transformation with Ionic mobile apps, custom API tools, and 12-month strategic support.",
      features: [
        "Enterprise System Strategy",
        "Full System Modernization",
        "Ionic Mobile Applications",
        "Security & Performance Audit",
        "BlazeMeter Load Testing",
        "Custom API-Driven Tools",
        "12-Month Strategic Support",
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
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Select the modernization package that aligns with your business transformation goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-neutral-800 border-2 rounded-lg overflow-hidden hover:shadow-xl transition-all ${plan.popular ? "shadow-lg relative transform md:scale-105 md:-translate-y-2 z-10 border-primary" : "shadow-md border-neutral-500"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`plan-card-${index}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 uppercase rounded-bl">
                  Popular
                </div>
              )}
              <div className={`p-6 border-b-2 ${plan.popular ? "bg-primary/20 border-primary" : "border-neutral-500"}`}>
                <h3 className={`text-xl font-bold ${plan.popular ? "text-primary" : "text-white"}`}>
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-white mt-2">{plan.price}</p>
                <p className="mt-3 text-sm text-neutral-400">{plan.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-neutral-300">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button 
                    onClick={() => scrollToSection("contact")} 
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-neutral-700 hover:bg-neutral-600"} text-white`}
                    data-testid={`plan-cta-${index}`}
                  >
                    Get Your Custom Plan
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
