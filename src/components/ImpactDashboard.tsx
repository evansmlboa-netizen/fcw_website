import { useEffect, useState } from "react";
import { Heart, Users, FolderCheck, TrendingUp } from "lucide-react";
import storyImg from "@/assets/hero-bg.jpg";

interface MetricData {
  mealsServed: number;
  beneficiaries: number;
  projectsCompleted: number;
  impactMapping: { amount: number; meals: number }[];
}

interface Story {
  image: string;
  title: string;
  snippet: string;
}

const fallbackMetrics: MetricData = {
  mealsServed: 2_400_000,
  beneficiaries: 180_000,
  projectsCompleted: 42,
  impactMapping: [
    { amount: 1, meals: 1 },
    { amount: 5, meals: 5 },
    { amount: 20, meals: 20 },
    { amount: 100, meals: 100 },
  ],
};

const fallbackStories: Story[] = [
  {
    image: storyImg,
    title: "Clean water & meals in rural Kenya",
    snippet:
      "Thanks to donor support, FCW delivered over 12,000 meals and installed two clean water stations serving 3 villages.",
  },
  {
    image: storyImg,
    title: "Winter relief in Eastern Europe",
    snippet:
      "Our winter programme provided warm meals and emergency supplies to 4,500 displaced families across three countries.",
  },
];

const fmt = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(0)}K`
    : String(n);

const metricCards = (d: MetricData) => [
  { icon: Heart, label: "Meals Served", value: fmt(d.mealsServed), accent: "text-secondary" },
  { icon: Users, label: "Beneficiaries", value: fmt(d.beneficiaries), accent: "text-primary" },
  { icon: FolderCheck, label: "Projects Completed", value: String(d.projectsCompleted), accent: "text-accent-foreground" },
  { icon: TrendingUp, label: "Avg. Meals / Dollar", value: "1:1", accent: "text-primary" },
];

const ImpactDashboard = () => {
  const [metrics, setMetrics] = useState<MetricData>(fallbackMetrics);
  const [stories] = useState<Story[]>(fallbackStories);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/metrics");
        if (!res.ok) throw new Error();
        const data: MetricData = await res.json();
        setMetrics(data);
      } catch {
        /* keep fallback */
      }
    };
    load();
  }, []);

  const cards = metricCards(metrics);

  return (
    <section className="py-20 bg-background" aria-labelledby="impact-heading">
      <div className="container mx-auto px-6">
        {/* ── Header ── */}
        <h2
          id="impact-heading"
          className="text-3xl sm:text-4xl font-display font-bold text-center text-foreground mb-2"
        >
          Impact Dashboard
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Real-time snapshot of how your contributions are changing lives.
        </p>

        {/* ── Metric Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10">
          {cards.map((c) => (
            <div
              key={c.label}
              className="bg-card rounded-xl p-6 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300"
            >
              <c.icon className={`w-7 h-7 mx-auto mb-3 ${c.accent}`} aria-hidden="true" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{c.value}</p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-medium">{c.label}</p>
            </div>
          ))}
        </div>

        {/* ── Impact Mapping ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {metrics.impactMapping.map((m) => (
            <div
              key={m.amount}
              className="bg-accent rounded-lg px-5 py-2.5 text-sm"
            >
              <span className="font-bold text-accent-foreground">${m.amount}</span>
              <span className="text-muted-foreground mx-1.5">=</span>
              <span className="font-medium text-foreground">
                {m.meals} meal{m.meals > 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>

        {/* ── Story Highlights ── */}
        <h3 className="text-2xl font-display font-bold text-foreground text-center mb-8">
          Stories from the Field
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {stories.map((s, i) => (
            <article
              key={i}
              className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={600}
                  height={300}
                />
              </div>
              <div className="p-6">
                <h4 className="font-display font-bold text-foreground text-lg mb-2">{s.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.snippet}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactDashboard;
