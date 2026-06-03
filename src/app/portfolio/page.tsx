"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { PortfolioImage } from "@/lib/db";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Dynamically extract unique categories from the database items
  const uniqueCategories = ["All", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const filteredImages = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 container mx-auto flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight mb-4">Portfolio</h1>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">Our Masterpieces</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-transparent border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24 text-muted-foreground tracking-widest uppercase">
            Loading Masterpieces...
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="relative overflow-hidden group cursor-pointer w-full rounded-sm"
                onClick={() => setSelectedImage(img.url)}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white font-heading text-xl mb-2 text-center drop-shadow-md">{img.title}</h3>
                  <Badge variant="outline" className="bg-background/80 text-foreground border-none tracking-widest uppercase">
                    {img.category}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-transparent border-none">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Fullscreen" 
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </main>
  );
}
