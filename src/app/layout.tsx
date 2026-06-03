import type { Metadata } from "next";
import { Playfair_Display, Lato, Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Preloader } from "@/components/Preloader";
import { PageTransition } from "@/components/PageTransition";
import { AIConsultantChat } from "@/components/AIConsultantChat";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Make My Makeup | Best Makeup Artist in Wardha",
  description: "Ranked #1 luxury bridal and celebrity makeup artist in Wardha. Specializing in HD, Airbrush, and flawless beauty transformations. Book your exclusive consultation today.",
  keywords: ["wardha makeup beauty", "best makeup artist in wardha", "bridal makeup wardha", "luxury salon wardha", "makeup studio wardha", "top makeup artist wardha"],
  openGraph: {
    title: "Make My Makeup | Best Makeup Artist in Wardha",
    description: "Ranked #1 luxury bridal and celebrity makeup artist in Wardha. Specializing in HD, Airbrush, and flawless beauty transformations.",
    url: "https://luxury-beauty-platform.vercel.app", // User should update with their real domain
    siteName: "Make My Makeup",
    images: [
      {
        url: "https://luxury-beauty-platform.vercel.app/bridal.png",
        width: 1200,
        height: 630,
        alt: "Luxury Bridal Makeup in Wardha",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Make My Makeup | Best Makeup Artist in Wardha",
    description: "Ranked #1 luxury bridal and celebrity makeup artist in Wardha.",
    images: ["https://luxury-beauty-platform.vercel.app/bridal.png"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Make My Makeup",
  "image": "https://luxury-beauty-platform.vercel.app/bridal.png",
  "description": "Ranked #1 luxury bridal and celebrity makeup artist in Wardha. Specializing in HD, Airbrush, and flawless beauty transformations.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Wardha",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 20.7453,
    "longitude": 78.6022
  },
  "url": "https://luxury-beauty-platform.vercel.app",
  "telephone": "+918857075984",
  "priceRange": "$$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${lato.variable} ${montserrat.variable} ${cinzel.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Preloader />
            <SmoothScroll>
              <CustomCursor />
              <WhatsAppButton />
              <AIConsultantChat />
              <PageTransition>
                {children}
              </PageTransition>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
