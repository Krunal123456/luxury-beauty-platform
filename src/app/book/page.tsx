"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 container mx-auto max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-medium mb-4">Book a Consultation</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Secure your date for the ultimate luxury experience</p>
        </motion.div>

        {!submitted ? (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-6 bg-card p-8 border border-border shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
                <Input name="name" required className="bg-background border-border h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</label>
                <Input name="email" type="email" required className="bg-background border-border h-12" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</label>
                <Input name="phone" type="tel" required className="bg-background border-border h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Event Date</label>
                <Input name="date" type="date" required className="bg-background border-border h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Event Location / Venue</label>
              <Input name="location" required className="bg-background border-border h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Event Details</label>
              <Textarea name="details" rows={4} className="bg-background border-border" placeholder="Tell us about your vision..." />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg uppercase tracking-widest rounded-none mt-4">
              {loading ? "Sending..." : "Submit Request"}
            </Button>
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-card p-12 border border-border shadow-2xl"
          >
            <h2 className="font-heading text-3xl mb-4">Request Received</h2>
            <p className="text-muted-foreground mb-8">Thank you for your interest. Our concierge will be in touch with you shortly to confirm availability and discuss next steps.</p>
            <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-none border-border">Submit Another Request</Button>
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  );
}
