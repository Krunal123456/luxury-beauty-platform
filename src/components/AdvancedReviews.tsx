"use client";

import { useEffect, useState } from "react";
import { Star, CheckCircle, Quote, StarHalf, X } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

export const AdvancedReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newText, setNewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews?status=approved");
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRating || !newText) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, rating: newRating, text: newText })
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(false);
          setNewName("");
          setNewRating(0);
          setNewText("");
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "5.0";
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
  }));

  // Duplicate reviews for infinite scroll if we don't have enough to fill the screen
  const scrollingReviews = [...reviews, ...reviews, ...reviews].slice(0, Math.max(reviews.length * 3, 10));

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary tracking-[0.3em] uppercase text-xs font-semibold">Client Love</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            Real Experiences, <span className="text-primary italic">Flawless Results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what our beautiful brides and clients have to say about their luxury makeup experience.
          </p>
        </div>

        {/* Rating Overview Panel */}
        <div className="flex flex-col lg:flex-row bg-card border border-border shadow-2xl rounded-2xl overflow-hidden mb-20 backdrop-blur-sm">
          
          {/* Big Score */}
          <div className="lg:w-1/3 bg-primary/5 p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-border">
            <div className="font-heading text-7xl text-foreground mb-2">{avgRating}</div>
            <div className="flex gap-1 text-primary mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < Math.floor(Number(avgRating)) ? 'fill-primary' : 'opacity-30'}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">{reviews.length} Verified Reviews</p>
          </div>

          {/* Progress Bars */}
          <div className="lg:w-1/3 p-10 flex flex-col justify-center gap-3 border-b lg:border-b-0 lg:border-r border-border">
            {ratingCounts.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-12 text-sm text-muted-foreground font-medium">
                  {star} <Star className="w-3 h-3 fill-muted-foreground" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-8 text-right text-sm text-muted-foreground">{count}</div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="lg:w-1/3 p-10 flex flex-col items-center justify-center text-center">
            <h3 className="font-heading text-2xl text-foreground mb-4">Share Your Magic</h3>
            <p className="text-muted-foreground text-sm mb-8">
              We'd love to hear about your experience. Your feedback helps us continue providing luxury service.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Infinite Scrolling Marquee */}
        {reviews.length > 0 && (
          <div className="relative flex overflow-hidden group">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex animate-marquee group-hover:[animation-play-state:paused] gap-6 px-3">
              {scrollingReviews.map((review, i) => (
                <div 
                  key={`${review.id}-${i}`} 
                  className="w-[350px] shrink-0 bg-card border border-border p-8 rounded-2xl relative transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
                  <div className="flex gap-1 text-primary mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-primary' : 'opacity-20'}`} />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-8 italic">"{review.text}"</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-heading text-lg text-primary">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{review.name}</h4>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Verified Client • {format(new Date(review.createdAt), "MMM yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-card w-full max-w-lg border border-border rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            {submitSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading text-3xl text-foreground mb-4">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your review has been submitted successfully. It will appear on the site once approved by our team.
                </p>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-border flex justify-between items-center">
                  <h3 className="font-heading text-2xl text-foreground">Write a Review</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 block">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setNewRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-8 h-8 ${
                              star <= (hoverRating || newRating) 
                                ? 'fill-primary text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]' 
                                : 'text-muted-foreground opacity-30'
                            } transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 block">Your Name</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 block">Your Experience</label>
                    <textarea 
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      required
                      placeholder="Tell us about your makeup look and experience..."
                      className="w-full bg-background border border-border px-4 py-3 h-32 resize-none focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !newRating}
                    className="w-full bg-primary text-primary-foreground h-14 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
