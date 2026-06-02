"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priyanka Chopra",
    role: "Celebrity Client",
    text: "An absolute visionary. She understands exactly how to enhance natural beauty while bringing the drama needed for the red carpet.",
  },
  {
    name: "Sarah & James",
    role: "Destination Wedding",
    text: "My bridal makeup lasted 16 hours flawlessly through tears, dancing, and humidity. It was exactly what I dreamed of and more.",
  },
  {
    name: "Vogue India",
    role: "Editorial Team",
    text: "Consistently delivers immaculate skin and creative artistry. A true professional who elevates every photoshoot she touches.",
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl mb-4"
          >
            Words of Admiration
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground uppercase tracking-widest text-sm"
          >
            Client Testimonials
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 bg-card border border-border relative"
            >
              <Quote className="w-12 h-12 text-primary/20 absolute top-4 right-4" />
              <p className="text-lg italic leading-relaxed mb-8 relative z-10">"{t.text}"</p>
              <div>
                <p className="font-heading text-xl">{t.name}</p>
                <p className="text-primary uppercase tracking-widest text-xs mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
