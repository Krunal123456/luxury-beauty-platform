"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MagicMirrorReveal = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springing for the spotlight
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate position relative to container
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <span className="text-primary tracking-[0.3em] uppercase text-xs font-semibold">The Magic Mirror</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            Discover the <span className="text-primary italic">Transformation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hover over the image to reveal the glamorous masterpiece hidden beneath the surface.
          </p>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-4xl mx-auto aspect-[4/5] md:aspect-[16/10] bg-muted overflow-hidden rounded-2xl cursor-none shadow-2xl"
        >
          {/* Base Image (Before) */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale opacity-80"
            style={{ backgroundImage: `url('/portfolio-4.png')` }}
          />

          {/* Reveal Image (After) */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('/portfolio-4.png')`,
              // This creates the spotlight hole using the spring coordinates
              clipPath: isHovered 
                ? `circle(150px at ${springX.get()}px ${springY.get()}px)`
                : `circle(0px at 50% 50%)`,
              WebkitClipPath: isHovered 
                ? `circle(150px at ${springX.get()}px ${springY.get()}px)`
                : `circle(0px at 50% 50%)`,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          />

          {/* Custom Cursor Ring */}
          <motion.div
            className="absolute pointer-events-none rounded-full border-2 border-primary/50 flex items-center justify-center bg-primary/10 backdrop-blur-[2px]"
            style={{
              width: 300,
              height: 300,
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              opacity: isHovered ? 1 : 0
            }}
          >
            <div className="text-primary font-heading tracking-widest uppercase text-xs drop-shadow-md bg-background/50 px-3 py-1 rounded-full backdrop-blur-md">
              Reveal
            </div>
          </motion.div>

          {/* Instructions Overlay (disappears on hover) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-background/80 backdrop-blur-md px-8 py-4 rounded-full border border-primary/30 text-foreground font-semibold tracking-widest uppercase text-xs shadow-2xl">
              Hover to unveil the magic
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
