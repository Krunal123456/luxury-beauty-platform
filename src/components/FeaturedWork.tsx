"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X } from "lucide-react";
import type { PortfolioImage } from "@/lib/db";

export function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        if (data.portfolio) {
          setPortfolioItems(data.portfolio);
        }
      } catch (error) {
        console.error("Failed to load portfolio", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const categories = ["All", "Bridal", "Party", "Pre-Wedding"];

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-card" id="portfolio">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Masterpieces</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Featured <span className="italic text-primary">Work</span>
          </motion.h2>
        </div>

        {/* Filter Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-sm tracking-widest uppercase pb-2 border-b-2 transition-all ${
                activeCategory === category 
                  ? "border-primary text-primary font-semibold" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground tracking-widest uppercase">
            Loading Portfolio...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 max-w-6xl mx-auto perspective-1000">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`portfolio-${item.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 50 }}
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-background rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-500"
                onClick={() => setSelectedImage(item)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${item.url})` }}
                  whileHover={{ scale: 1.15 }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" style={{ transform: "translateZ(30px)" }}>
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between">
                    <div>
                      <span className="text-primary text-[10px] tracking-widest uppercase font-bold mb-2 block drop-shadow-md">
                        {item.category}
                      </span>
                      <h3 className="text-white font-heading text-2xl drop-shadow-lg">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[3/4] md:aspect-[16/9]"
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12">
                <span className="text-primary text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold mb-2 block">{selectedImage.category}</span>
                <h3 className="text-white text-2xl md:text-4xl font-heading">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
