import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

const FeaturedStoriesSection = () => {
  const { config } = useSiteConfig();
  const fs = config.featuredStories;
  const allStories = config.stories.stories;
  const displayStories = allStories.slice(0, fs.maxStories);

  if (displayStories.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              {fs.title}
            </h2>
            <p className="text-muted-foreground max-w-xl">{fs.subtitle}</p>
          </div>
          {config.pages.stories && (
            <Link
              to="/stories"
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline flex-shrink-0"
            >
              View all stories <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayStories.map((story) => (
            <Link
              key={story.id}
              to={`/story/stories/${story.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            >
              <div className="aspect-[16/10] bg-muted overflow-hidden">
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                    <span className="text-4xl opacity-30">📖</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                    {story.category}
                  </span>
                  {story.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {story.location}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {story.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {story.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{story.date}</span>
                  {story.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {story.readTime}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;