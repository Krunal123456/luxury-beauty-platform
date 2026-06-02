import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AnimatedCounters } from "@/components/AnimatedCounters";
import { Services } from "@/components/Services";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      <Navbar />
      <Hero />
      <AnimatedCounters />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <Footer />
    </main>
  );
}
