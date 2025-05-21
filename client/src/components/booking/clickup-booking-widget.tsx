import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger
} from "@/components/ui/sheet";

interface ClickUpBookingWidgetProps {
  className?: string;
  buttonText?: string;
  fullWidth?: boolean;
}

export function ClickUpBookingWidget({
  className = "",
  buttonText = "Book a Free Consultation",
  fullWidth = false
}: ClickUpBookingWidgetProps) {
  const [open, setOpen] = React.useState(false);

  // Load the ClickUp script when the sheet is opened
  useEffect(() => {
    if (open) {
      // Check if the script is already loaded
      if (!document.querySelector('script[src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"]')) {
        const script = document.createElement("script");
        script.src = "https://app-cdn.clickup.com/assets/js/forms-embed/v1.js";
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
          // Clean up only if component unmounts and script exists
          const existingScript = document.querySelector('script[src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"]');
          if (existingScript && document.body.contains(existingScript)) {
            document.body.removeChild(existingScript);
          }
        };
      }
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="lg" 
          className={`bg-primary hover:bg-primary/90 text-white flex items-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
        >
          <CalendarIcon className="h-5 w-5" />
          {buttonText}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[700px] overflow-y-auto pb-0" side="right">
        <SheetHeader className="text-left mb-4">
          <SheetTitle className="text-2xl">Schedule Your AI Consultation</SheetTitle>
          <SheetDescription>
            Fill out the form below to book your free 30-minute consultation with our AI implementation experts.
          </SheetDescription>
        </SheetHeader>
        
        <div className="h-[calc(100vh-150px)] pb-6">
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
      </SheetContent>
    </Sheet>
  );
}