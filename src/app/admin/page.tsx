"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { Booking, PortfolioImage, Review } from "@/lib/db";
import { LayoutDashboard, Image as ImageIcon, CalendarCheck, LogOut, Plus, Star, CheckCircle, Trash2, MessageSquareQuote } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"bookings" | "portfolio" | "reviews">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioImage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
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
      const [bookingsRes, portfolioRes, reviewsRes] = await Promise.all([
        fetch('/api/book'),
        fetch('/api/portfolio'),
        fetch('/api/reviews')
      ]);
      const bookingsData = await bookingsRes.json();
      const portfolioData = await portfolioRes.json();
      const reviewsData = await reviewsRes.json();
      
      setBookings(bookingsData.bookings || []);
      setPortfolio(portfolioData.portfolio || []);
      setReviews(reviewsData.reviews || []);
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

  const handleReviewAction = async (id: string, action: 'approve' | 'delete') => {
    try {
      const body = action === 'approve' 
        ? { id, status: 'approved' }
        : { id, action: 'delete' };

      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update review", error);
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
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center justify-between px-4 py-3 rounded-md transition-colors ${activeTab === "reviews" ? "bg-primary/10 text-primary font-medium border border-primary/20" : "text-muted-foreground hover:bg-muted"}`}
          >
            <div className="flex items-center gap-3">
              <MessageSquareQuote className="w-5 h-5" /> Reviews
            </div>
            {reviews.filter(r => r.status === 'pending').length > 0 && (
              <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
                {reviews.filter(r => r.status === 'pending').length}
              </span>
            )}
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
            {activeTab === "bookings" && "Client Inquiries"}
            {activeTab === "portfolio" && "Content Management"}
            {activeTab === "reviews" && "Review Moderation"}
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

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {reviews.length === 0 && (
                <div className="text-center py-12 text-muted-foreground uppercase tracking-widest text-sm border border-dashed border-border rounded-xl">
                  No reviews submitted yet.
                </div>
              )}
              {reviews.map(review => (
                <div key={review.id} className={`p-6 border rounded-xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center ${review.status === 'pending' ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'}`}>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-xl text-foreground">{review.name}</h3>
                      {review.status === 'pending' ? (
                        <span className="text-[10px] bg-yellow-500/20 text-yellow-500 uppercase tracking-widest px-2 py-1 font-bold rounded">Needs Approval</span>
                      ) : (
                        <span className="text-[10px] bg-green-500/20 text-green-500 uppercase tracking-widest px-2 py-1 font-bold rounded">Live on Site</span>
                      )}
                    </div>
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-primary' : 'opacity-30'}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic text-sm border-l-2 border-primary/30 pl-4">{review.text}</p>
                    <div className="text-xs text-muted-foreground/60">{format(new Date(review.createdAt), "MMM d, yyyy")}</div>
                  </div>
                  
                  <div className="flex gap-3 shrink-0">
                    {review.status === 'pending' && (
                      <button 
                        onClick={() => handleReviewAction(review.id, 'approve')}
                        className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded transition-colors text-xs font-bold uppercase tracking-widest"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                    )}
                    <button 
                      onClick={() => handleReviewAction(review.id, 'delete')}
                      className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
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
