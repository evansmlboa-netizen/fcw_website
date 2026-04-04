import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/lib/siteConfig";

import storyKitchen from "@/assets/story-kitchen.jpg";
import storyWater from "@/assets/story-water.jpg";
import storyWinter from "@/assets/story-winter.jpg";
import storyDistribution from "@/assets/story-distribution.jpg";
import storySchool from "@/assets/story-school.jpg";
import storyRelief from "@/assets/story-relief.jpg";

const fallbackImages: Record<string, string> = {
  s1: storyDistribution, s2: storySchool, s3: storyKitchen,
  s4: storyWater, s5: storyWinter, s6: storyRelief,
};
const defaultFallback = storyKitchen;

const catColor: Record<string, string> = {
  "Food Relief": "bg-secondary/15 text-secondary",
  "Clean Water": "bg-primary/15 text-primary",
  Education: "bg-accent text-accent-foreground",
  Emergency: "bg-destructive/15 text-destructive",
};

const StoryDetail = () => {
  const { id, source } = useParams<{ id: string; source: string }>();
  const { config } = useSiteConfig();
  const donateEnabled = config.pages.donate;

  // Look in both stories and impact stories
  const allStories = [
    ...config.stories.stories.map((s) => ({ ...s, src: "stories" as const })),
    ...config.impact.stories.map((s) => ({ ...s, src: "impact" as const })),
  ];

  const story = allStories.find((s) => s.id === id && (source ? s.src === source : true))
    ?? allStories.find((s) => s.id === id);

  if (!story) return <Navigate to="/stories" replace />;

  const image = story.image || fallbackImages[story.id] || defaultFallback;
  const paragraphs = (story.fullContent || story.excerpt).split(/\n\n+/).filter(Boolean);

  // Get related stories (same category, different id)
  const related = allStories
    .filter((s) => s.category === story.category && s.id !== story.id)
    .slice(0, 2);

  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[55vh] overflow-hidden">
        <img src={image} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/10" />
        <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-6 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to={story.src === "impact" ? "/impact" : "/stories"}
              className="inline-flex items-center gap-1.5 text-primary-foreground/70 text-sm mb-4 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to {story.src === "impact" ? "Impact" : "Stories"}
            </Link>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${catColor[story.category] ?? "bg-muted text-muted-foreground"}`}>
              {story.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary-foreground max-w-3xl leading-tight mb-4">
              {story.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/60 text-xs sm:text-sm">
              {story.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{story.location}</span>}
              {story.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{story.date}</span>}
              {story.readTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{story.readTime}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Impact badge */}
          {story.impact && (
            <div className="bg-accent/60 rounded-xl px-5 py-3 mb-8 text-sm font-medium text-accent-foreground">
              ⚡ Impact: {story.impact}
            </div>
          )}

          <article className="prose prose-lg max-w-none text-foreground">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg">{p}</p>
            ))}
          </article>

          {/* Donate CTA */}
          {donateEnabled && (
            <div className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center">
              <Heart className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Help write the next story
              </h3>
              <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
                Your donation directly funds operations like this one. Every $1 delivers a meal.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/donate" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all">
                  Donate Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/donate" className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/5 transition-colors">
                  Give $1 Today
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Stories */}
      {related.length > 0 && (
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/story/${r.src}/${r.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img src={r.image || fallbackImages[r.id] || defaultFallback} alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default StoryDetail;
