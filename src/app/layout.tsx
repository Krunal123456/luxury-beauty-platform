import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AIConcierge } from "@/components/AIConcierge";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Beauty Experience | Premium Makeup Artist",
  description: "Category-defining digital experience combining luxury fashion magazine aesthetics, premium mobile application feel, and AI Beauty Assistant.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <SmoothScroll>
          <CustomCursor />
          <WhatsAppButton />
          <AIConcierge />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
