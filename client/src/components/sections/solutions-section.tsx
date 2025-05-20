import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

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
      description: "Perfect for small businesses looking to quickly implement targeted AI solutions",
      features: [
        { name: "AI Readiness Assessment", included: true },
        { name: "1 Targeted AI Implementation", included: true },
        { name: "4 Weeks of Support", included: true },
        { name: "Basic Staff Training", included: true },
        { name: "Integration Services", included: false },
        { name: "Advanced Analytics", included: false },
      ],
      popular: false,
      buttonVariant: "primary",
    },
    {
      name: "Growth Accelerator",
      description: "Ideal for growing businesses seeking to expand AI capabilities across departments",
      features: [
        { name: "Advanced AI Readiness Assessment", included: true },
        { name: "3 AI Implementations", included: true },
        { name: "12 Weeks of Support", included: true },
        { name: "Comprehensive Staff Training", included: true },
        { name: "Basic Integration Services", included: true },
        { name: "Advanced Analytics", included: false },
      ],
      popular: true,
      buttonVariant: "primary",
    },
    {
      name: "Enterprise Accelerator",
      description: "Comprehensive AI transformation for enterprise-scale organizations",
      features: [
        { name: "Enterprise AI Strategy Development", included: true },
        { name: "Unlimited AI Implementations", included: true },
        { name: "Ongoing Support & Maintenance", included: true },
        { name: "Executive & Team Training", included: true },
        { name: "Advanced Integration Services", included: true },
        { name: "Enterprise Analytics Dashboard", included: true },
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
            Select the AI accelerator package that aligns with your business goals.
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
                <p className="mt-3 text-sm text-neutral-400">{plan.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-start ${!feature.included ? "text-neutral-500" : "text-neutral-300"}`}>
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-neutral-600 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button 
                    onClick={() => scrollToSection("contact")} 
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-neutral-700 hover:bg-neutral-600"} text-white`}
                  >
                    Get Started
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
