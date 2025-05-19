import { motion } from "framer-motion";
import { Play, Star, FlaskRound, CalendarCheck, History, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                The world doesn't need another AI company. It needs a catalyst - an organization that can bridge the gap between AI's promise and its practical implementation. That's CedarCreek.
              </p>
              <p className="text-neutral-300 mb-4 max-w-4xl mx-auto text-center">
                When we free people from repetitive tasks, they can focus on creativity, innovation, and strategic thinking. When we enhance decision-making with AI insights, we empower people to make bigger, bolder moves. When we automate processes, we don't just save time - we create space for breakthrough thinking.
              </p>
              <p className="text-neutral-300 mb-6 max-w-4xl mx-auto text-center">
                We're not just implementing AI; we're transforming how businesses evolve, compete, and win in the age of AI.
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
              <h3 className="text-2xl font-bold mb-6 text-neutral-900">Our Vision: Democratizing AI's Transformative Power</h3>
              <p className="text-neutral-600 mb-4">
                We're living through one of the most profound technological shifts in human history. Artificial intelligence isn't just another tool - it's a fundamental transformation in how business operates, how value is created, and how human potential is unleashed.
              </p>
              <p className="text-neutral-600 mb-4">
                At CedarCreek, we believe AI's transformative power should be accessible to every business, not just tech giants. The path to AI adoption shouldn't require an army of engineers or millions in investment. With the right approach, any company can harness AI to achieve extraordinary results.
              </p>
              <p className="text-neutral-600 mb-4">
                Our mission is to guide businesses through their AI transformation journey with unmatched speed and certainty. We've developed a systematic, proven approach that delivers results in weeks, not months.
              </p>
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
                className="rounded-lg shadow-lg" 
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
              For over 25 years, our team has been passionate about helping organizations become more competitive through systems that leverage technology to increase profits and productivity. This foundation has shaped our core belief: technology is at its best when it's seamless, integrated, and automatic.
            </p>
            <p className="text-neutral-300 mb-8 max-w-4xl mx-auto text-center">
              We've been honored to help thousands of companies transform their businesses through software programs, white papers, workshops, and personal coaching. As entrepreneurs ourselves, we have a real passion for small business and understand the unique challenges they face in adopting cutting-edge technology.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">25+</p>
                <p className="text-neutral-300">Years Experience</p>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">1000+</p>
                <p className="text-neutral-300">Businesses Helped</p>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">50+</p>
                <p className="text-neutral-300">Industries Served</p>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                <p className="font-bold text-primary text-lg mb-1">95%</p>
                <p className="text-neutral-300">Client Satisfaction</p>
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
            Our journey to becoming AI acceleration specialists didn't happen overnight. It evolved through decades of technology experience and business transformation:
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
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-neutral-900">Web Development Excellence</h4>
              <p className="text-neutral-600">
                Through our design company, we built a reputation for creative and innovative web solutions, servicing more than 400 clients across 50+ industries. We've developed winning website and marketing solutions for large corporations, banks, and government sectors, including global brands like McDonald's and Coca-Cola.
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
                <History className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-neutral-900">Expanding Our Reach</h4>
              <p className="text-neutral-600">
                Recognizing the strong demand from smaller companies for our expertise, we expanded our services to offer winning web solutions at incredible value, giving these businesses access to the same powerful tools we developed for our corporate clients.
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
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-neutral-900">AI Transformation</h4>
              <p className="text-neutral-600">
                Today, we've channeled our decades of technology implementation expertise into helping businesses navigate the AI revolution. We've refined our methodologies through collaboration with some of the smartest business growth experts in the world, creating an approach that delivers measurable results quickly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
        
      {/* Call to Action - Dark Background */}
      <section id="about-cta" className="py-16" style={{ background: "linear-gradient(to bottom, #141414, #181818, #1a1a1a)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Ready to Transform Your Business?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => scrollToSection("contact")} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                Contact Us
              </Button>
              <Button 
                onClick={() => scrollToSection("solutions")} 
                variant="outline" 
                size="lg"
                className="px-8 border-neutral-700 text-white hover:bg-neutral-800"
              >
                View Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}