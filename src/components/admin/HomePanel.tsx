import { useSiteConfig } from "@/lib/siteConfig";
import { Plus, Trash2 } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

const Field = ({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) => (
  <div className="space-y-1.5">
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

const NumField = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
    <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
  </div>
);

const iconOptions = ["heart", "truck", "utensils", "handshake", "globe", "users"];

export default function HomePanel() {
  const { config, updateConfig } = useSiteConfig();
  const h = config.hero;
  const hm = config.homeMetrics;
  const hp = config.homePartners;
  const hw = config.howItWorks;
  const ct = config.contact;
  const fs = config.featuredStories;

  const setHero = (patch: Partial<typeof h>) => updateConfig({ hero: { ...h, ...patch } });
  const setMetrics = (patch: Partial<typeof hm>) => updateConfig({ homeMetrics: { ...hm, ...patch } });
  const setPartners = (patch: Partial<typeof hp>) => updateConfig({ homePartners: { ...hp, ...patch } });
  const setHowItWorks = (patch: Partial<typeof hw>) => updateConfig({ howItWorks: { ...hw, ...patch } });
  const setContact = (patch: Partial<typeof ct>) => updateConfig({ contact: { ...ct, ...patch } });
  const setFeaturedStories = (patch: Partial<typeof fs>) => updateConfig({ featuredStories: { ...fs, ...patch } });

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">Hero Section</h2>
        <p className="text-sm text-muted-foreground mb-6">Edit the main landing hero visitors see first.</p>
        <div className="space-y-4">
          <ImageUploadField label="Background Image" value={h.backgroundImage} onChange={(v) => setHero({ backgroundImage: v })} previewHeight="h-32" />
          <p className="text-xs text-muted-foreground -mt-2">Leave empty to use the default hero image.</p>
          <Field label="Headline" value={h.headline} onChange={(v) => setHero({ headline: v })} />
          <Field label="Subheadline" value={h.subheadline} onChange={(v) => setHero({ subheadline: v })} multiline />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary CTA" value={h.ctaPrimary} onChange={(v) => setHero({ ctaPrimary: v })} />
            <Field label="Secondary CTA" value={h.ctaSecondary} onChange={(v) => setHero({ ctaSecondary: v })} />
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Metrics / Impact Section */}
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">Impact Stats Section</h2>
        <p className="text-sm text-muted-foreground mb-6">Configure the stats cards and dollar-to-meal mappings shown on the homepage.</p>
        <div className="space-y-4">
          <Field label="Section Title" value={hm.title} onChange={(v) => setMetrics({ title: v })} />
          <Field label="Section Subtitle" value={hm.subtitle} onChange={(v) => setMetrics({ subtitle: v })} />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Stats Cards</h3>
              <button onClick={() => setMetrics({ metrics: [...hm.metrics, { label: "", value: "" }] })}
                className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {hm.metrics.map((m, i) => (
                <div key={i} className="flex items-end gap-3 bg-muted rounded-lg p-3">
                  <div className="flex-1"><Field label="Label" value={m.label} onChange={(v) => {
                    const metrics = [...hm.metrics]; metrics[i] = { ...metrics[i], label: v }; setMetrics({ metrics });
                  }} /></div>
                  <div className="flex-1"><Field label="Value" value={m.value} onChange={(v) => {
                    const metrics = [...hm.metrics]; metrics[i] = { ...metrics[i], value: v }; setMetrics({ metrics });
                  }} /></div>
                  <button onClick={() => setMetrics({ metrics: hm.metrics.filter((_, idx) => idx !== i) })}
                    className="text-destructive hover:text-destructive/80 mb-1" aria-label="Remove stat">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Dollar-to-Meal Mappings</h3>
              <button onClick={() => setMetrics({ mappings: [...hm.mappings, { amount: "", meals: "" }] })}
                className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {hm.mappings.map((m, i) => (
                <div key={i} className="flex items-end gap-3 bg-muted rounded-lg p-3">
                  <div className="flex-1"><Field label="Amount" value={m.amount} onChange={(v) => {
                    const mappings = [...hm.mappings]; mappings[i] = { ...mappings[i], amount: v }; setMetrics({ mappings });
                  }} /></div>
                  <div className="flex-1"><Field label="Meals" value={m.meals} onChange={(v) => {
                    const mappings = [...hm.mappings]; mappings[i] = { ...mappings[i], meals: v }; setMetrics({ mappings });
                  }} /></div>
                  <button onClick={() => setMetrics({ mappings: hm.mappings.filter((_, idx) => idx !== i) })}
                    className="text-destructive hover:text-destructive/80 mb-1" aria-label="Remove mapping">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* How It Works */}
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">How It Works</h2>
        <p className="text-sm text-muted-foreground mb-6">Configure the three-step process section on the homepage.</p>
        <div className="space-y-4">
          <Field label="Section Title" value={hw.title} onChange={(v) => setHowItWorks({ title: v })} />
          <Field label="Section Subtitle" value={hw.subtitle} onChange={(v) => setHowItWorks({ subtitle: v })} multiline />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Steps</h3>
              <button onClick={() => setHowItWorks({ steps: [...hw.steps, { icon: "heart", title: "", description: "" }] })}
                className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>
            <div className="space-y-4">
              {hw.steps.map((step, i) => (
                <div key={i} className="bg-muted rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {i + 1}</span>
                    <button onClick={() => setHowItWorks({ steps: hw.steps.filter((_, idx) => idx !== i) })}
                      className="text-destructive hover:text-destructive/80" aria-label="Remove step">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Icon</label>
                      <select value={step.icon} onChange={(e) => {
                        const steps = [...hw.steps]; steps[i] = { ...steps[i], icon: e.target.value }; setHowItWorks({ steps });
                      }} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        {iconOptions.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                      </select>
                    </div>
                    <Field label="Title" value={step.title} onChange={(v) => {
                      const steps = [...hw.steps]; steps[i] = { ...steps[i], title: v }; setHowItWorks({ steps });
                    }} />
                  </div>
                  <Field label="Description" value={step.description} onChange={(v) => {
                    const steps = [...hw.steps]; steps[i] = { ...steps[i], description: v }; setHowItWorks({ steps });
                  }} multiline placeholder="Explain this step..." />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Featured Stories */}
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">Featured Stories</h2>
        <p className="text-sm text-muted-foreground mb-6">Configure the stories preview section shown on the homepage. Stories are pulled from the Stories tab.</p>
        <div className="space-y-4">
          <Field label="Section Title" value={fs.title} onChange={(v) => setFeaturedStories({ title: v })} />
          <Field label="Section Subtitle" value={fs.subtitle} onChange={(v) => setFeaturedStories({ subtitle: v })} multiline />
          <NumField label="Max Stories to Display" value={fs.maxStories} onChange={(v) => setFeaturedStories({ maxStories: Math.max(1, Math.min(6, v)) })} />
        </div>
      </div>

      <hr className="border-border" />

      {/* Contact Section */}
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">Contact Section</h2>
        <p className="text-sm text-muted-foreground mb-6">Configure the contact section shown on the homepage.</p>
        <div className="space-y-4">
          <Field label="Section Title" value={ct.title} onChange={(v) => setContact({ title: v })} />
          <Field label="Section Subtitle" value={ct.subtitle} onChange={(v) => setContact({ subtitle: v })} multiline />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email" value={ct.email} onChange={(v) => setContact({ email: v })} placeholder="info@example.org" />
            <Field label="Phone" value={ct.phone} onChange={(v) => setContact({ phone: v })} placeholder="+1 555 123 4567" />
          </div>
          <Field label="Address" value={ct.address} onChange={(v) => setContact({ address: v })} placeholder="123 Main St, City" />

          <div className="bg-muted rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Contact Form</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Toggle the message form on or off.</p>
              </div>
              <button
                onClick={() => setContact({ showContactForm: !ct.showContactForm })}
                className={`relative w-11 h-6 rounded-full transition-colors ${ct.showContactForm ? "bg-primary" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${ct.showContactForm ? "translate-x-5" : ""}`} />
              </button>
            </div>
            {ct.showContactForm && (
              <div className="space-y-3 pt-2 border-t border-border">
                <Field label="Form Title" value={ct.formTitle} onChange={(v) => setContact({ formTitle: v })} />
                <Field label="Form Subtitle" value={ct.formSubtitle} onChange={(v) => setContact({ formSubtitle: v })} />
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Partners Section */}
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">Partners Section</h2>
        <p className="text-sm text-muted-foreground mb-6">Edit the trusted partners displayed on the homepage.</p>
        <div className="space-y-4">
          <Field label="Section Title" value={hp.title} onChange={(v) => setPartners({ title: v })} />
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Partner Names</h3>
              <button onClick={() => setPartners({ partners: [...hp.partners, ""] })}
                className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {hp.partners.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="text" value={p} onChange={(e) => {
                    const partners = [...hp.partners]; partners[i] = e.target.value; setPartners({ partners });
                  }} className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button onClick={() => setPartners({ partners: hp.partners.filter((_, idx) => idx !== i) })}
                    className="text-destructive hover:text-destructive/80" aria-label="Remove partner">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}