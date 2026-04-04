import { useSiteConfig } from "@/lib/siteConfig";
import ImageUploadField from "./ImageUploadField";
import { Palette } from "lucide-react";

const Field = ({ label, value, onChange, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
  </div>
);

export default function BrandingPanel() {
  const { config, updateConfig } = useSiteConfig();
  const b = config.branding;
  const set = (patch: Partial<typeof b>) => updateConfig({ branding: { ...b, ...patch } });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-display font-bold text-foreground mb-1">Branding</h2>
        <p className="text-sm text-muted-foreground">Configure your site name, logo, and favicon.</p>
      </div>

      <div className="bg-muted rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Palette className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Site Identity</h3>
        </div>
        <Field label="Site Name" value={b.siteName} onChange={(v) => set({ siteName: v })} placeholder="FCW" />
        <p className="text-xs text-muted-foreground">Displayed in the navbar and browser tab title.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground">Logo</h3>
        <p className="text-xs text-muted-foreground">Upload a logo or paste a URL. Leave empty to use the text-based logo.</p>
        <ImageUploadField label="Logo Image" value={b.logoUrl} onChange={(v) => set({ logoUrl: v })} previewHeight="h-16" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground">Favicon</h3>
        <p className="text-xs text-muted-foreground">Upload a small square image (32×32 or 64×64 recommended) for the browser tab icon.</p>
        <ImageUploadField label="Favicon" value={b.faviconUrl} onChange={(v) => set({ faviconUrl: v })} previewHeight="h-16" />
      </div>
    </div>
  );
}
