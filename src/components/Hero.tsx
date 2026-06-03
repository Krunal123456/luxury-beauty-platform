"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MagicButton } from "@/components/ui/MagicButton";

export function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6">
            {t.heroTagline}
          </motion.p>
          <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6 text-foreground drop-shadow-2xl">
            {t.heroTitlePrefix} <span className="italic text-primary">{t.heroTitleHighlight}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
            {t.heroDescription}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/918857075984" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <MagicButton>
                {t.heroBtnPrimary}
              </MagicButton>
            </a>
            <a 
              href="/portfolio" 
              className="border border-border text-foreground px-8 py-[15px] text-xs font-semibold tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto bg-background/50 backdrop-blur-sm h-14 flex items-center justify-center"
            >
              {t.heroBtnSecondary}
            </a>
          </motion.div>
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
