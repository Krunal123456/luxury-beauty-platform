"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const reels = [
  { 
    id: 1, 
    img: "/portfolio-2.png", 
    title: "Punjabi Bride Glam", 
    duration: "0:15",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
  },
  { 
    id: 2, 
    img: "/portfolio-4.png", 
    title: "Haldi Glow Masterclass", 
    duration: "0:30",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" 
  },
  { 
    id: 3, 
    img: "/portfolio-5.png", 
    title: "Classic Red Perfection", 
    duration: "0:45",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" 
  },
];

export function CinematicGallery() {
  return (
    <section className="py-24 bg-card border-t border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Motion</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Cinematic <span className="italic text-primary">Moments</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Experience the magic in motion. Watch our brides come to life as we capture the final breathtaking look under studio lighting.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reels.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-lg shadow-2xl border border-primary/20 bg-black">
                {/* Fallback Static Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-linear group-hover:scale-125"
                  style={{ backgroundImage: `url(${reel.img})` }}
                />

                {/* Cinematic HTML5 Video (Plays on Hover) */}
                <video 
                  src={reel.videoUrl}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
                
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-16 h-16 rounded-full border-2 border-primary text-primary flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                    <Play className="w-6 h-6 fill-primary" />
                  </div>
                </div>

                {/* Video Info Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <h3 className="text-white font-heading text-xl truncate pr-4">{reel.title}</h3>
                  <div className="text-white/80 text-xs font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                    {reel.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
