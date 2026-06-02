"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 container mx-auto">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl w-full"
            >
              <div className="text-center mb-12">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4">Bridal Consultation Planner</h1>
                <p className="text-muted-foreground">Discover your perfect wedding day look curated by our experts.</p>
              </div>

              <div className="bg-card border border-border p-8 rounded-sm shadow-2xl relative overflow-hidden">
                {loading && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm tracking-widest uppercase animate-pulse">Curating your experience...</p>
                  </div>
                )}
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h3 className="text-xl font-heading mb-6">When is your special day?</h3>
                      <Input type="date" className="h-12 bg-background mb-8" />
                      <div className="flex justify-end">
                        <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none">
                          Next <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h3 className="text-xl font-heading mb-6">What is the venue style?</h3>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {['Palace/Heritage', 'Beach Resort', 'Luxury Hotel', 'Outdoor Garden'].map(venue => (
                          <button key={venue} onClick={handleNext} className="h-16 border border-border hover:border-primary hover:text-primary transition-colors text-sm uppercase tracking-widest">
                            {venue}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h3 className="text-xl font-heading mb-6">Describe your dress color and style</h3>
                      <Input placeholder="e.g., Crimson Red Velvet Lehenga" className="h-12 bg-background mb-8" />
                      <div className="flex justify-end">
                        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none">
                          Generate Look <Sparkles className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl w-full"
            >
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl md:text-6xl font-medium text-primary mb-4">Your Bespoke Vision</h2>
                <p className="text-muted-foreground uppercase tracking-widest text-sm">Curated exclusively for you</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-[3/4] group overflow-hidden">
                  <img 
                    src="/bridal.png" 
                    alt="Recommended Look" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-heading text-2xl">The Royal Heritage Look</p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-8 bg-card p-8 border border-border">
                  <div>
                    <h3 className="uppercase tracking-widest text-xs text-muted-foreground mb-2">Recommendation</h3>
                    <p className="text-lg">Based on your palace venue and crimson dress, we recommend a luminous, traditional HD makeup look with a classic bold lip and defined eyes to stand out against the grand architecture.</p>
                  </div>
                  
                  <div>
                    <h3 className="uppercase tracking-widest text-xs text-muted-foreground mb-2">Estimated Investment</h3>
                    <p className="text-3xl font-heading font-medium">$2,500 <span className="text-sm text-muted-foreground font-sans font-normal">/ Package</span></p>
                  </div>

                  <div className="pt-8 border-t border-border/50">
                    <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg uppercase tracking-widest rounded-none">
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}
