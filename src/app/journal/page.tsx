import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function JournalPage() {
  const articles = [
    { title: "The 2026 Bridal Guide: Glass Skin Secrets", category: "Bridal Trends", date: "June 2026", img: "/bridal.png" },
    { title: "Behind the Scenes: Vogue Editorial", category: "Fashion Insights", date: "May 2026", img: "/fashion.png" },
    { title: "Mastering the Red Carpet Look", category: "Celebrity Looks", date: "April 2026", img: "/celebrity.png" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-16 px-4 container mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight mb-4">Beauty Journal</h1>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">Insights, Trends & Masterclasses</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[4/3] rounded-sm relative">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-primary text-xs tracking-widest uppercase font-semibold">{article.category}</span>
                <span className="text-muted-foreground text-xs uppercase tracking-widest">{article.date}</span>
              </div>
              <h2 className="font-heading text-2xl group-hover:text-primary transition-colors">{article.title}</h2>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
