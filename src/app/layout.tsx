import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit, Great_Vibes } from "next/font/google";
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

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-signature",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MakeMyMakeup | Premium Beauty Experience",
  description: "Category-defining digital experience combining luxury aesthetics and bespoke beauty services.",
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
      className={`${playfair.variable} ${outfit.variable} ${greatVibes.variable} h-full antialiased dark`}
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
