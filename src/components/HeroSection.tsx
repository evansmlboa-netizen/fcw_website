import { useSiteConfig } from "@/lib/siteConfig";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { config } = useSiteConfig();
  const h = config.hero;
  const donateEnabled = config.pages.donate;
  const bgImage = h.backgroundImage || heroBg;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src={bgImage}
        alt="Volunteers distributing food to communities in need"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative z-10 container mx-auto px-6 py-20 text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-primary-foreground leading-tight mb-6 tracking-tight">
          {h.headline}
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/85 font-body mb-10 max-w-2xl mx-auto leading-relaxed">
          {h.subheadline}
        </p>
        {donateEnabled && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:brightness-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {h.ctaPrimary}
            </a>
            <a
              href="#donate"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold text-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:brightness-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {h.ctaSecondary}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
