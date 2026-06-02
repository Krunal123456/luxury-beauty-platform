"use client";

import { motion } from "framer-motion";
import { Sparkles, Crown, Camera } from "lucide-react";

const services = [
  {
    title: "Bridal Makeup",
    description: "Flawless, long-lasting HD and airbrush makeup tailored for your most important day. We ensure you look stunning in person and on camera.",
    icon: Crown,
  },
  {
    title: "Fashion & Editorial",
    description: "High-impact, creative looks designed for magazines, runway shows, and commercial photo shoots. Pushing the boundaries of beauty.",
    icon: Camera,
  },
  {
    title: "Celebrity Glam",
    description: "Red carpet ready perfection. A bespoke, luxurious experience providing pristine skin and captivating eyes for high-profile events.",
    icon: Sparkles,
  }
];

export function Services() {
  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl mb-4"
          >
            Signature Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground uppercase tracking-widest text-sm"
          >
            Mastery in Every Stroke
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 border border-border bg-background hover:border-primary transition-colors group cursor-pointer"
            >
              <service.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-2xl mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
