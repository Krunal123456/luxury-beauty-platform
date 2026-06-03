"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-[family-name:var(--font-signature)] text-3xl tracking-wide text-foreground">
            MakeMyMakeup
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link>
            <Link href="/stories" className="text-muted-foreground hover:text-primary transition-colors">Stories</Link>
            <Link href="/journal" className="text-muted-foreground hover:text-primary transition-colors">Journal</Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link href="/book">
              <Button variant="outline" className="hidden md:flex border-border bg-transparent hover:bg-white/5 hover:text-foreground rounded-none tracking-widest uppercase text-xs h-10">
                Book Now
              </Button>
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-foreground p-2 hover:text-primary transition-colors md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground p-2 hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <nav className="flex flex-col items-center gap-8 text-xl tracking-widest uppercase font-heading">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Home</Link>
              <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Portfolio</Link>
              <Link href="/stories" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Stories</Link>
              <Link href="/journal" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Journal</Link>
              <Link href="/book" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-primary/80 transition-colors mt-8 border border-primary px-8 py-4">Book Now</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
