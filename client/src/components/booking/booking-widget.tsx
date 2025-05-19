import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookingCalendar } from "./booking-calendar";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface BookingWidgetProps {
  className?: string;
  buttonText?: string;
  fullWidth?: boolean;
}

export function BookingWidget({ 
  className = "", 
  buttonText = "Book a Free Consultation", 
  fullWidth = false 
}: BookingWidgetProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="lg" 
          className={`bg-primary hover:bg-primary/90 text-white flex items-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
        >
          <Calendar className="h-5 w-5" />
          {buttonText}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[700px] overflow-y-auto" side="right">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl">Schedule Your Free AI Consultation</SheetTitle>
          <SheetDescription>
            Choose a date and time for your 30-minute call with one of our AI implementation experts.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">30-Minute Free Strategy Session</p>
                  <p className="text-neutral-600">Get personalized AI adoption insights for your business</p>
                </div>
              </div>
              <div className="border-t border-neutral-200 my-4"></div>
            </div>
          
            <BookingCalendar />
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}