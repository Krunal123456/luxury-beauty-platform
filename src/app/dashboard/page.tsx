"use client";

import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Upload, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-16 px-4 container mx-auto max-w-5xl">
        <div className="mb-12">
          <h1 className="font-heading text-4xl mb-2">Welcome, Sophia</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">Your Booking Dashboard</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card border-border rounded-sm md:col-span-2 shadow-xl">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Upcoming Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-background/50 border border-border/50 rounded-sm">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-1">Bridal HD Makeup</p>
                <p className="text-3xl font-heading mb-4">Oct 15, 2026</p>
                <p className="text-muted-foreground mb-6">The Grand Palace Hotel, Mumbai • 06:00 AM</p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none w-full sm:w-auto">
                  View Full Itinerary
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card border-border rounded-sm shadow-xl">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <Upload className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-heading text-lg mb-1">Inspiration Board</h3>
                  <p className="text-xs text-muted-foreground">Upload reference looks for your consultation</p>
                </div>
                <Button variant="outline" className="w-full rounded-none border-border">Upload Photos</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-sm shadow-xl">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <MessageSquare className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-heading text-lg mb-1">Artist Chat</h3>
                  <p className="text-xs text-muted-foreground">Direct line to your artist</p>
                </div>
                <Button variant="outline" className="w-full rounded-none border-border">Open Chat</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
