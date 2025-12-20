import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, MapPin } from "lucide-react";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Cedar Creek Ltd.</title>
        <meta name="description" content="Privacy Policy for Cedar Creek Ltd. - Learn how we collect, use, and protect your personal information." />
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
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            </div>
            
            <p className="text-neutral-300 mb-8 text-lg" style={{ textWrap: 'balance' }}>
              Privacy Policy for Cedar Creek Ltd.
            </p>
            
            <div className="space-y-8">
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <p className="text-neutral-300 leading-relaxed">
                  The security of your Personal Information is important to us. This Privacy Policy governs the manner in which Cedar Creek Ltd. collects, uses, maintains, and discloses information collected from users ("User") of the website ("Site"). This privacy policy applies to the Site and all products and services offered by Cedar Creek Ltd., an engineering boutique with a legacy established in 1998.
                </p>
              </section>
              
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Personally Identifiable Information (PII)
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  This policy has been compiled to better serve those concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context.
                </p>
              </section>
              
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">What information do we collect?</h2>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  We collect information from you when you register on our site, fill out the Technical Intake form, or request a Modernization & AI Readiness Audit.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  As appropriate, you may be asked to enter your name, email address, phone number, Business Information, or technical system details to help with your audit experience.
                </p>
              </section>
              
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Legal bases for processing (for EEA/UK users)</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-semibold">Service Necessity:</span>
                    <span className="text-neutral-300">To provide the Modernization Audits and roadmaps.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-semibold">Legitimate Interest:</span>
                    <span className="text-neutral-300">For research, development, and to protect our legal rights.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-semibold">Consent:</span>
                    <span className="text-neutral-300">Where you have given specific consent for a purpose.</span>
                  </li>
                </ul>
              </section>
              
              <section className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  How do we protect your information?
                </h2>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Our website is scanned on a regular basis for security holes and known vulnerabilities.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Your personal information is contained behind secured networks and is only accessible by a limited number of persons with special access rights.
                  </li>
                </ul>
              </section>
              
              <section className="bg-gradient-to-r from-primary/10 via-neutral-800 to-secondary/10 border border-neutral-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Contacting Us</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Cedar Creek Ltd.</p>
                      <p className="text-neutral-300">869 High Road, London, N12 8QA, United Kingdom</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:support@cedarcreek.ai" className="text-primary hover:underline">
                      support@cedarcreek.ai
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
