
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
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { CalendarIcon, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, startOfDay } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface BookingWidgetProps {
  className?: string;
  buttonText?: string;
  fullWidth?: boolean;
  assessmentData?: {
    company: string;
    industry: string;
    size: string;
    systems: string[];
    aiInterests: string[];
    name: string;
    email: string;
    phone: string;
  };
}

// Simplified time slot type
type TimeSlot = {
  time: string;
  available: boolean;
  formattedTime: string;
};

export function BookingWidget({ 
  className = "", 
  buttonText = "Book a Free Consultation", 
  fullWidth = false,
  assessmentData
}: BookingWidgetProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [showTimeSlots, setShowTimeSlots] = React.useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = React.useState(false);
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([
    { time: "09:00", available: true, formattedTime: "9:00 AM" },
    { time: "10:00", available: true, formattedTime: "10:00 AM" },
    { time: "11:00", available: true, formattedTime: "11:00 AM" },
    { time: "13:00", available: true, formattedTime: "1:00 PM" },
    { time: "14:00", available: true, formattedTime: "2:00 PM" },
    { time: "15:00", available: true, formattedTime: "3:00 PM" },
    { time: "16:00", available: true, formattedTime: "4:00 PM" }
  ]);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<TimeSlot | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = React.useState(false);
  const [bookingConfirmed, setBookingConfirmed] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: assessmentData?.name || "",
    email: assessmentData?.email || "",
    phone: assessmentData?.phone || "",
    company: assessmentData?.company || ""
  });

  // Date constraints for calendar
  const today = startOfDay(new Date());
  const thirtyDaysFromNow = addDays(today, 30);
  const disabledDays = [
    { from: new Date(0), to: addDays(today, -1) }, // Disable past dates
    { from: addDays(thirtyDaysFromNow, 1), to: new Date(2100, 0, 1) }, // Disable dates beyond 30 days
  ];
  
  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Fetch available time slots function
  const fetchAvailableTimeSlots = async (selectedDate: Date) => {
    try {
      setIsLoadingSlots(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, randomly mark some slots as unavailable
      const randomizeSlots = () => {
        return timeSlots.map(slot => ({
          ...slot,
          available: Math.random() > 0.3 // 30% chance a slot is unavailable
        }));
      };
      
      setTimeSlots(randomizeSlots());
    } catch (error) {
      console.error("Error with time slots:", error);
      toast({
        title: "Note",
        description: "Using default availability for demonstration purposes.",
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };
  
  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setShowTimeSlots(true);
      setSelectedTimeSlot(null);
      fetchAvailableTimeSlots(selectedDate);
    } else {
      setShowTimeSlots(false);
    }
  };
  
  // Handle time slot selection
  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle booking submission
  const handleBooking = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    setBookingConfirmed(true);
    
    toast({
      title: "Booking Confirmed",
      description: "Your consultation has been scheduled successfully!"
    });
  };

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
      <SheetContent className="w-full md:max-w-[700px] overflow-y-auto" side="right">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl">Schedule Your AI Consultation</SheetTitle>
          <SheetDescription>
            Choose a date and time for your free 30-minute consultation with our AI experts.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="flex-1">
                  <div className="text-lg font-medium mb-3">1. Select a Date</div>
                  <div className="border border-neutral-200 rounded-lg p-3 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      disabled={[...disabledDays, isWeekend]}
                      className="rounded-md"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="text-lg font-medium mb-3">
                    2. Select an Available Time
                  </div>
                  {showTimeSlots ? (
                    <motion.div 
                      className="grid grid-cols-2 gap-2" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isLoadingSlots ? (
                        <div className="col-span-2 h-64 flex items-center justify-center">
                          <div className="flex flex-col items-center">
                            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
                            <p className="text-neutral-500">Loading available times...</p>
                          </div>
                        </div>
                      ) : (
                        timeSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant={selectedTimeSlot === slot ? "default" : "outline"}
                            className={`justify-start px-3 py-6 ${slot.available ? "hover:border-primary" : "opacity-50 cursor-not-allowed"} ${selectedTimeSlot === slot ? "bg-primary text-white" : ""}`}
                            onClick={() => handleTimeSelect(slot)}
                            disabled={!slot.available}
                          >
                            <div className="flex items-center w-full">
                              <Clock className="mr-2 h-4 w-4" />
                              <span>{slot.formattedTime}</span>
                              {!slot.available && <span className="ml-auto text-xs text-neutral-500">Booked</span>}
                              {selectedTimeSlot === slot && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </div>
                          </Button>
                        ))
                      )}
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-neutral-100 rounded-lg border border-neutral-200 p-6 text-center text-neutral-500 h-64 flex items-center justify-center">
                        <p>Please select a date to see available time slots</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  disabled={!date || !selectedTimeSlot}
                  className="bg-primary hover:bg-primary/90 text-white px-6"
                  onClick={() => setBookingDialogOpen(true)}
                >
                  Book Your Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </SheetContent>

      {/* Booking Information Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
            <DialogDescription>
              Enter your details to confirm your consultation on{" "}
              {date && format(date, "MMMM d, yyyy")} at{" "}
              {selectedTimeSlot?.formattedTime}.
            </DialogDescription>
          </DialogHeader>
          
          {!bookingConfirmed ? (
            <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-primary text-white"
                >
                  Confirm Booking
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="py-6 text-center">
              <div className="bg-green-100 text-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-neutral-600 mb-4">
                Your consultation is booked for{" "}
                {date && format(date, "MMMM d, yyyy")} at{" "}
                {selectedTimeSlot?.formattedTime}.
              </p>
              <p className="text-sm text-neutral-500">
                You'll receive a confirmation email with details and a calendar invitation.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}
