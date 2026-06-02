"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/40 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.png"
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2021/08/10/84478-587265910_large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 container px-4 mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-primary tracking-[0.2em] text-sm md:text-base uppercase mb-6 font-semibold"
        >
          For moments that deserve to be remembered forever
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground font-medium tracking-tight mb-8 max-w-5xl leading-tight"
        >
          Luxury Bridal, Fashion and Celebrity Makeup Experiences
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 items-center mt-8"
        >
          <Link href="/book">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-none text-lg tracking-wider group transition-all duration-300">
              Book Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/stories">
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-white/5 hover:text-foreground h-14 px-8 rounded-none text-lg tracking-wider backdrop-blur-sm">
              Explore Transformations
            </Button>
          </Link>
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
