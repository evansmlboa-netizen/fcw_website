import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSiteConfig } from "@/lib/siteConfig";

const allNavLinks = [
  { label: "Home", href: "/", key: "home" as const },
  { label: "Impact", href: "/impact", key: "impact" as const },
  { label: "Donate", href: "/donate", key: "donate" as const },
  { label: "Stories", href: "/stories", key: "stories" as const },
  { label: "About", href: "/about", key: "about" as const },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { config } = useSiteConfig();
  const b = config.branding;

  const navLinks = allNavLinks.filter((l) => config.pages[l.key]);

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary" aria-label={`${b.siteName} Home`}>
          {b.logoUrl ? (
            <img src={b.logoUrl} alt={b.siteName} className="h-8 w-auto object-contain" />
          ) : (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              {b.siteName.charAt(0)}
            </span>
          )}
          {!b.logoUrl && b.siteName}
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                location.pathname === l.href
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {config.pages.donate && (
          <Link
            to="/donate"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:brightness-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Donate Monthly
          </Link>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
        <nav
          className="relative ml-auto w-64 h-full bg-card border-l border-border shadow-lg flex flex-col p-6 gap-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                location.pathname === l.href
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {config.pages.donate && (
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 text-center px-5 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold shadow-[var(--shadow-soft)] hover:brightness-110 transition-all duration-300"
            >
              Donate Monthly
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
