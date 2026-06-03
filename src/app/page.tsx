import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PressBanner } from "@/components/PressBanner";
import { AnimatedCounters } from "@/components/AnimatedCounters";
import { Services } from "@/components/Services";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Packages } from "@/components/Packages";
import { LeadMagnet } from "@/components/LeadMagnet";
import { LookFinderQuiz } from "@/components/LookFinderQuiz";
import { CinematicGallery } from "@/components/CinematicGallery";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Academy } from "@/components/Academy";
import { Testimonials } from "@/components/Testimonials";
import { BookingCalendar } from "@/components/BookingCalendar";
import { InstagramFeed } from "@/components/InstagramFeed";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      <Navbar />
      <Hero />
      <PressBanner />
      <AnimatedCounters />
      <Services />
      <BeforeAfterSlider />
      <Packages />
      <LeadMagnet />
      <LookFinderQuiz />
      <CinematicGallery />
      <FeaturedWork />
      <Academy />
      <Testimonials />
      <BookingCalendar />
      <InstagramFeed />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
