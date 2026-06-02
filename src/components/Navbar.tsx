"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
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
        <Link href="/" className="font-heading text-2xl tracking-widest text-foreground font-semibold">
          LUXE<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link>
          <Link href="/stories" className="text-muted-foreground hover:text-primary transition-colors">Stories</Link>
          <Link href="/journal" className="text-muted-foreground hover:text-primary transition-colors">Journal</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/book">
            <Button variant="outline" className="hidden md:flex border-border bg-transparent hover:bg-white/5 hover:text-foreground rounded-none tracking-widest uppercase text-xs h-10">
              Book Now
            </Button>
          </Link>
          <button className="text-foreground p-2 hover:text-primary transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
