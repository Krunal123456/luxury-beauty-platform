"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export function Contact() {
  const phoneNumber = "918857075984";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20Ravina%20Makeover!%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <section className="py-24 bg-background border-t border-border relative overflow-hidden" id="contact">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Location & Booking</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Get In <span className="italic text-primary">Touch</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[400px] lg:h-auto min-h-[400px] border border-border p-2 bg-card relative overflow-hidden"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59745.04!2d78.6032!3d20.7453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd470b8c1234567%3A0xabcdef1234567890!2sWardha%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-10 p-8 lg:p-12 bg-card border border-border"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-xl mb-1">Phone / WhatsApp</h4>
                  <a href="tel:+918857075984" className="text-muted-foreground hover:text-primary transition-colors">+91 88570 75984</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-xl mb-1">Studio Location</h4>
                  <p className="text-muted-foreground leading-relaxed">Wardha, Maharashtra, India<br />(Home services available across the district)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-xl mb-1">Working Hours</h4>
                  <p className="text-muted-foreground">Mon–Sun: 7:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-primary-foreground py-4 px-6 text-sm font-semibold tracking-widest uppercase text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a 
                href="https://maps.google.com/?q=Wardha+Maharashtra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-transparent border border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary py-4 px-6 text-sm font-semibold tracking-widest uppercase text-center transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" /> Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
