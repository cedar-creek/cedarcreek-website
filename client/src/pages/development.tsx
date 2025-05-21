import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Code, Database, GitBranch, ServerIcon } from "lucide-react";
import { ContactSection } from "@/components/sections/contact-section";

export default function Development() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const technicalExpertise = [
    {
      title: "Legacy System Modernization",
      items: [
        "ColdFusion Enhancement: Performance tuning and feature extension",
        "SQL Server Optimization: Query performance and data accessibility improvements",
        "Custom Framework Integration: Connecting specialized architectures to modern tools"
      ]
    },
    {
      title: "Modern Technology Implementation",
      items: [
        "Go (Golang) Development: High-performance microservices and APIs",
        "Svelte & JavaScript Engineering: Responsive, efficient frontends",
        "PostgreSQL Implementation: Robust, scalable database solutions",
        "DevOps Excellence: Automated deployment and testing pipelines"
      ]
    }
  ];



  const advantages = [
    {
      title: "Business-Driven Development",
      description: "We approach every development project with your business outcomes in mind. Our technical solutions are designed to deliver measurable ROI, not just technical elegance."
    },
    {
      title: "AI-Enhanced Coding",
      description: "Our development teams leverage AI acceleration in their own work, enabling faster delivery, higher quality code, and more innovative solutions."
    },
    {
      title: "Full-Spectrum Implementation",
      description: "Our teams execute across your entire technology ecosystem, ensuring seamless integration between legacy systems, modern applications, and AI capabilities."
    },
    {
      title: "Future-Ready Architecture",
      description: "We build with tomorrow in mind, creating flexible foundations that can easily adapt to emerging AI capabilities and business needs."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Development Services | CedarCreek.AI - AI Accelerator Blueprint™</title>
        <meta name="description" content="Transform your technology foundation with our AI-powered development services. We bridge legacy systems with AI innovation for measurable business results." />
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
              <span className="gradient-text">AI-Powered</span> Development Services
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Transform Your Technology Foundation with Strategic Development
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-neutral-900">Where Legacy Systems Meet AI Innovation</h2>
              <p className="text-lg text-neutral-600 mb-8">
                At CedarCreek, we understand that successful AI implementation often requires strategic development work. Our development services bridge the gap between your existing technology ecosystem and AI-powered innovation, ensuring you can maximize the value of both.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Our Development Approach</h3>
              <p className="text-neutral-600 mb-6">
                We don't just implement AI solutions - we build the technical foundations that make them transformative. Our development methodology follows the same principles that drive our 
                <span className="gradient-text font-semibold"> AI Accelerator Blueprint™</span>: speed, expertise, and measurable results.
              </p>
              
              <Button 
                onClick={() => scrollToSection("contact")} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Discuss Your Development Needs
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1569396116180-210c182bedb8?q=80&w=1000&auto=format&fit=crop" 
                alt="Development services" 
                className="w-full h-auto" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-16" style={{ background: "linear-gradient(to bottom, #141414, #181818, #1a1a1a)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Our Development Process</h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="bg-neutral-800 p-8 rounded-lg border border-neutral-700">
                <h3 className="text-xl font-bold mb-4 text-primary">Strategic Technology Assessment</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Legacy System Evaluation</p>
                      <p className="text-neutral-400">Comprehensive analysis of your existing technologies</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Integration Opportunity Mapping</p>
                      <p className="text-neutral-400">Identification of AI enhancement points</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Technical Debt Assessment</p>
                      <p className="text-neutral-400">Prioritization of modernization efforts</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Architecture Optimization Planning</p>
                      <p className="text-neutral-400">Blueprint for future-ready systems</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-neutral-800 p-8 rounded-lg border border-neutral-700">
                <h3 className="text-xl font-bold mb-4 text-secondary">Accelerated Development Implementation</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Fast-Track Modernization</p>
                      <p className="text-neutral-400">Rapid enhancement of critical systems</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">AI-Ready Integration</p>
                      <p className="text-neutral-400">Development of necessary APIs and connectors</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Continuous Deployment Pipelines</p>
                      <p className="text-neutral-400">Streamlined update processes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Performance Optimization</p>
                      <p className="text-neutral-400">Speed and reliability enhancements</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900">Our Technical Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {technicalExpertise.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-neutral-50 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold mb-4 text-neutral-900">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <Code className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p className="text-neutral-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



      {/* Advantages Section */}
      <section className="py-16" style={{ background: "linear-gradient(to bottom, #141414, #181818, #1a1a1a)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              The CedarCreek <span className="gradient-text">Development Advantage</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="bg-neutral-800 p-6 rounded-lg border border-neutral-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">{advantage.title}</h3>
                  <p className="text-neutral-400">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={() => scrollToSection("contact")} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Start Your Development Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with Booking Form */}
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}