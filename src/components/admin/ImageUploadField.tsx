import { useRef } from "react";
import { Upload, X, ImageIcon, Link as LinkIcon } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  previewHeight?: string;
}

export default function ImageUploadField({ label, value, onChange, previewHeight = "h-28" }: ImageUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>

      {/* URL input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-xs font-medium hover:bg-accent transition-colors"
        >
          <Upload className="w-3.5 h-3.5" /> Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>

      {/* Preview */}
      {value ? (
        <div className={`relative w-full ${previewHeight} rounded-lg overflow-hidden border border-border group`}>
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1 rounded-full bg-foreground/60 text-background opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {value.startsWith("data:") && (
            <span className="absolute bottom-2 left-2 text-[10px] bg-foreground/60 text-background px-2 py-0.5 rounded-full">
              Uploaded
            </span>
          )}
        </div>
      ) : (
        <div className={`flex items-center justify-center ${previewHeight} rounded-lg border-2 border-dashed border-border text-muted-foreground`}>
          <div className="text-center">
            <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-40" />
            <p className="text-xs">No image set</p>
          </div>
        </div>
      )}
    </div>
  );
}
