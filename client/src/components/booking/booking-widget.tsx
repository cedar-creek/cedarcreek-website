
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
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
// Correctly import all Select components
import * as SelectPrimitive from "@radix-ui/react-select";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: assessmentData?.name || "",
    email: assessmentData?.email || "",
    phone: assessmentData?.phone || "",
    company: assessmentData?.company || "",
    industry: assessmentData?.industry || "",
    size: assessmentData?.size || "",
    aiInterests: assessmentData?.aiInterests || []
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
  const handleBooking = async () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Add assessment data to booking if available
      const bookingData = {
        ...formData,
        date: date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : '',
        time: selectedTimeSlot?.time || '',
        industry: formData.industry || '',
        size: formData.size || '',
        aiInterests: formData.aiInterests || []
      };
      
      // Submit booking to API (commented out for now)
      // const response = await apiRequest('POST', '/api/booking', bookingData);
      
      // Show success message
      setBookingConfirmed(true);
      
      toast({
        title: "Booking Confirmed",
        description: "Your consultation has been scheduled successfully!"
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    }
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
            {currentStep === 1 && "Choose a date and time for your free 30-minute consultation."}
            {currentStep === 2 && "Tell us about your business to personalize your consultation."}
            {currentStep === 3 && "Complete your booking details."}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {step}
                    </div>
                    <span className="ml-2 text-sm hidden md:block">
                      {step === 1 && "Select Time"}
                      {step === 2 && "AI Assessment"}
                      {step === 3 && "Your Details"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-neutral-200 h-2 rounded-full">
                <div 
                  className="bg-primary h-full rounded-full transition-all" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Date & Time Selection */}
            {currentStep === 1 && (
              <div className="mt-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                  <div className="flex-1">
                    <div className="text-lg font-medium mb-3">Select a Date</div>
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
                      Select an Available Time
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
              </div>
            )}
            
            {/* Step 2: AI Readiness Assessment Questions */}
            {currentStep === 2 && (
              <div className="mt-6 space-y-6">
                <div>
                  <Label className="block text-lg font-medium mb-2">What industry is your business in?</Label>
                  <Select 
                    value={formData.industry || ""} 
                    onValueChange={(value) => setFormData({...formData, industry: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-lg font-medium mb-2">What is the size of your organization?</Label>
                  <Select 
                    value={formData.size || ""} 
                    onValueChange={(value) => setFormData({...formData, size: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-lg font-medium mb-2">
                    Which areas are you most interested in applying AI? (Select up to 3)
                  </Label>
                  <div className="space-y-2">
                    {[
                      { id: "customer-service", label: "Customer Service Automation" },
                      { id: "predictive-analytics", label: "Predictive Analytics & Forecasting" },
                      { id: "process-automation", label: "Process Automation" },
                      { id: "content-generation", label: "Content Generation & Marketing" },
                      { id: "decision-support", label: "Decision Support & Insights" },
                    ].map(item => (
                      <div key={item.id} className="flex items-center">
                        <Checkbox 
                          id={item.id} 
                          checked={(formData.aiInterests || []).includes(item.id)}
                          onCheckedChange={(checked) => {
                            const currentInterests = formData.aiInterests || [];
                            const updatedInterests = checked 
                              ? [...currentInterests, item.id]
                              : currentInterests.filter(i => i !== item.id);
                            setFormData({...formData, aiInterests: updatedInterests});
                          }}
                          className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                          disabled={(formData.aiInterests || []).length >= 3 && !(formData.aiInterests || []).includes(item.id)}
                        />
                        <Label htmlFor={item.id} className="ml-2">{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="block text-sm font-medium mb-1">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="mt-4 p-4 bg-neutral-100 rounded-lg">
                  <h4 className="font-medium">Your consultation details:</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    {date && `Date: ${format(date, "MMMM d, yyyy")}`}
                    {selectedTimeSlot && `, Time: ${selectedTimeSlot.formattedTime}`}
                  </p>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              ) : (
                <div></div> 
              )}
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    // Validate current step
                    if (currentStep === 1 && (!date || !selectedTimeSlot)) {
                      toast({
                        title: "Selection Required",
                        description: "Please select both a date and time before proceeding.",
                        variant: "destructive"
                      });
                      return;
                    }
                    
                    // Proceed to next step
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </Button>
              )}
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
