"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Desai",
    role: "Bride",
    text: "My wedding makeup was absolutely perfect. It lasted 16 hours through all the dancing and crying without feeling heavy!",
    image: "/bridal.jpg"
  },
  {
    name: "Neha Sharma",
    role: "Bridesmaid",
    text: "She made me feel so comfortable. The final look was exactly what I showed her from my Pinterest board. Highly recommend!",
    image: "/fashion.jpg"
  },
  {
    name: "Sneha Kapoor",
    role: "Engagement",
    text: "The best makeup artist I've ever booked! She kept my skin looking natural and flawless. I received so many compliments.",
    image: "/celebrity.jpg"
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
            Client Love
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground uppercase tracking-widest text-sm"
          >
            Real Reviews from Real Clients
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
              className="p-8 bg-card border border-border flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-base leading-relaxed mb-8 text-foreground/90">&quot;{t.text}&quot;</p>
              </div>
              <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                <div>
                  <p className="font-heading text-lg font-medium">{t.name}</p>
                  <p className="text-primary uppercase tracking-widest text-[10px] mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
