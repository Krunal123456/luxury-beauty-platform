"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Scissors, ArrowRight, CheckCircle2 } from "lucide-react";
import { format, addDays } from "date-fns";

export function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Generate next 14 days for the mock calendar
  const availableDates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i + 1));
  const availableTimes = ["08:00 AM", "10:00 AM", "01:00 PM", "04:00 PM", "06:30 PM"];
  const services = [
    "Bridal Makeup (Wedding)",
    "Engagement Makeup",
    "Party / Reception Glam",
    "Pre-Wedding Shoot",
    "Makeup Trial"
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService) return;
    
    const dateStr = format(selectedDate, "MMM do, yyyy");
    const message = `Hi! I would like to request a booking.%0A%0A*Service:* ${selectedService}%0A*Date:* ${dateStr}%0A*Time:* ${selectedTime}%0A%0APlease let me know if this slot is available and how I can pay the deposit.`;
    
    window.open(`https://wa.me/918857075984?text=${message}`, '_blank');
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="booking-calendar">
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Reserve Your Date</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Book Your <span className="italic text-primary">Session</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Select your preferred date, time, and service. We require an advance deposit to secure bridal bookings. Your slot is confirmed instantly upon payment.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto bg-card border border-border flex flex-col lg:flex-row min-h-[500px] shadow-2xl">
          
          {/* Left Panel - Summary */}
          <div className="w-full lg:w-1/3 bg-background border-r border-border p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-2xl text-foreground mb-8">Booking Details</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CalendarIcon className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-1">Date</div>
                    <div className="text-foreground font-medium">
                      {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "Not selected"}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-1">Time</div>
                    <div className="text-foreground font-medium">
                      {selectedTime ? selectedTime : "Not selected"}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Scissors className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-1">Service</div>
                    <div className="text-foreground font-medium">
                      {selectedService ? selectedService : "Not selected"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || !selectedService}
                className="w-full bg-primary text-primary-foreground h-14 flex items-center justify-center gap-2 font-semibold tracking-widest uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Confirm via WhatsApp <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel - Interactive Selection */}
          <div className="w-full lg:w-2/3 p-8 lg:p-12 relative overflow-hidden bg-card">
            {/* Step Indicators */}
            <div className="flex gap-2 mb-10">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1 flex-1 transition-colors duration-300 ${s <= step ? 'bg-primary' : 'bg-muted'}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h4 className="font-heading text-2xl text-foreground">Select a Date</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {availableDates.map((date, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedDate(date);
                          setTimeout(() => setStep(2), 300);
                        }}
                        className={`p-3 text-center border transition-all ${
                          selectedDate?.getTime() === date.getTime()
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <div className="text-xs uppercase tracking-widest mb-1">{format(date, "EEE")}</div>
                        <div className="text-xl font-heading">{format(date, "d")}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading text-2xl text-foreground">Select a Time</h4>
                    <button onClick={() => setStep(1)} className="text-xs text-primary uppercase tracking-widest font-semibold hover:underline">Back</button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {availableTimes.map((time, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedTime(time);
                          setTimeout(() => setStep(3), 300);
                        }}
                        className={`p-4 text-center border transition-all text-sm font-semibold tracking-widest ${
                          selectedTime === time
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading text-2xl text-foreground">Select Service</h4>
                    <button onClick={() => setStep(2)} className="text-xs text-primary uppercase tracking-widest font-semibold hover:underline">Back</button>
                  </div>
                  <div className="space-y-3">
                    {services.map((service, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedService(service)}
                        className={`w-full p-4 flex items-center justify-between border transition-all text-left ${
                          selectedService === service
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <span className="font-medium">{service}</span>
                        {selectedService === service && <CheckCircle2 className="w-5 h-5" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
