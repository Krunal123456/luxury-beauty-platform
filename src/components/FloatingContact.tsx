"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingContact() {
  const phoneNumber = "918857075984";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20there!%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <div className="fixed bottom-8 left-8 z-[90] flex flex-col gap-4">
      {/* Call Button */}
      <motion.a
        href="tel:+918857075984"
        className="w-14 h-14 bg-card border border-primary/50 text-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.3 }}
        title="Call Now"
      >
        <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.4 }}
        title="WhatsApp Us"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </div>
  );
}
