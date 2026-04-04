import { ShieldCheck } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

const TrustSection = () => {
  const { config } = useSiteConfig();
  const hp = config.homePartners;

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <p className="text-center text-muted-foreground text-sm font-medium uppercase tracking-widest mb-8">
          {hp.title}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
          {hp.partners.map((name) => (
            <div
              key={name}
              className="bg-muted rounded-lg px-6 py-3 text-muted-foreground font-semibold text-sm"
            >
              {name}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>PCI Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>501(c)(3) Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
