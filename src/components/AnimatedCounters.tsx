"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing out function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOutQuart * (to - from) + from));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, to, from, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl md:text-7xl text-foreground font-medium mb-2">
        {count}{suffix}
      </div>
    </div>
  );
}

export function AnimatedCounters() {
  return (
    <section className="py-24 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <div className="flex flex-col items-center">
            <Counter from={0} to={12} suffix="+" />
            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">Years of Experience</p>
          </div>
          <div className="flex flex-col items-center">
            <Counter from={0} to={500} suffix="+" />
            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">Weddings Completed</p>
          </div>
          <div className="flex flex-col items-center">
            <Counter from={0} to={1500} suffix="+" />
            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">Happy Clients</p>
          </div>
          <div className="flex flex-col items-center">
            <Counter from={0} to={5} suffix=".0" />
            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
