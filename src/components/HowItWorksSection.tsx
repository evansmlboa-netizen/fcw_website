import { Heart, Truck, UtensilsCrossed, Handshake, Globe, Users } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  truck: Truck,
  utensils: UtensilsCrossed,
  handshake: Handshake,
  globe: Globe,
  users: Users,
};

const stepColors = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-accent text-accent-foreground",
];

const HowItWorksSection = () => {
  const { config } = useSiteConfig();
  const hw = config.howItWorks;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-center text-foreground mb-4">
          {hw.title}
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          {hw.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-0.5 bg-border" />

          {hw.steps.map((step, i) => {
            const Icon = iconMap[step.icon] || Heart;
            const color = stepColors[i % stepColors.length];
            return (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;