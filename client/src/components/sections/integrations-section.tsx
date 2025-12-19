import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  CreditCard, 
  Shield,
  CheckCircle2,
  BookOpen,
  Building2,
  Wallet,
  Cloud
} from "lucide-react";
import { SiMoodle, SiHubspot, SiGoogle, SiStripe } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";

interface IntegrationPartner {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  customIcon?: React.ReactNode;
}

interface IntegrationBucket {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  partners: IntegrationPartner[];
}

export function IntegrationsSection() {
  const buckets: IntegrationBucket[] = [
    {
      title: "EdTech & LMS",
      icon: GraduationCap,
      color: "#ff6b00",
      partners: [
        { name: "Moodle", customIcon: <SiMoodle className="h-5 w-5" /> },
        { name: "Edgenuity", icon: BookOpen },
        { name: "ClassLink", icon: Users },
        { name: "Canvas", icon: BookOpen },
      ]
    },
    {
      title: "CRM & Business Ops",
      icon: Building2,
      color: "#d63b24",
      partners: [
        { name: "HubSpot", customIcon: <SiHubspot className="h-5 w-5" /> },
        { name: "Salesforce", icon: Cloud },
        { name: "ClickUp", icon: Users },
        { name: "Notion", icon: BookOpen },
      ]
    },
    {
      title: "Payments & Finance",
      icon: CreditCard,
      color: "#f9a826",
      partners: [
        { name: "Stripe", customIcon: <SiStripe className="h-5 w-5" /> },
        { name: "ClassWallet", icon: Wallet },
        { name: "Ariba", icon: Building2 },
        { name: "PayPal", icon: CreditCard },
      ]
    },
    {
      title: "Infrastructure & Auth",
      icon: Shield,
      color: "#22c55e",
      partners: [
        { name: "Microsoft/Azure", customIcon: <FaMicrosoft className="h-5 w-5" /> },
        { name: "Google", customIcon: <SiGoogle className="h-5 w-5" /> },
        { name: "AWS", icon: Cloud },
        { name: "Auth0", icon: Shield },
      ]
    },
  ];

  const technicalCallouts = [
    { label: "LTI Compliance", description: "Full LTI 1.1 & 1.3 certification" },
    { label: "SSO (SAML/OAuth)", description: "Enterprise single sign-on" },
    { label: "Grade/Rostering Sync", description: "OneRoster & SIS integration" },
    { label: "Order & Funding Automation", description: "ClassWallet & Ariba workflows" },
  ];

  return (
    <section id="integrations" className="py-16" style={{ background: "linear-gradient(to bottom, #1a1a1a, #141414, #0f0f0f)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Interoperability <span className="gradient-text">Without Compromise</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            Battle-tested connectivity across 50+ vendors, ensuring your legacy modernization is seamless and secure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {buckets.map((bucket, index) => (
            <motion.div
              key={bucket.title}
              className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-5 hover:border-primary/50 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`integration-bucket-${index}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${bucket.color}20` }}
                >
                  <bucket.icon style={{ color: bucket.color }} className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white">{bucket.title}</h3>
              </div>
              
              <div className="space-y-2">
                {bucket.partners.map((partner) => (
                  <div 
                    key={partner.name}
                    className="flex items-center gap-2 text-neutral-300 bg-neutral-900/50 rounded px-3 py-2"
                  >
                    <span style={{ color: bucket.color }}>
                      {partner.customIcon || (partner.icon && <partner.icon className="h-4 w-4" />)}
                    </span>
                    <span className="text-sm">{partner.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-neutral-800 border border-neutral-700 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Technical Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {technicalCallouts.map((callout, index) => (
              <div 
                key={callout.label}
                className="flex items-start gap-3 bg-neutral-900/50 rounded-lg p-4"
              >
                <CheckCircle2 
                  className="h-5 w-5 mt-0.5 flex-shrink-0" 
                  style={{ color: buckets[index % buckets.length].color }}
                />
                <div>
                  <p className="font-medium text-white text-sm">{callout.label}</p>
                  <p className="text-neutral-400 text-xs mt-1">{callout.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-center text-neutral-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          + many more across healthcare, government, and enterprise sectors
        </motion.p>
      </div>
    </section>
  );
}
