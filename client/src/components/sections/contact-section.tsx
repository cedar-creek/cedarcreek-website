import { motion } from "framer-motion";
import { IntakeForm } from "@/components/intake-form";

export function ContactSection() {
  return (
    <section id="contact" className="py-16" style={{ background: "linear-gradient(to bottom, #141414, #181818, #1a1a1a)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IntakeForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
