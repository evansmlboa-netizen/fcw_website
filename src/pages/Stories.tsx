import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

import storyKitchen from "@/assets/story-kitchen.jpg";
import storyWater from "@/assets/story-water.jpg";
import storyWinter from "@/assets/story-winter.jpg";
import storyDistribution from "@/assets/story-distribution.jpg";
import storySchool from "@/assets/story-school.jpg";
import storyRelief from "@/assets/story-relief.jpg";

const fallbackImages: Record<string, string> = {
  s1: storyDistribution,
  s2: storySchool,
  s3: storyKitchen,
  s4: storyWater,
  s5: storyWinter,
  s6: storyRelief,
};
const defaultFallback = storyKitchen;

const categories = ["All", "Food Relief", "Clean Water", "Education", "Emergency"] as const;
type Category = (typeof categories)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const } }),
};

const catColor: Record<string, string> = {
  "Food Relief": "bg-secondary/15 text-secondary",
  "Clean Water": "bg-primary/15 text-primary",
  Education: "bg-accent text-accent-foreground",
  Emergency: "bg-destructive/15 text-destructive",
};

const StoriesPage = () => {
  const [active, setActive] = useState<Category>("All");
  const { config } = useSiteConfig();
  const donateEnabled = config.pages.donate;
  const sc = config.stories;

  const stories = sc.stories.map((s) => ({
    ...s,
    image: s.image || fallbackImages[s.id] || defaultFallback,
  }));

  const filtered = active === "All" ? stories : stories.filter((s) => s.category === active);
  const featured = filtered.find((s) => s.id === sc.featuredStoryId) ?? filtered[0];
  const rest = filtered.filter((s) => s !== featured);

  const heroImage = sc.heroBackgroundImage || (featured ? featured.image : defaultFallback);

  if (!featured) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No stories available.</p>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <section className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
        <img src={heroImage} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" width={1280} height={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-6 pb-10 sm:pb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${catColor[featured.category] ?? "bg-muted text-muted-foreground"}`}>{featured.category}</span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-primary-foreground max-w-3xl leading-tight mb-3">{featured.title}</h1>
            <p className="text-primary-foreground/80 max-w-2xl text-sm sm:text-base leading-relaxed mb-4">{featured.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/60 text-xs sm:text-sm mb-4">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{featured.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
            </div>
            <Link to={`/story/stories/${featured.id}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all">
              Read full story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${active === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rest.map((s, i) => (
              <motion.article key={s.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}
                className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                  <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${catColor[s.category] ?? "bg-muted text-muted-foreground"}`}>{s.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-foreground text-lg leading-snug mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">{s.excerpt}</p>
                  <div className="mt-4 bg-accent/60 rounded-lg px-3 py-2 text-xs font-medium text-accent-foreground">⚡ {s.impact}</div>
                  <div className="mt-3 flex items-center justify-between text-muted-foreground text-xs">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</span>
                    <span>{s.date}</span>
                  </div>
                  <Link to={`/story/stories/${s.id}`} className="mt-3 inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
                    Read full story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {donateEnabled && (
            <div className="text-center mt-14">
              <Link to="/donate" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                Help write the next story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default StoriesPage;
