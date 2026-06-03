import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PressBanner } from "@/components/PressBanner";
import { AnimatedCounters } from "@/components/AnimatedCounters";
import { MagicMirrorReveal } from "@/components/MagicMirrorReveal";
import { Services } from "@/components/Services";
import { Packages } from "@/components/Packages";
import { LeadMagnet } from "@/components/LeadMagnet";
import { LookFinderQuiz } from "@/components/LookFinderQuiz";
import { CinematicGallery } from "@/components/CinematicGallery";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Academy } from "@/components/Academy";
import { AdvancedReviews } from "@/components/AdvancedReviews";
import { BookingCalendar } from "@/components/BookingCalendar";
import { InstagramFeed } from "@/components/InstagramFeed";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden bg-background">
      <Navbar />
      <Hero />
      <PressBanner />
      <AnimatedCounters />
      <MagicMirrorReveal />
      <Services />
      <Packages />
      <LeadMagnet />
      <LookFinderQuiz />
      <CinematicGallery />
      <FeaturedWork />
      <Academy />
      <AdvancedReviews />
      <BookingCalendar />
      <InstagramFeed />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
