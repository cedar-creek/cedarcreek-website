import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Cedar Creek Solutions</title>
        <meta name="description" content="Learn about Cedar Creek Solutions' mission to modernize legacy systems and enable AI integration. Specializing in ColdFusion migration, Go microservices, and enterprise transformation." />
      </Helmet>
      
      {/* Header with the same style as the hero section */}
      <section className="text-white" 
        style={{ 
          background: "linear-gradient(to bottom, #0f0f0f, #141414, #181410)"
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              About <span className="gradient-text">Cedar Creek Solutions</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Modernizing the core systems that run businesses
            </p>
          </motion.div>
        </div>
      </section>
      
      <AboutSection />
      
      {/* Add contact section with booking form */}
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
