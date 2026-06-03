"use client";

import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";

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
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl mb-2 text-foreground flex items-center justify-center md:justify-start gap-3">
              <Instagram className="w-8 h-8 text-primary" />
              <span>@makeover__by__ravina</span>
            </h2>
            <p className="text-muted-foreground">Follow us for daily bridal inspiration & transformations</p>
          </div>
          <a 
            href="https://www.instagram.com/makeover__by__ravina?igsh=MWNjMjcybmlzNnByaw==" 
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary text-primary px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 whitespace-nowrap"
          >
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 max-w-6xl mx-auto">
          {posts.map((post, i) => (
            <motion.a
              href="https://www.instagram.com/makeover__by__ravina?igsh=MWNjMjcybmlzNnByaw==" 
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
