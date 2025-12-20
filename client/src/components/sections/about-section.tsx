import { motion } from "framer-motion";
import { Server, Database, Code, Star, History, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import modernizationImage from "@assets/Gemini_Generated_Image_8pku258pku258pku_1766188890390.png";

export function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Why We Exist Section - Dark Background */}
      <section id="about-why" className="py-16" style={{ background: "linear-gradient(to bottom, #141414, #181818, #1a1a1a)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Why We Exist</h3>
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-xl">
              <p className="text-white mb-4 max-w-4xl mx-auto text-center text-lg font-medium">
                The world doesn't need another tech consultancy. It needs engineers who understand how to modernize the core systems that run businesses. That's CedarCreek.
              </p>
              <p className="text-neutral-300 mb-4 max-w-4xl mx-auto text-center">
                When we modernize legacy infrastructure, we don't just improve performance—we unlock decades of accumulated business logic for the AI era. When we migrate monolithic systems to microservices, we create foundations for scalability and innovation. When we refactor technical debt, we transform liabilities into competitive advantages.
              </p>
              <p className="text-neutral-300 mb-6 max-w-4xl mx-auto text-center">
                We're not just implementing AI; we're engineering the modern platforms that make AI integration possible and sustainable.
              </p>
              <p className="text-primary max-w-4xl mx-auto text-center font-bold">
                This is our vision. This is our mission. This is why we exist.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Vision Section - Light Background */}
      <section id="about-vision" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-neutral-900">Our Vision: Bridging Legacy Systems to Modern Performance</h3>
              <p className="text-neutral-600 mb-4">
                We're living through one of the most profound technological shifts in enterprise computing. Legacy systems that have powered businesses for decades are now bottlenecks preventing AI adoption and digital transformation.
              </p>
              <p className="text-neutral-600 mb-4">
                At CedarCreek, we believe every business deserves access to modern, performant systems—not just those with unlimited IT budgets. The path to modernization shouldn't require starting from scratch or risking business continuity.
              </p>
              <p className="text-neutral-600 mb-4">
                Our mission is to guide businesses through their system modernization journey with proven methodologies that preserve business logic while enabling modern architectures. We've developed systematic approaches that deliver results in weeks, not years.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src={modernizationImage} 
                alt="Abstract representation of modern system architecture and circuit data flow" 
                className="rounded-xl shadow-lg w-full h-auto" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Foundation Section - Dark Background */}
      <section id="about-foundation" className="py-16" style={{ background: "linear-gradient(to bottom, #141414, #181818, #1a1a1a)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Our Foundation</h3>
            <p className="text-neutral-300 mb-4 max-w-4xl mx-auto text-center">
              For over 25 years, our team has been passionate about bridging the gap between aging legacy infrastructure and modern performance. This foundation has shaped our core belief: technology is at its best when it's seamless, integrated, and built to last.
            </p>
            <p className="text-neutral-300 mb-8 max-w-4xl mx-auto text-center">
              We've helped hundreds of organizations identify technical debt, modernize critical systems, and build scalable architectures. As engineers who've worked with legacy codebases for decades, we understand the unique challenges of maintaining and modernizing systems that businesses depend on.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">25+</p>
                <p className="text-neutral-300">Years Engineering Experience</p>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">500+</p>
                <p className="text-neutral-300">Systems Modernized</p>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">50+</p>
                <p className="text-neutral-300">Industries Served</p>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">50+</p>
                <p className="text-neutral-300 text-sm">Vendor Integrations</p>
                <p className="text-neutral-500 text-xs mt-1 leading-relaxed">EdTech (LTI) • Fintech (Ordering) • CRM (HubSpot/Salesforce)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Section - Light Background */}
      <section id="about-journey" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-neutral-900">Our Journey</h3>
          <p className="text-neutral-600 mb-8 max-w-4xl mx-auto text-center">
            Our journey to becoming system modernization specialists didn't happen overnight. It evolved through decades of hands-on engineering experience and enterprise transformation:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-6 rounded-lg shadow-md"
            >
              <div className="bg-primary/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-neutral-900">Engineering Roots</h4>
              <p className="text-neutral-600">
                We built our reputation on complex data architectures and high-concurrency solutions for secure sectors, servicing more than 400 clients across 50+ industries. We've engineered mission-critical systems for financial institutions, healthcare providers, and government agencies requiring the highest standards of reliability and security.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-6 rounded-lg shadow-md"
            >
              <div className="bg-secondary/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-neutral-900">Expanding Our Reach</h4>
              <p className="text-neutral-600">
                Recognizing the strong demand from mid-market companies for enterprise-grade expertise, we expanded our services to offer powerful modernization solutions at accessible price points, giving these businesses access to the same engineering capabilities we developed for our enterprise clients.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-6 rounded-lg shadow-md"
            >
              <div className="bg-accent/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-neutral-900">AI-Ready Modernization</h4>
              <p className="text-neutral-600">
                Today, we've channeled our decades of ColdFusion and SQL Server expertise into migrating legacy systems to Go, Svelte, and Ionic. We've refined our methodologies to deliver modern, AI-ready architectures that preserve critical business logic while enabling the performance and scalability that next-generation applications demand.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
        

    </>
  );
}
