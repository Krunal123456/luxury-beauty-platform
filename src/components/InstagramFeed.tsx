"use client";

import { motion } from "framer-motion";
import { Camera, Heart, MessageCircle } from "lucide-react";

export function InstagramFeed() {
  const posts = [
    { id: 1, img: "/portfolio-1.png", likes: "1.2k", comments: "48" },
    { id: 2, img: "/portfolio-2.png", likes: "892", comments: "34" },
    { id: 3, img: "/portfolio-3.png", likes: "2.4k", comments: "102" },
    { id: 4, img: "/portfolio-4.png", likes: "1.5k", comments: "67" },
    { id: 5, img: "/portfolio-5.png", likes: "3.1k", comments: "156" },
    { id: 6, img: "/portfolio-6.png", likes: "954", comments: "42" },
  ];

  return (
    <section className="py-24 bg-card border-t border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-primary tracking-[0.3em] uppercase text-xs font-semibold">Social</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4 mb-4 text-foreground">
              Follow the <span className="text-primary italic">Journey</span>
            </h2>
            <p className="text-muted-foreground">@purva_makeover10 on Instagram</p>
          </div>
          <a 
            href="https://www.instagram.com/purva_makeover10/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors tracking-widest uppercase text-xs font-semibold mt-6 md:mt-0"
          >
            <Camera className="w-4 h-4" />
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 max-w-6xl mx-auto">
          {posts.map((post, i) => (
            <motion.a
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square group overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${post.img})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-[2px]">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Heart className="w-6 h-6 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <MessageCircle className="w-6 h-6 fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
