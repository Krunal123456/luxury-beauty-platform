"use client";

import { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const videos = [
  "https://cdn.pixabay.com/video/2021/08/10/84478-587265910_large.mp4",
  "https://cdn.pixabay.com/video/2021/08/10/84478-587265910_large.mp4",
  "https://cdn.pixabay.com/video/2021/08/10/84478-587265910_large.mp4"
];

export default function VideosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  return (
    <main className="h-screen w-full bg-black overflow-hidden relative">
      <Navbar />
      
      {/* Vertical Video Feed */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((src, i) => (
          <div key={i} className="h-screen w-full snap-start snap-always relative flex justify-center bg-black">
            <video
              src={src}
              className="h-full max-w-lg w-full object-cover"
              autoPlay={i === 0}
              loop
              muted={muted}
              playsInline
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 max-w-lg mx-auto bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none">
              <div className="absolute bottom-20 left-4 right-16">
                <h2 className="text-white font-heading text-2xl mb-2 shadow-sm">Bridal Masterclass Behind The Scenes</h2>
                <p className="text-white/80 text-sm line-clamp-2 shadow-sm">
                  Watch how we prepare the skin for a flawless 16-hour wear bridal look. #BridalMakeup #LuxuryBeauty
                </p>
              </div>
            </div>

            {/* Controls sidebar */}
            <div className="absolute bottom-20 right-4 max-w-lg mx-auto w-full flex justify-end px-4 pointer-events-none">
              <div className="pointer-events-auto flex flex-col gap-6 items-center">
                <button 
                  onClick={() => setMuted(!muted)}
                  className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
