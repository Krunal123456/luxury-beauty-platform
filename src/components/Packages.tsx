"use client";

import { motion } from "framer-motion";
import { Check, Star, Crown, Gem } from "lucide-react";

const packages = [
  {
    name: "Blush Package",
    tagline: "For Intimate Occasions",
    icon: Gem,
    popular: false,
    features: [
      "HD Party/Reception Makeup",
      "Hair Setting (Open/Bun)",
      "Saree Draping",
      "Skincare Prep",
      "Premium Products"
    ]
  },
  {
    name: "Royal Bridal",
    tagline: "For the Grand Wedding Day",
    icon: Crown,
    popular: true,
    features: [
      "Complete Bridal Makeup",
      "Bridal Hairstyling",
      "Nauvari Saree Draping",
      "Skincare Pre-Bridal Prep",
      "Touch-up Kit Included",
      "Airbrush / HD Finish"
    ]
  },
  {
    name: "Classic Bride",
    tagline: "Engagement + Wedding Combo",
    icon: Star,
    popular: false,
    features: [
      "Engagement Makeup",
      "Bridal Wedding Makeup",
      "Hairstyles for both events",
      "2 Saree Drapings",
      "Mehndi Function Makeup"
    ]
  }
];

export function Packages() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="packages">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Investment</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Bridal <span className="italic text-primary">Packages</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Thoughtfully curated packages that celebrate every bride&apos;s individuality and occasion. Designed for absolute perfection.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative p-8 md:p-10 flex flex-col h-full bg-card/40 backdrop-blur-md border ${
                pkg.popular ? "border-primary/50 shadow-[0_0_40px_rgba(212,175,55,0.1)]" : "border-border"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1.5 text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <pkg.icon className={`w-8 h-8 mb-6 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-heading text-3xl mb-2 text-foreground">{pkg.name}</h3>
                <p className="text-sm tracking-widest uppercase text-primary font-medium">{pkg.tagline}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="https://wa.me/918857075984" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full text-center py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                  pkg.popular 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg" 
                    : "border border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                Enquire Now
              </a>
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 text-sm tracking-widest text-muted-foreground uppercase"
        >
          Contact us on WhatsApp for current pricing and custom packages ✨
        </motion.p>
      </div>
    </section>
  );
}
