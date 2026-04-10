import { useRef } from "react";
import { Upload, X, FileText } from "lucide-react";

interface DocumentUploadFieldProps {
  label: string;
  value: string;
  fileName: string;
  onChangeUrl: (v: string) => void;
  onChangeFileName: (v: string) => void;
}

export default function DocumentUploadField({ label, value, fileName, onChangeUrl, onChangeFileName }: DocumentUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Document must be under 10 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChangeUrl(reader.result as string);
      onChangeFileName(file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-xs font-medium hover:bg-accent transition-colors"
        >
          <Upload className="w-3.5 h-3.5" /> Upload Document
        </button>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
      </div>
      {value ? (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/50 group">
          <FileText className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground truncate flex-1">{fileName || "Document"}</span>
          <button
            onClick={() => { onChangeUrl(""); onChangeFileName(""); }}
            className="p-1 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            title="Remove document"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No document uploaded. Accepts PDF, DOC, DOCX (max 10 MB).</p>
      )}
    </div>
  );
}
