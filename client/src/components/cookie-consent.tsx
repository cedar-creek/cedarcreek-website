import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          data-testid="cookie-banner"
        >
          <div className="max-w-4xl mx-auto bg-neutral-800 border border-neutral-700 rounded-xl p-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-neutral-300">
                  We use cookies to improve your experience and analyze our traffic. By continuing to use our site, you consent to our use of cookies in accordance with our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              <Button 
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
                data-testid="cookie-accept"
              >
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
