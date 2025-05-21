import { useEffect } from "react";

export function ClickUpBookingForm() {
  // Load the ClickUp script after component mounts
  useEffect(() => {
    // Check if the script is already loaded
    if (!document.querySelector('script[src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"]')) {
      const script = document.createElement("script");
      script.src = "https://app-cdn.clickup.com/assets/js/forms-embed/v1.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        // Clean up if needed when component unmounts
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="w-full min-h-[600px] h-full">
      <iframe 
        className="clickup-embed clickup-dynamic-height" 
        src="https://forms.clickup.com/2480527/f/2bpcf-30876/STP74QRVCWP41CIDZJ" 
        onWheel={() => {}} 
        width="100%" 
        height="100%" 
        style={{ 
          background: "transparent", 
          border: "1px solid #ccc",
          borderRadius: "8px", 
          minHeight: "600px"
        }}
      ></iframe>
    </div>
  );
}