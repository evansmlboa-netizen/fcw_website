import { useSiteConfig, StoryItem } from "@/lib/siteConfig";
import { Plus, Trash2, Star, StarOff, GripVertical, ImageIcon } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

const categories = ["Food Relief", "Clean Water", "Education", "Emergency"];

const Field = ({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
    {multiline ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
    ) : (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    )}
  </div>
);

export default function StoriesPanel() {
  const { config, updateConfig } = useSiteConfig();
  const sc = config.stories;
  const set = (patch: Partial<typeof sc>) => updateConfig({ stories: { ...sc, ...patch } });

  const updateStory = (id: string, patch: Partial<StoryItem>) => {
    set({ stories: sc.stories.map((s) => s.id === id ? { ...s, ...patch } : s) });
  };

  const addStory = () => {
    const id = "s" + Date.now();
    set({
      stories: [...sc.stories, {
        id, title: "", excerpt: "", fullContent: "", category: "Food Relief",
        location: "", date: "", readTime: "", impact: "", image: "",
      }],
    });
  };

  const removeStory = (id: string) => {
    const updated = sc.stories.filter((s) => s.id !== id);
    set({
      stories: updated,
      featuredStoryId: sc.featuredStoryId === id ? (updated[0]?.id ?? "") : sc.featuredStoryId,
    });
  };

  const featuredStory = sc.stories.find((s) => s.id === sc.featuredStoryId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">Stories</h2>
        <p className="text-sm text-muted-foreground">Manage your stories, set the featured hero story, and customise imagery.</p>
      </div>

      {/* Hero Background Image */}
      <div className="bg-muted rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <ImageIcon className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Hero Background Image</h3>
        </div>
        <p className="text-xs text-muted-foreground">Override the featured story image in the hero banner. Leave empty to use the featured story's image.</p>
        <ImageUploadField label="Background Image" value={sc.heroBackgroundImage} onChange={(v) => set({ heroBackgroundImage: v })} previewHeight="h-32" />
      </div>

      {/* Featured Story Selector */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <h3 className="text-sm font-bold text-foreground">Featured Story</h3>
        </div>
        <p className="text-xs text-muted-foreground">This story appears as the large hero banner at the top of the Stories page.</p>
        <select
          value={sc.featuredStoryId}
          onChange={(e) => set({ featuredStoryId: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {sc.stories.map((s) => (
            <option key={s.id} value={s.id}>{s.title || "(Untitled)"}</option>
          ))}
        </select>
        {featuredStory && (
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-sm font-semibold text-foreground">{featuredStory.title || "(Untitled)"}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{featuredStory.excerpt}</p>
            <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
              <span>{featuredStory.location}</span>
              <span>{featuredStory.date}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stories List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">All Stories ({sc.stories.length})</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Add, edit, or remove stories. Click the star to feature.</p>
          </div>
          <button onClick={addStory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:brightness-110 transition-all">
            <Plus className="w-3.5 h-3.5" /> New Story
          </button>
        </div>

        <div className="space-y-4">
          {sc.stories.map((s) => {
            const isFeatured = s.id === sc.featuredStoryId;
            return (
              <div key={s.id}
                className={`rounded-xl border p-5 space-y-4 transition-all ${
                  isFeatured ? "border-primary/30 bg-primary/[0.03] shadow-sm" : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <GripVertical className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">{s.title || "(Untitled)"}</p>
                      <p className="text-xs text-muted-foreground">{s.category} · {s.location || "No location"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => set({ featuredStoryId: s.id })}
                      className={`p-1.5 rounded-md transition-colors ${
                        isFeatured ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                      title={isFeatured ? "Featured story" : "Set as featured"}
                    >
                      {isFeatured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => removeStory(s.id)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete story">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <Field label="Title" value={s.title} onChange={(v) => updateStory(s.id, { title: v })} placeholder="Story headline" />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Excerpt" value={s.excerpt} onChange={(v) => updateStory(s.id, { excerpt: v })} multiline placeholder="Brief description..." />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Full Content" value={s.fullContent} onChange={(v) => updateStory(s.id, { fullContent: v })} multiline placeholder="Full story text (paragraphs separated by blank lines)..." />
                  </div>
                  <div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</label>
                      <select value={s.category} onChange={(e) => updateStory(s.id, { category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <Field label="Location" value={s.location} onChange={(v) => updateStory(s.id, { location: v })} placeholder="City, Country" />
                  <Field label="Date" value={s.date} onChange={(v) => updateStory(s.id, { date: v })} placeholder="Mar 2026" />
                  <Field label="Read Time" value={s.readTime} onChange={(v) => updateStory(s.id, { readTime: v })} placeholder="5 min read" />
                  <div className="sm:col-span-2">
                    <Field label="Impact" value={s.impact} onChange={(v) => updateStory(s.id, { impact: v })} placeholder="10,000 meals · 4,800 families" />
                  </div>
                </div>

                <ImageUploadField label="Story Image" value={s.image} onChange={(v) => updateStory(s.id, { image: v })} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
