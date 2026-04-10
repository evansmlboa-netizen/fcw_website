import { useState } from "react";
import { toast } from "sonner";
import { useSiteConfig, TeamMember } from "@/lib/siteConfig";
import { Settings, Home, Info, Heart, BarChart3, BookOpen, Globe, RotateCcw, Save, Plus, Trash2, Eye, EyeOff, Newspaper, Palette, Lock, LogOut } from "lucide-react";
import HomePanel from "@/components/admin/HomePanel";
import ImpactPanel from "@/components/admin/ImpactPanel";
import StoriesPanel from "@/components/admin/StoriesPanel";
import BrandingPanel from "@/components/admin/BrandingPanel";
import DocumentUploadField from "@/components/admin/DocumentUploadField";

type Tab = "branding" | "pages" | "home" | "about" | "donate" | "impact" | "stories" | "footer";

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "branding", label: "Branding", icon: Palette },
  { id: "pages", label: "Pages", icon: Globe },
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "stories", label: "Stories", icon: Newspaper },
  { id: "donate", label: "Donate", icon: Heart },
  { id: "impact", label: "Impact", icon: BarChart3 },
  { id: "footer", label: "Footer", icon: BookOpen },
];

const Field = ({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-foreground">{label}</label>
    {multiline ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
    ) : (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    )}
  </div>
);

const ADMIN_PASS = "fcw-admin-2024";

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl border border-border shadow-lg p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground">Enter the admin password to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className={`w-full px-4 py-3 rounded-lg border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                error ? "border-destructive ring-2 ring-destructive/30" : "border-input"
              }`}
            />
            {error && <p className="text-xs text-destructive">Incorrect password. Try again.</p>}
            <button type="submit"
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

const Admin = () => {
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const [active, setActive] = useState<Tab>("branding");
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "true");

  const save = () => toast.success("Configuration saved!");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <main className="min-h-screen bg-muted">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Configure site content & pages</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { resetConfig(); toast.info("Reset to defaults"); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-input text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button onClick={save}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
              <Save className="w-3.5 h-3.5" /> Save
            </button>
            <button onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-destructive/30 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-48 flex-shrink-0">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  active === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </nav>

          <div className="flex-1 bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-[var(--shadow-card)]">
            {active === "branding" && <BrandingPanel />}
            {active === "pages" && <PagesPanel />}
            {active === "home" && <HomePanel />}
            {active === "about" && <AboutPanel />}
            {active === "donate" && <DonatePanel />}
            {active === "impact" && <ImpactPanel />}
            {active === "stories" && <StoriesPanel />}
            {active === "footer" && <FooterPanel />}
          </div>
        </div>
      </div>
    </main>
  );
};

function PagesPanel() {
  const { config, updateConfig } = useSiteConfig();
  const pageNames: { key: keyof typeof config.pages; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "impact", label: "Impact" },
    { key: "donate", label: "Donate" },
    { key: "stories", label: "Stories" },
  ];
  return (
    <div>
      <h2 className="text-lg font-display font-bold text-foreground mb-1">Page Visibility</h2>
      <p className="text-sm text-muted-foreground mb-6">Toggle which pages appear in the navbar and are accessible. Turning off Donate will also hide all donation buttons and links across the site.</p>
      <div className="space-y-3">
        {pageNames.map((p) => (
          <div key={p.key} className="flex items-center justify-between bg-muted rounded-lg px-4 py-3">
            <span className="font-medium text-foreground text-sm">{p.label}</span>
            <button onClick={() => updateConfig({ pages: { ...config.pages, [p.key]: !config.pages[p.key] } })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                config.pages[p.key] ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
              }`}>
              {config.pages[p.key] ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {config.pages[p.key] ? "Visible" : "Hidden"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPanel() {
  const { config, updateConfig } = useSiteConfig();
  const a = config.about;
  const set = (patch: Partial<typeof a>) => updateConfig({ about: { ...a, ...patch } });

  const updateMember = (i: number, patch: Partial<TeamMember>) => {
    const team = [...a.team]; team[i] = { ...team[i], ...patch }; set({ team });
  };
  const addMember = () => set({ team: [...a.team, { name: "", role: "", bio: "", initials: "" }] });
  const removeMember = (i: number) => set({ team: a.team.filter((_, idx) => idx !== i) });
  const updatePartner = (i: number, v: string) => { const partners = [...a.partners]; partners[i] = v; set({ partners }); };
  const addPartner = () => set({ partners: [...a.partners, ""] });
  const removePartner = (i: number) => set({ partners: a.partners.filter((_, idx) => idx !== i) });

  return (
    <div>
      <h2 className="text-lg font-display font-bold text-foreground mb-1">About Page</h2>
      <p className="text-sm text-muted-foreground mb-6">Edit mission, team members, and partners.</p>
      <div className="space-y-6">
        <Field label="Mission Title" value={a.missionTitle} onChange={(v) => set({ missionTitle: v })} />
        <Field label="Mission Description" value={a.missionDescription} onChange={(v) => set({ missionDescription: v })} multiline />
        <Field label="Values Section Title" value={a.valuesTitle} onChange={(v) => set({ valuesTitle: v })} />
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">Team Members</h3>
            <button onClick={addMember} className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add</button>
          </div>
          <div className="space-y-4">
            {a.team.map((m, i) => (
              <div key={i} className="bg-muted rounded-xl p-4 space-y-3 relative">
                <button onClick={() => removeMember(i)} className="absolute top-3 right-3 text-destructive hover:text-destructive/80" aria-label="Remove member"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name" value={m.name} onChange={(v) => updateMember(i, { name: v })} />
                  <Field label="Initials" value={m.initials} onChange={(v) => updateMember(i, { initials: v })} />
                </div>
                <Field label="Role" value={m.role} onChange={(v) => updateMember(i, { role: v })} />
                <Field label="Bio" value={m.bio} onChange={(v) => updateMember(i, { bio: v })} multiline />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">Partners</h3>
            <button onClick={addPartner} className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add</button>
          </div>
          <div className="space-y-2">
            {a.partners.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="text" value={p} onChange={(e) => updatePartner(i, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <button onClick={() => removePartner(i)} className="text-destructive hover:text-destructive/80" aria-label="Remove partner"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DonatePanel() {
  const { config, updateConfig } = useSiteConfig();
  const d = config.donate;
  const set = (patch: Partial<typeof d>) => updateConfig({ donate: { ...d, ...patch } });
  return (
    <div>
      <h2 className="text-lg font-display font-bold text-foreground mb-1">Donate Page</h2>
      <p className="text-sm text-muted-foreground mb-6">Edit the donation page hero and preset amounts.</p>
      <div className="space-y-4">
        <Field label="Hero Title" value={d.heroTitle} onChange={(v) => set({ heroTitle: v })} />
        <Field label="Hero Subtitle" value={d.heroSubtitle} onChange={(v) => set({ heroSubtitle: v })} multiline />
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Preset Amounts ($)</label>
          <div className="flex gap-2">
            {d.presets.map((val, i) => (
              <input key={i} type="number" value={val} onChange={(e) => {
                const presets = [...d.presets]; presets[i] = Number(e.target.value); set({ presets });
              }} className="w-24 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterPanel() {
  const { config, updateConfig } = useSiteConfig();
  const f = config.footer;
  const set = (patch: Partial<typeof f>) => updateConfig({ footer: { ...f, ...patch } });
  return (
    <div>
      <h2 className="text-lg font-display font-bold text-foreground mb-1">Footer</h2>
      <p className="text-sm text-muted-foreground mb-6">Edit footer tagline, contact details, and legal documents.</p>
      <div className="space-y-4">
        <Field label="Tagline" value={f.tagline} onChange={(v) => set({ tagline: v })} multiline />
        <Field label="Copyright Text" value={f.copyrightText} onChange={(v) => set({ copyrightText: v })} />
        <Field label="Email" value={f.email} onChange={(v) => set({ email: v })} />
        <Field label="Phone" value={f.phone} onChange={(v) => set({ phone: v })} />
        <Field label="Address" value={f.address} onChange={(v) => set({ address: v })} />
      </div>
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-foreground mb-1">Legal Documents</h3>
          <p className="text-xs text-muted-foreground mb-4">Upload documents that users can download from the footer links.</p>
        </div>
        <DocumentUploadField
          label="Privacy Policy"
          value={f.privacyPolicyUrl}
          fileName={f.privacyPolicyFileName}
          onChangeUrl={(v) => set({ privacyPolicyUrl: v })}
          onChangeFileName={(v) => set({ privacyPolicyFileName: v })}
        />
        <DocumentUploadField
          label="Terms of Service"
          value={f.termsOfServiceUrl}
          fileName={f.termsOfServiceFileName}
          onChangeUrl={(v) => set({ termsOfServiceUrl: v })}
          onChangeFileName={(v) => set({ termsOfServiceFileName: v })}
        />
      </div>
    </div>
  );
}

export default Admin;
