"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Sparkles, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

export function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send data to backend here.
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="lookbook">
      {/* Decorative BG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-card border border-primary/20 shadow-2xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start gap-4 mb-6"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Free Exclusive Guide</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-5xl mb-6 text-foreground"
            >
              The 2026 Bridal <span className="italic text-primary">Lookbook</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Discover the top makeup trends, skincare prep secrets, and styling tips for the modern Indian bride. Curated by our expert artists, directly to your inbox.
            </motion.p>
          </div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-[350px] shrink-0"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  className="bg-background border-border h-12"
                />
                <Input 
                  type="tel" 
                  placeholder="WhatsApp Number" 
                  required 
                  className="bg-background border-border h-12"
                />
                <button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground h-12 flex items-center justify-center gap-2 font-semibold tracking-widest uppercase text-sm hover:bg-primary/90 transition-colors mt-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <p className="text-[10px] text-muted-foreground text-center tracking-wide uppercase mt-2">
                  We respect your privacy. No spam.
                </p>
              </form>
            ) : (
              <div className="bg-primary/10 border border-primary/30 p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-2xl text-primary mb-2">Thank You!</h4>
                <p className="text-sm text-foreground">
                  The Lookbook is being sent to your WhatsApp right now.
                </p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
