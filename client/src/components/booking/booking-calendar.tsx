import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfDay, isBefore } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { z } from "zod";

// Time slot data
type TimeSlot = {
  time: string;
  available: boolean;
  formattedTime: string;
};

const timeSlots: TimeSlot[] = [
  { time: "09:00", available: true, formattedTime: "9:00 AM" },
  { time: "10:00", available: true, formattedTime: "10:00 AM" },
  { time: "11:00", available: true, formattedTime: "11:00 AM" },
  { time: "13:00", available: true, formattedTime: "1:00 PM" },
  { time: "14:00", available: true, formattedTime: "2:00 PM" },
  { time: "15:00", available: true, formattedTime: "3:00 PM" },
  { time: "16:00", available: true, formattedTime: "4:00 PM" }
];

// Booking form schema
const bookingSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().min(1, "Company name is required"),
  date: z.date(),
  time: z.string()
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingCalendar() {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<TimeSlot | null>(null);
  const [showTimeSlots, setShowTimeSlots] = React.useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = React.useState(false);
  const [bookingConfirmed, setBookingConfirmed] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<BookingFormData>>({
    name: "",
    email: "",
    phone: "",
    company: ""
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
  
  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setShowTimeSlots(true);
      setSelectedTimeSlot(null);
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
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTimeSlot) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time for your consultation.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const fullFormData: BookingFormData = {
        ...formData as BookingFormData,
        date,
        time: selectedTimeSlot.time
      };
      
      // Validate form data
      bookingSchema.parse(fullFormData);
      
      // Submit booking to API
      await apiRequest('POST', '/api/booking', fullFormData);
      
      // Show success
      setBookingConfirmed(true);
      
      toast({
        title: "Booking Successful",
        description: "Your consultation has been scheduled. You'll receive a confirmation email shortly.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.map(err => err.message);
        toast({
          title: "Validation Error",
          description: fieldErrors.join(", "),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Booking Error",
          description: "There was an error processing your booking. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
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
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTimeSlot === slot ? "default" : "outline"}
                  className={cn(
                    "justify-start px-3 py-6",
                    slot.available ? "hover:border-primary" : "opacity-50 cursor-not-allowed",
                    selectedTimeSlot === slot ? "bg-primary text-white" : ""
                  )}
                  onClick={() => handleTimeSelect(slot)}
                  disabled={!slot.available}
                >
                  <div className="flex items-center w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{slot.formattedTime}</span>
                    {selectedTimeSlot === slot && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </div>
                </Button>
              ))}
            </motion.div>
          ) : (
            <div className="bg-neutral-100 rounded-lg border border-neutral-200 p-6 text-center text-neutral-500 h-64 flex items-center justify-center">
              <p>Please select a date to see available time slots</p>
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
            <form onSubmit={handleSubmit}>
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
                    required
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
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary text-white"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Booking"}
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
    </div>
  );
}