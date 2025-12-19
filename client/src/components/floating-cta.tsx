import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function FloatingCTA() {
  const scrollToForm = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.button
        onClick={scrollToForm}
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-primary hover:bg-primary/90 text-white shadow-lg transition-all cursor-pointer group"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          padding: "16px 12px",
          borderRadius: "8px 0 0 8px",
        }}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ paddingRight: "16px" }}
        data-testid="floating-cta-desktop"
      >
        <span className="flex items-center gap-2 font-semibold text-sm tracking-wide">
          <Zap className="h-4 w-4 rotate-90" />
          Get Your AI Acceleration Plan
        </span>
      </motion.button>

      <motion.button
        onClick={scrollToForm}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary hover:bg-primary/90 text-white shadow-lg py-4 px-6 flex items-center justify-center gap-2 cursor-pointer"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        data-testid="floating-cta-mobile"
      >
        <Zap className="h-5 w-5" />
        <span className="font-semibold">Get Your AI Acceleration Plan</span>
      </motion.button>
    </>
  );
}
