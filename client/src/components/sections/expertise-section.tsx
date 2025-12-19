import { motion } from "framer-motion";
import { Database, Server, Layout, Smartphone } from "lucide-react";

export function ExpertiseSection() {
  const pillars = [
    {
      icon: Database,
      title: "Legacy Modernization",
      description: "ColdFusion enhancement, monolithic-to-microservice migration, and SQL Server performance tuning.",
      color: "primary",
      features: [
        "ColdFusion code optimization",
        "SQL Server query tuning",
        "Monolithic to microservice migration",
        "Legacy system integration"
      ]
    },
    {
      icon: Server,
      title: "Backend Systems",
      description: "High-concurrency microservices and APIs developed in Go (Golang) for maximum performance.",
      color: "secondary",
      features: [
        "Go (Golang) development",
        "RESTful API design",
        "High-concurrency architecture",
        "Cloud-native deployment"
      ]
    },
    {
      icon: Layout,
      title: "Modern Frontends",
      description: "High-performance, reactive user interfaces built with Svelte for exceptional user experiences.",
      color: "accent",
      features: [
        "Svelte applications",
        "Reactive UI components",
        "Performance optimization",
        "Responsive design"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Platforms",
      description: "Cross-platform mobile application development using the Ionic Framework for iOS and Android.",
      color: "primary",
      features: [
        "Ionic Framework apps",
        "Cross-platform development",
        "Native device integration",
        "App store deployment"
      ]
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary": return "#ff6b00";
      case "secondary": return "#d63b24";
      case "accent": return "#f9a826";
      default: return "#ff6b00";
    }
  };

  return (
    <section id="expertise" className="py-16 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            Our four pillars of technical excellence deliver modern, scalable solutions 
            that transform your legacy systems into competitive advantages.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 hover:border-primary transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${getColorClass(pillar.color)}20` }}
              >
                <pillar.icon 
                  className="h-7 w-7" 
                  style={{ color: getColorClass(pillar.color) }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{pillar.title}</h3>
              <p className="text-neutral-400 mb-4 text-sm">{pillar.description}</p>
              <ul className="space-y-2">
                {pillar.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-neutral-300">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mr-2"
                      style={{ backgroundColor: getColorClass(pillar.color) }}
                    ></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
