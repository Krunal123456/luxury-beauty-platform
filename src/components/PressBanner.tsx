"use client";

export function PressBanner() {
  const publications = [
    "VOGUE INDIA",
    "HARPER'S BAZAAR",
    "WEDMEGOOD",
    "ELLE",
    "FEMINA",
    "THE WEDDING BRIGADE",
    "SHAADISAGA"
  ];

  return (
    <div className="py-12 bg-background border-y border-border overflow-hidden flex flex-col items-center">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-6">
        Trusted By & Featured In
      </p>
      
      <div className="w-full relative flex items-center">
        {/* Left/Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Track */}
        <div className="flex w-full overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center">
            {publications.map((pub, i) => (
              <div 
                key={`pub1-${i}`} 
                className="mx-12 font-heading text-2xl md:text-3xl tracking-widest text-foreground/40 hover:text-primary transition-colors cursor-default whitespace-nowrap"
              >
                {pub}
              </div>
            ))}
          </div>
          {/* Duplicate for seamless looping */}
          <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center">
            {publications.map((pub, i) => (
              <div 
                key={`pub2-${i}`} 
                className="mx-12 font-heading text-2xl md:text-3xl tracking-widest text-foreground/40 hover:text-primary transition-colors cursor-default whitespace-nowrap"
              >
                {pub}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
