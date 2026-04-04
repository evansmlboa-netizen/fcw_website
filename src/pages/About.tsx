import { Heart, Globe, Eye, Users, Handshake } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

const values = [
  {
    icon: Heart,
    title: "Radical Generosity",
    description: "We believe every person deserves a meal. No exceptions, no conditions.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Every donation is tracked end-to-end. Our finances are audited and published quarterly.",
  },
  {
    icon: Globe,
    title: "Local-First Delivery",
    description: "We partner with community organizations who know their neighborhoods best.",
  },
  {
    icon: Handshake,
    title: "Dignity Always",
    description: "We serve with respect — providing choice, quality, and cultural sensitivity in every meal.",
  },
];

const About = () => {
  const { config } = useSiteConfig();
  const a = config.about;

  return (
    <main className="min-h-screen bg-background">
      {/* Mission hero */}
      <section className="bg-primary py-16 sm:py-24 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-primary-foreground mb-6 leading-tight">
            {a.missionTitle}
          </h1>
          <p className="text-primary-foreground/85 text-lg sm:text-xl font-body leading-relaxed max-w-2xl mx-auto">
            {a.missionDescription}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground text-center mb-4">
            {a.valuesTitle}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Our impact philosophy guides every decision we make.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl border border-border p-6 shadow-[var(--shadow-card)]">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Our Team</h2>
          </div>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Dedicated professionals united by a mission to end hunger.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.team.map((member) => (
              <div key={member.name} className="bg-card rounded-xl border border-border p-6 text-center shadow-[var(--shadow-card)]">
                <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center" aria-hidden="true">
                  <span className="text-primary-foreground font-display font-bold text-xl">{member.initials}</span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">Our Partners</h2>
          <p className="text-muted-foreground mb-12 max-w-lg mx-auto">
            We work alongside the world's leading hunger-relief organizations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {a.partners.map((name) => (
              <div key={name} className="bg-card border border-border rounded-lg py-5 px-4 flex items-center justify-center shadow-[var(--shadow-card)]">
                <span className="text-foreground font-semibold text-sm text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency CTA */}
      <section className="py-16 sm:py-20 bg-accent">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <Eye className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">100% Transparent</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We publish quarterly impact reports, independently audited financials, and real-time meal counters. You always know exactly where your money goes.
          </p>
          <a
            href="/donate"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:brightness-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start Giving
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
