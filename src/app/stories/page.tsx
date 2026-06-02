"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight mb-4">Transformations</h1>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">Real Brides, Real Stories</p>
        </motion.div>

        <div className="space-y-32">
          {/* Story 1 */}
          <section className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <span className="text-primary tracking-widest uppercase text-xs font-semibold">The Royal Bride</span>
              <h2 className="font-heading text-4xl md:text-5xl leading-tight">A Vision in Crimson and Gold</h2>
              <p className="text-muted-foreground leading-relaxed">
                For this royal heritage wedding, we focused on enhancing her natural features while keeping the tradition alive. The base was kept luminous and skin-like, with a sharp winged liner and a classic crimson lip that matched her intricate lehenga.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">3 Hours</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Style</p>
                  <p className="font-medium">Traditional HD</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-[4/5] group overflow-hidden">
              <img 
                src="/bridal.png" 
                alt="Transformation Story"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </section>

          {/* Story 2 (Reverse) */}
          <section className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <span className="text-primary tracking-widest uppercase text-xs font-semibold">The Modern Muse</span>
              <h2 className="font-heading text-4xl md:text-5xl leading-tight">Glass Skin & Soft Glam</h2>
              <p className="text-muted-foreground leading-relaxed">
                A contemporary look designed for a sundowner cocktail event. The focus was entirely on skin preparation to achieve the coveted 'glass skin' effect. Paired with fluffy brows, glossy lips, and a subtle champagne shimmer on the lids.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">2 Hours</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Style</p>
                  <p className="font-medium">Airbrush Contemporary</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-[4/5] group overflow-hidden">
              <img 
                src="/fashion.png" 
                alt="Transformation Story"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
