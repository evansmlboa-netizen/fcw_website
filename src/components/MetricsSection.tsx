import { Heart, Users, Globe } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

const iconMap: Record<string, typeof Heart> = {
  "Meals Served": Heart,
  "Beneficiaries": Users,
  "Active Projects": Globe,
};
const colorMap: Record<string, string> = {
  "Meals Served": "text-secondary",
  "Beneficiaries": "text-primary",
  "Active Projects": "text-accent-foreground",
};

const MetricsSection = () => {
  const { config } = useSiteConfig();
  const hm = config.homeMetrics;
  const donateEnabled = config.pages.donate;

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-center text-foreground mb-4">
          {hm.title}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          {hm.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {hm.metrics.map((m, i) => {
            const Icon = iconMap[m.label] || [Heart, Users, Globe][i % 3];
            const color = colorMap[m.label] || ["text-secondary", "text-primary", "text-accent-foreground"][i % 3];
            return (
              <div
                key={m.label + i}
                className="bg-card rounded-xl p-8 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300"
              >
                <Icon className={`w-8 h-8 mx-auto mb-4 ${color}`} />
                <p className="text-3xl font-bold text-foreground mb-1">{m.value}</p>
                <p className="text-muted-foreground text-sm font-medium">{m.label}</p>
              </div>
            );
          })}
        </div>

        {donateEnabled && (
          <div className="flex flex-wrap justify-center gap-4">
            {hm.mappings.map((m, i) => (
              <div
                key={i}
                className="bg-accent rounded-lg px-6 py-3 text-center"
              >
                <span className="font-bold text-accent-foreground">{m.amount}</span>
                <span className="text-muted-foreground mx-2">=</span>
                <span className="font-medium text-foreground">{m.meals}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MetricsSection;
