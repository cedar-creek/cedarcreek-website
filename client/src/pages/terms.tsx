import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, Award, Briefcase, Shield, Globe, Scale } from "lucide-react";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Engagement | Cedar Creek Ltd.</title>
        <meta name="description" content="Terms of Engagement for Cedar Creek Ltd. - Professional standards for legacy system modernization and AI integration services." />
      </Helmet>
      
      <div className="min-h-screen bg-neutral-900 text-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-white">Terms of Engagement</h1>
            </div>
            
            <p className="text-neutral-300 mb-8 text-lg" style={{ textWrap: 'balance' }}>
              Terms of Engagement for Cedar Creek Ltd.
            </p>
            
            <div className="space-y-8">
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  1. Heritage and Professional Standard
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  Cedar Creek Ltd. (est. 1998) provides legacy system modernization and AI integration services based on over 25 years of engineering experience. All strategic recommendations are delivered with "Proven Reliability" and "Technical Integrity".
                </p>
              </section>
              
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  2. Consultative Services & Delivery
                </h2>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    The Modernization & AI Readiness Audit is a consultative discovery product.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Our 90-day roadmaps are delivered within 5 business days of a successful Technical Intake completion.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Recommendations provided in these audits are strategic in nature and serve as an engineering blueprint.
                  </li>
                </ul>
              </section>
              
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  3. Intellectual Property
                </h2>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    All "Proven Engines" and architectural frameworks used in the delivery of our services remain the intellectual property of Cedar Creek Ltd.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Users are granted a license to use the delivered roadmaps for their internal business transformation goals.
                  </li>
                </ul>
              </section>
              
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  4. Third-Party Integrations
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  Occasionally, we include third-party services (e.g., HubSpot, Stripe, ClickUp) in our modernization blueprints. These third-party sites have separate and independent privacy policies, and Cedar Creek Ltd. has no responsibility or liability for their content.
                </p>
              </section>
              
              <section className="bg-gradient-to-r from-primary/10 via-neutral-800 to-secondary/10 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  5. Governing Law
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  These terms are governed by and construed in accordance with the laws of the United Kingdom.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
