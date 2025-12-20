import { motion } from "framer-motion";
import { Server, CreditCard, Users, Layers, Zap, Database } from "lucide-react";

interface PlatformFeature {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  description: string;
}

interface Platform {
  name: string;
  url: string;
  tagline: string;
  features: PlatformFeature[];
}

export function SharedDNASection() {
  const platforms: Platform[] = [
    {
      name: "Bunity.com",
      url: "https://bunity.com",
      tagline: "Showcasing over 30 Million Businesses in Over 190 Countries",
      features: [
        {
          icon: Server,
          label: "Go (Golang) Backend",
          description: "High-concurrency architecture handling millions of requests"
        },
        {
          icon: CreditCard,
          label: "Stripe Global Payments",
          description: "Secure payment processing across 135+ currencies"
        },
        {
          icon: Database,
          label: "CedarCreek Engine (CRM)",
          description: "Proven technical efficiency powering global-scale data discovery"
        }
      ]
    },
    {
      name: "MyTickUp.com",
      url: "https://mytickup.com",
      tagline: "Personal Productivity Platform",
      features: [
        {
          icon: Server,
          label: "Go (Golang) Backend",
          description: "Lightning-fast API responses and data processing"
        },
        {
          icon: Layers,
          label: "Svelte Reactive Frontend",
          description: "Buttery-smooth user experience with minimal bundle size"
        },
        {
          icon: Users,
          label: "CedarCreek Engine (CRM)",
          description: "Interoperable ColdFusion Engine: Driving automated campaign logic and high-volume user follow-up"
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Shared DNA
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            The CedarCreek <span className="gradient-text">Engineering Standard</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto" style={{ textWrap: 'balance' }}>
            Two platforms, one proven foundation. See how our products share the same architectural DNA.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 hover:border-primary/50 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`platform-card-${index}`}
            >
              <div className="mb-6">
                <a 
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-white hover:text-primary transition-colors"
                >
                  {platform.name}
                </a>
                <p className="text-neutral-400 text-sm mt-1">{platform.tagline}</p>
              </div>

              <div className="space-y-4">
                {platform.features.map((feature, featureIndex) => (
                  <div 
                    key={feature.label}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{feature.label}</p>
                      <p className="text-neutral-400 text-xs mt-0.5">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-primary/10 via-neutral-800 to-secondary/10 border border-neutral-700 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          data-testid="shared-dna-callout"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold text-white">The CedarCreek Engine</h3>
          </div>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Our proven operational brain powers both platforms, serving{" "}
            <span className="text-primary font-semibold">millions of users</span> and{" "}
            <span className="text-primary font-semibold">5,000+ clients</span>.
            This is the same proven architecture we bring to every client engagement.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
