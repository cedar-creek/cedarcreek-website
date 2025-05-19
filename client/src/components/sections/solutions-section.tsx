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
      price: "$15,000",
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
      price: "$35,000",
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
      price: "Custom",
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

  const comparisonFeatures = [
    { name: "AI Readiness Assessment", rapidStart: "Basic", growth: "Advanced", enterprise: "Enterprise" },
    { name: "AI Implementations", rapidStart: "1", growth: "3", enterprise: "Unlimited" },
    { name: "Implementation Timeline", rapidStart: "4 Weeks", growth: "12 Weeks", enterprise: "Custom" },
    { name: "Staff Training", rapidStart: "Basic", growth: "Comprehensive", enterprise: "Executive & Team" },
    { name: "Integration Services", rapidStart: false, growth: "Basic", enterprise: "Advanced" },
    { name: "Advanced Analytics", rapidStart: false, growth: false, enterprise: true },
  ];

  return (
    <section id="solutions" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Select the AI accelerator package that aligns with your business goals and implementation timeline.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white border${plan.popular ? "-2 border-primary" : " border-neutral-200"} rounded-lg ${plan.popular ? "shadow-lg relative transform scale-105 z-10" : "shadow-md"} overflow-hidden hover:shadow-lg transition-shadow`}
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
              <div className={plan.name === "Enterprise Accelerator" ? "bg-neutral-900 p-6 text-white" : plan.popular ? "bg-primary bg-opacity-5 p-6" : "bg-neutral-100 p-6"}>
                <h3 className={`text-xl font-bold ${plan.popular ? "text-primary" : ""}`}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-neutral-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="ml-1 text-neutral-500">one-time</span>}
                </div>
                <p className="mt-2 text-sm text-neutral-500">{plan.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-start ${!feature.included ? "text-neutral-400" : ""}`}>
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button 
                    onClick={() => scrollToSection("contact")} 
                    className={`w-full ${plan.buttonVariant === "dark" ? "bg-neutral-800 hover:bg-neutral-900" : "bg-primary hover:bg-primary-dark"} text-white`}
                  >
                    {plan.name === "Enterprise Accelerator" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-neutral-50 rounded-lg p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">Feature</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-neutral-700">Rapid Start<br/>($15,000)</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-primary">Growth<br/>($35,000)</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-neutral-900">Enterprise<br/>(Custom)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-neutral-700">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.rapidStart === "boolean" ? (
                        feature.rapidStart ? (
                          <Check className="h-5 w-5 text-neutral-900 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        feature.rapidStart
                      )}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-primary">
                      {typeof feature.growth === "boolean" ? (
                        feature.growth ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        feature.growth
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="h-5 w-5 text-neutral-900 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        feature.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
