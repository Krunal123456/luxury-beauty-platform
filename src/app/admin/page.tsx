"use client";

import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, DollarSign } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { title: "Total Bookings", value: "142", icon: Calendar },
    { title: "New Leads", value: "+24", icon: Users },
    { title: "Conversion Rate", value: "18.5%", icon: TrendingUp },
    { title: "Revenue (MTD)", value: "$45,200", icon: DollarSign },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-16 px-4 container mx-auto max-w-7xl">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-heading text-4xl mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">Platform Overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-card border-border rounded-sm shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-3xl font-heading font-medium">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card border-border rounded-sm shadow-xl">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-sm">
                    <div>
                      <p className="font-medium">Sarah Jenkins (Bridal)</p>
                      <p className="text-sm text-muted-foreground">Dec 12, 2026 • 250 Guests</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-widest rounded-sm font-medium">New Lead</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border rounded-sm shadow-xl">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col">
              <button className="text-left px-4 py-3 bg-background/50 border border-border/50 hover:border-primary transition-colors text-sm rounded-sm">Update Portfolio</button>
              <button className="text-left px-4 py-3 bg-background/50 border border-border/50 hover:border-primary transition-colors text-sm rounded-sm">Post to Journal</button>
              <button className="text-left px-4 py-3 bg-background/50 border border-border/50 hover:border-primary transition-colors text-sm rounded-sm">Manage SEO</button>
              <button className="text-left px-4 py-3 bg-background/50 border border-border/50 hover:border-primary transition-colors text-sm rounded-sm">Export Leads</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
