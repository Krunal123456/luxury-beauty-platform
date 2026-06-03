"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url("/bridal.png")' }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/20 to-background/80" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6">
            {t.heroTagline}
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6 text-foreground drop-shadow-2xl">
            {t.heroTitlePrefix} <span className="italic text-primary">{t.heroTitleHighlight}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
            {t.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/918857075984" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors w-full sm:w-auto shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
            >
              {t.heroBtnPrimary}
            </a>
            <a 
              href="/portfolio" 
              className="border border-border text-foreground px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto bg-background/50 backdrop-blur-sm"
            >
              {t.heroBtnSecondary}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-primary"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
