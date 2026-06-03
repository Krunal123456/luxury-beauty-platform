"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { Booking, PortfolioImage } from "@/lib/db";
import { LayoutDashboard, Image as ImageIcon, CalendarCheck, LogOut, Plus } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"bookings" | "portfolio">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [newImgUrl, setNewImgUrl] = useState("");
  const [newImgTitle, setNewImgTitle] = useState("");
  const [newImgCategory, setNewImgCategory] = useState("Bridal");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, portfolioRes] = await Promise.all([
        fetch('/api/book'),
        fetch('/api/portfolio')
      ]);
      const bookingsData = await bookingsRes.json();
      const portfolioData = await portfolioRes.json();
      
      setBookings(bookingsData.bookings || []);
      setPortfolio(portfolioData.portfolio || []);
    } catch (error) {
      console.error("Failed to load admin data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImgUrl || !newImgTitle) return;

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newImgUrl, title: newImgTitle, category: newImgCategory })
      });
      if (res.ok) {
        setNewImgUrl("");
        setNewImgTitle("");
        fetchData(); // Refresh data
        alert("Image added successfully!");
      }
    } catch (error) {
      console.error("Failed to add image", error);
      alert("Failed to add image.");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground tracking-widest uppercase">Loading Admin Portal...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border p-6 flex flex-col gap-8">
        <div className="font-heading text-2xl text-foreground mt-4">
          MakeMyMakeup <span className="text-primary italic">Admin</span>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "bookings" ? "bg-primary/10 text-primary font-medium border border-primary/20" : "text-muted-foreground hover:bg-muted"}`}
          >
            <CalendarCheck className="w-5 h-5" /> Booking Leads
          </button>
          <button 
            onClick={() => setActiveTab("portfolio")}
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "portfolio" ? "bg-primary/10 text-primary font-medium border border-primary/20" : "text-muted-foreground hover:bg-muted"}`}
          >
            <ImageIcon className="w-5 h-5" /> Portfolio CMS
          </button>
        </nav>

        <div className="mt-auto">
          <a href="/" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest text-xs font-semibold">
            <LogOut className="w-4 h-4" /> Back to Live Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="mb-12">
          <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Dashboard View</span>
          <h1 className="font-heading text-4xl text-foreground mt-2">
            {activeTab === "bookings" ? "Client Inquiries" : "Content Management"}
          </h1>
        </div>

        {activeTab === "bookings" && (
          <div className="bg-card border border-border shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-widest border-b border-border">
                    <th className="px-6 py-5 font-semibold">Client Name</th>
                    <th className="px-6 py-5 font-semibold">Contact</th>
                    <th className="px-6 py-5 font-semibold">Event Date</th>
                    <th className="px-6 py-5 font-semibold">Service Requested</th>
                    <th className="px-6 py-5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-5 text-foreground font-medium">{booking.name}</td>
                      <td className="px-6 py-5">
                        <a href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono text-sm">
                          {booking.phone}
                        </a>
                      </td>
                      <td className="px-6 py-5 text-muted-foreground">
                        {format(new Date(booking.date), "MMM d, yyyy")} <br/>
                        <span className="text-xs tracking-wider">{booking.time}</span>
                      </td>
                      <td className="px-6 py-5 text-foreground font-medium">{booking.service}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-bold tracking-widest uppercase">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground tracking-widest uppercase text-sm">
                        No bookings yet. They will appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="space-y-12">
            {/* Add New Image Form */}
            <div className="bg-card border border-border shadow-2xl p-8 md:p-10">
              <h2 className="font-heading text-2xl text-foreground mb-8 flex items-center gap-3">
                <Plus className="text-primary w-6 h-6" /> Add New Masterpiece
              </h2>
              <form onSubmit={handleAddImage} className="grid md:grid-cols-4 gap-6 items-end">
                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Image URL (Path)</label>
                  <input 
                    type="text" 
                    value={newImgUrl} 
                    onChange={e => setNewImgUrl(e.target.value)} 
                    placeholder="/portfolio-7.png" 
                    className="w-full bg-background border border-border px-4 py-3 h-12 focus:border-primary focus:outline-none transition-colors" 
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Title</label>
                  <input 
                    type="text" 
                    value={newImgTitle} 
                    onChange={e => setNewImgTitle(e.target.value)} 
                    placeholder="e.g. Royal Bridal Look" 
                    className="w-full bg-background border border-border px-4 py-3 h-12 focus:border-primary focus:outline-none transition-colors" 
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Category</label>
                  <select 
                    value={newImgCategory} 
                    onChange={e => setNewImgCategory(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 h-12 focus:border-primary focus:outline-none transition-colors appearance-none"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Party">Party</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                  </select>
                </div>
                <button type="submit" className="bg-primary text-primary-foreground h-12 px-6 font-semibold tracking-widest uppercase text-xs hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  Publish to Live Site
                </button>
              </form>
            </div>

            {/* Current Portfolio Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl text-foreground">Live Portfolio Feed</h2>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{portfolio.length} Images Live</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {portfolio.map(item => (
                  <div key={item.id} className="group relative aspect-[4/5] bg-muted border border-border overflow-hidden cursor-pointer">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.url})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                      <span className="text-primary text-[9px] tracking-[0.2em] uppercase font-bold mb-1">{item.category}</span>
                      <span className="text-white text-sm font-medium leading-tight">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
