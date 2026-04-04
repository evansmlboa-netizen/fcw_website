import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, FolderCheck, TrendingUp, ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useSiteConfig } from "@/lib/siteConfig";
import storyKitchen from "@/assets/story-kitchen.jpg";
import storyWater from "@/assets/story-water.jpg";
import storyWinter from "@/assets/story-winter.jpg";

const defaultImages = [storyKitchen, storyWater, storyWinter];

const fmt = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : String(n);

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1500; const step = 16; const inc = target / (dur / step);
    let cur = 0;
    const id = setInterval(() => { cur += inc; if (cur >= target) { cur = target; clearInterval(id); } setVal(cur); }, step);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{fmt(Math.round(val))}{suffix}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const catColor: Record<string, string> = {
  "Food Relief": "bg-secondary/15 text-secondary",
  "Clean Water": "bg-primary/15 text-primary",
  Education: "bg-accent text-accent-foreground",
  Emergency: "bg-destructive/15 text-destructive",
};

const ImpactPage = () => {
  const { config } = useSiteConfig();
  const im = config.impact;
  const donateEnabled = config.pages.donate;

  const cards = [
    { icon: Heart, label: "Meals Served", value: im.mealsServed, suffix: "+", accent: "text-secondary" },
    { icon: Users, label: "Beneficiaries", value: im.beneficiaries, suffix: "+", accent: "text-primary" },
    { icon: FolderCheck, label: "Projects Completed", value: im.projectsCompleted, suffix: "", accent: "text-accent-foreground" },
    { icon: TrendingUp, label: "Donor Retention", value: 94, suffix: "%", accent: "text-primary" },
  ];

  const impactMapping = [
    { amount: 1, meals: 1 }, { amount: 5, meals: 5 }, { amount: 20, meals: 20 }, { amount: 100, meals: 100 },
  ];

  const featured = im.stories.find((s) => s.id === im.featuredStoryId) ?? im.stories[0];
  const heroImage = im.heroBackgroundImage || (featured?.image) || defaultImages[0];
  const rest = im.stories.filter((s) => s !== featured);

  const stories = im.stories.map((s, i) => ({
    ...s,
    image: s.image || defaultImages[i % defaultImages.length],
  }));

  return (
    <main className="bg-background">
      <section className="bg-primary py-16 sm:py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-primary-foreground mb-4">{im.heroTitle}</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">{im.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-muted" aria-label="Key metrics">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {cards.map((c, i) => (
              <motion.div key={c.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl p-6 sm:p-8 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
                <c.icon className={`w-7 h-7 mx-auto mb-3 ${c.accent}`} aria-hidden="true" />
                <p className="text-2xl sm:text-3xl font-bold text-foreground"><Counter target={c.value} suffix={c.suffix} /></p>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-medium">{c.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {donateEnabled && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Your Dollar, Their Meal</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {impactMapping.map((m) => (
                <div key={m.amount} className="bg-accent rounded-lg px-5 py-2.5 text-sm">
                  <span className="font-bold text-accent-foreground">${m.amount}</span>
                  <span className="text-muted-foreground mx-1.5">=</span>
                  <span className="font-medium text-foreground">{m.meals} meal{m.meals > 1 ? "s" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Meals Delivered by Quarter</h2>
          <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-4 sm:p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={im.chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tickFormatter={(v: number) => fmt(v)} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip formatter={(v: number) => [v.toLocaleString(), "Meals"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="meals" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Featured Story Hero */}
      {featured && (
        <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <img src={heroImage || defaultImages[0]} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-6 pb-10 sm:pb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${catColor[featured.category] ?? "bg-muted text-muted-foreground"}`}>
                {featured.category}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-primary-foreground max-w-3xl leading-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl text-sm sm:text-base leading-relaxed mb-4">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/60 text-xs sm:text-sm mb-4">
                {featured.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{featured.location}</span>}
                {featured.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>}
              </div>
              <Link to={`/story/impact/${featured.id}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all">
                Read full story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-20 bg-background" aria-label="Recent stories">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-4">Stories from the Field</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Real narratives from the communities we serve.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stories.filter((s) => s.id !== featured?.id).map((s, i) => (
              <motion.article key={s.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300 group flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2 w-fit ${catColor[s.category] ?? "bg-muted text-muted-foreground"}`}>
                    {s.category}
                  </span>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">{s.excerpt}</p>
                  {s.impact && (
                    <div className="mt-3 bg-accent/60 rounded-lg px-3 py-2 text-xs font-medium text-accent-foreground">⚡ {s.impact}</div>
                  )}
                  <Link to={`/story/impact/${s.id}`} className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
                    Read full story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ImpactPage;
