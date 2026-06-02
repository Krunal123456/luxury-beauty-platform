"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/918857075984"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-black/20 hover:scale-110 transition-transform"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <MessageCircle className="text-white w-6 h-6" />
      <span className="absolute -top-12 right-0 bg-foreground text-background text-xs px-3 py-2 rounded shadow-xl whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        Book on WhatsApp
      </span>
    </motion.a>
  );
}
