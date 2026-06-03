import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="font-[family-name:var(--font-signature)] text-4xl text-foreground inline-block mb-6">
              Purva Makeover
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              World-class luxury makeup experiences crafted with precision for brides, celebrities, and editorials globally.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-muted-foreground tracking-widest uppercase">
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/stories" className="hover:text-primary transition-colors">Stories</Link></li>
              <li><Link href="/videos" className="hover:text-primary transition-colors">Masterclasses</Link></li>
              <li><Link href="/journal" className="hover:text-primary transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground tracking-widest uppercase">
              <li>Bridal Makeup</li>
              <li>Destination Weddings</li>
              <li>Editorial & Fashion</li>
              <li>Celebrity Glam</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Arvi Naka, Wardha</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> purvadhongadr.1234@gmail.com</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +91 88570 75984</li>
            </ul>
            <div className="flex gap-4 mt-8">
              <a href="https://www.instagram.com/purva_makeover10/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-border/50 text-center text-xs tracking-widest uppercase text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 PURVA MAKEOVER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
