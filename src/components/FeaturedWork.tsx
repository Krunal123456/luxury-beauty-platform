"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const works = [
  { id: 1, title: "The Royal Wedding", category: "Bridal", img: "/bridal.jpg" },
  { id: 2, title: "Vogue Summer '26", category: "Editorial", img: "/fashion.jpg" },
  { id: 3, title: "Cannes Red Carpet", category: "Celebrity", img: "/celebrity.jpg" },
];

export function FeaturedWork() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-5xl mb-4"
            >
              Featured Masterpieces
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground uppercase tracking-widest text-sm"
            >
              A glimpse into our portfolio
            </motion.p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" className="border-border text-foreground hover:bg-white/5 rounded-none tracking-widest uppercase text-xs h-12 px-6 group">
              View All Work <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white tracking-widest uppercase text-sm font-medium border border-white/50 px-6 py-2">
                    Explore
                  </span>
                </div>
              </div>
              <p className="text-primary tracking-widest uppercase text-xs font-semibold mb-2">{work.category}</p>
              <h3 className="font-heading text-2xl group-hover:text-primary transition-colors">{work.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
