import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Shield, Lock, CheckCircle } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

const presets = [5, 10, 20];

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  const { config } = useSiteConfig();
  const f = config.footer;
  const donateEnabled = config.pages.donate;
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);

  const navColumns = [
    { title: "About", links: [{ label: "Mission", href: "/about" }, { label: "Team", href: "/about" }, { label: "Partners", href: "/about" }] },
    { title: "Impact", links: [{ label: "Metrics", href: "/impact" }, { label: "Stories", href: "/stories" }] },
    ...(donateEnabled
      ? [{ title: "Support", links: [{ label: "Donate", href: "/donate" }, { label: "Volunteer", href: "/about" }, { label: "Contact", href: "/about" }] }]
      : [{ title: "Support", links: [{ label: "Volunteer", href: "/about" }, { label: "Contact", href: "/about" }] }]),
  ];

  const handleQuickDonate = async () => {
    if (!email || !email.includes("@")) { toast.error("Please enter a valid email."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/donate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, amount, recurring: true }) });
      if (!res.ok) throw new Error();
      toast.success("Thank you! You'll receive a confirmation email.");
      setEmail("");
    } catch { toast.error("Not connected yet — thank you for your intent!"); }
    finally { setLoading(false); }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Quick donate banner - only when donate enabled */}
      {donateEnabled && (
        <div className="bg-primary">
          <div className="container mx-auto px-6 py-10 sm:py-12 max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                  <span className="font-display text-xl font-bold text-primary-foreground">Every $1 = 1 Meal</span>
                </div>
                <p className="text-primary-foreground/80 text-sm">Start a monthly gift in seconds.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="inline-flex bg-primary-foreground/15 rounded-lg p-0.5">
                  {presets.map((val) => (
                    <button key={val} onClick={() => setAmount(val)}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${amount === val ? "bg-primary-foreground text-primary" : "text-primary-foreground/80 hover:text-primary-foreground"}`}>
                      ${val}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <label htmlFor="footer-email" className="sr-only">Email</label>
                  <input id="footer-email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2.5 rounded-lg bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/40 flex-1 min-w-0" />
                  <button onClick={handleQuickDonate} disabled={loading}
                    className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-60 whitespace-nowrap">
                    {loading ? "..." : "Give Monthly"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-12 sm:py-16 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 font-display text-xl font-bold text-background mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-bold">F</span>
              FCW
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-6 max-w-xs">{f.tagline}</p>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${f.email}`} className="flex items-center gap-2 text-background/60 hover:text-background transition-colors">
                <Mail className="w-4 h-4" /> {f.email}
              </a>
              <a href={`tel:${f.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-background/60 hover:text-background transition-colors">
                <Phone className="w-4 h-4" /> {f.phone}
              </a>
              <p className="flex items-center gap-2 text-background/60">
                <MapPin className="w-4 h-4 flex-shrink-0" /> {f.address}
              </p>
            </div>
          </div>

          {navColumns.map((col) => (
            <nav key={col.title} aria-label={`${col.title} links`}>
              <h3 className="font-display font-bold text-background text-sm mb-4 uppercase tracking-wider">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-background/60 hover:text-background text-sm transition-colors duration-200">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1.5 text-background/50 text-xs"><Shield className="w-4 h-4" /> SSL Encrypted</div>
              <div className="flex items-center gap-1.5 text-background/50 text-xs"><Lock className="w-4 h-4" /> PCI Compliant</div>
              <div className="flex items-center gap-1.5 text-background/50 text-xs"><CheckCircle className="w-4 h-4" /> 501(c)(3) Verified</div>
            </div>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center text-background/60 hover:text-background hover:bg-background/20 transition-all duration-200">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <p className="mt-6 text-background/40 text-xs text-center md:text-left leading-relaxed max-w-2xl">
            FCW is committed to radical transparency and delivering measurable impact. We publish quarterly audited reports so you always know where your money goes.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/40">
          <p>{f.copyrightText || "© 2026 FCW — Feeding Communities Worldwide. All Rights Reserved."}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
