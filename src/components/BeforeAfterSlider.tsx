"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent | MouseEvent).clientX;
    
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    handleDrag(e);
    if ('touches' in e) {
      // Touch events are handled by onTouchMove natively on the div
    } else {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', handleDrag);
      }, { once: true });
    }
  };

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">The Magic</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Artistry in <span className="italic text-primary">Motion</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Drag the slider to see the transformative power of luxury bridal makeup. We enhance your natural beauty while keeping you looking flawlessly like yourself.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto relative select-none rounded-xl overflow-hidden shadow-2xl border border-primary/20 aspect-square md:aspect-video"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchMove={handleDrag}
          onTouchStart={handleMouseDown}
        >
          {/* Background Image (Before) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/before.png")' }}
          >
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase shadow-lg">
              Before
            </div>
          </div>

          {/* Foreground Image (After) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("/after.png")',
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
          >
            <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-md text-primary-foreground px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              After (Bridal Glam)
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
