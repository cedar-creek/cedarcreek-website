import { AboutSection } from "@/components/sections/about-section";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | CedarCreek.AI - AI Accelerator Blueprint™</title>
        <meta name="description" content="Learn about CedarCreek.AI's mission to democratize AI technology and make strategic AI implementation accessible to businesses of all sizes." />
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
              About <span className="gradient-text">CedarCreek.AI</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Transforming how businesses evolve, compete, and win in the age of AI
            </p>
          </motion.div>
        </div>
      </section>
      
      <AboutSection />
    </>
  );
}