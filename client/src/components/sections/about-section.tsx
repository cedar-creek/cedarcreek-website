import { motion } from "framer-motion";
import { Play, Star, FlaskRound } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            About <span className="gradient-text">CedarCreek.AI</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            We're on a mission to democratize AI technology, making strategic AI implementation 
            accessible to businesses of all sizes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
            <p className="text-neutral-600 mb-4">
              CedarCreek.AI was founded with a singular vision: to bridge the gap between cutting-edge 
              AI capabilities and practical business implementation. We believe that AI should be 
              accessible to all businesses, not just tech giants with unlimited resources.
            </p>
            <p className="text-neutral-600 mb-4">
              Our team of AI specialists, business strategists, and implementation experts work together 
              to deliver tangible results through our proven methodology that focuses on quick wins and 
              measurable ROI.
            </p>
            <p className="text-neutral-600 mb-8">
              We don't just implement technology – we transform businesses through strategic AI adoption 
              that drives growth and competitive advantage.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="font-bold text-primary text-lg mb-1">50+</p>
                <p className="text-neutral-600">Successful Implementations</p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="font-bold text-primary text-lg mb-1">12</p>
                <p className="text-neutral-600">Industry Verticals Served</p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="font-bold text-primary text-lg mb-1">300%</p>
                <p className="text-neutral-600">Average ROI</p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="font-bold text-primary text-lg mb-1">95%</p>
                <p className="text-neutral-600">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&h=780" 
              alt="CedarCreek.AI team collaborating" 
              className="rounded-lg shadow-lg mb-8" 
            />
            
            <h3 className="text-xl font-bold mb-4">Our Approach to AI</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary-light rounded-full p-2 mr-4 mt-1">
                  <Play className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Practical Over Theoretical</p>
                  <p className="text-neutral-600">We focus on real-world applications with measurable benefits</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-light rounded-full p-2 mr-4 mt-1">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Results-Driven Methodology</p>
                  <p className="text-neutral-600">Our blueprint is designed for maximum ROI in minimum time</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-light rounded-full p-2 mr-4 mt-1">
                  <FlaskRound className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Technology Agnostic</p>
                  <p className="text-neutral-600">We select the right tools for your specific needs</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
