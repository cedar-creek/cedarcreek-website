import { motion } from "framer-motion";
import { Cpu, Layers, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LabSection() {
  const techBadges = [
    { label: "Powered by Go", icon: Cpu, color: "#00ADD8" },
    { label: "Svelte-Native", icon: Layers, color: "#FF3E00" },
    { label: "Google Cloud AI", icon: Cloud, color: "#4285F4" },
  ];

  return (
    <section id="products" className="py-20" style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #141414 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Innovation in Action
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The CedarCreek <span className="gradient-text">Lab</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Applying our 25 years of enterprise expertise to the future of personal productivity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
              Flagship Product
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              MyTickUp.com
            </h3>
            
            <p className="text-neutral-300 mb-6 leading-relaxed">
              MyTickUp is a CedarCreek subsidiary and serves as the architectural foundation 
              for our modernization methodology. Built from the ground up using the same 
              Go microservices, Svelte frontends, and cloud-native patterns we implement 
              for enterprise clients.
            </p>

            <p className="text-neutral-400 mb-8">
              Experience firsthand how we transform complex business logic into elegant, 
              scalable solutions — the same approach we bring to your legacy modernization journey.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {techBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg"
                >
                  <badge.icon className="h-4 w-4" style={{ color: badge.color }} />
                  <span className="text-sm text-neutral-300">{badge.label}</span>
                </div>
              ))}
            </div>

            <a 
              href="https://mytickup.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="lab-cta-explore"
              >
                Explore the Platform →
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl"></div>
              <div 
                className="relative bg-neutral-800 border-2 border-neutral-700 rounded-xl overflow-hidden shadow-2xl"
                data-testid="lab-product-showcase"
              >
                <div className="bg-neutral-900 px-4 py-3 flex items-center gap-2 border-b border-neutral-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-neutral-500 text-sm">mytickup.com</span>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-neutral-800 to-neutral-900 min-h-[300px] flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-primary">M</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">MyTickUp</h4>
                    <p className="text-neutral-400 text-sm max-w-xs">
                      Personal productivity platform built with enterprise-grade architecture
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded">Task Management</span>
                      <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded">AI Insights</span>
                      <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded">Integrations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-500 text-sm">
            CedarCreek Lab projects demonstrate our commitment to innovation and serve as 
            real-world proof of our modernization capabilities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
