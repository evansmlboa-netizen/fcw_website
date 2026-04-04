import { useState } from "react";
import { toast } from "sonner";
import { Shield, Lock, Heart, CheckCircle, Users } from "lucide-react";
import { useSiteConfig } from "@/lib/siteConfig";

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];

const impactMap: Record<number, string> = {
  5: "5 meals for families in need",
  10: "10 meals + clean water for a day",
  20: "20 meals + supplies for a family",
};

const trustBadges = [
  { icon: Shield, label: "256-bit SSL Encryption" },
  { icon: Lock, label: "PCI-DSS Compliant" },
  { icon: CheckCircle, label: "501(c)(3) Verified" },
];

const Donate = () => {
  const { config } = useSiteConfig();
  const d = config.donate;
  const [isMonthly, setIsMonthly] = useState(true);
  const [amount, setAmount] = useState(d.presets[1] ?? 10);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  const activeAmount = customAmount ? Number(customAmount) : amount;
  const impactMessage = impactMap[activeAmount] || `${activeAmount} meals for communities worldwide`;

  const handleDonate = async () => {
    if (!activeAmount || activeAmount <= 0) { toast.error("Please enter a valid amount."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: activeAmount, currency, recurring: isMonthly }),
      });
      if (!res.ok) throw new Error();
      toast.success("Thank you for your generous donation!");
    } catch { toast.error("Donation endpoint not connected yet. Thank you for your intent!"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-primary py-16 sm:py-20 text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <Heart className="w-10 h-10 text-primary-foreground mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-primary-foreground mb-4 leading-tight">
            {d.heroTitle}
          </h1>
          <p className="text-primary-foreground/85 text-lg sm:text-xl font-body leading-relaxed max-w-lg mx-auto">
            {d.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-6 max-w-xl">
          <div className="bg-accent rounded-xl p-5 mb-8 text-center border border-border">
            <p className="text-accent-foreground font-semibold text-lg">
              <span className="font-display text-2xl text-primary">${activeAmount}</span> = {impactMessage}
            </p>
            {isMonthly && (
              <p className="text-muted-foreground text-sm mt-1">
                That's <span className="font-semibold text-foreground">{activeAmount * 12} meals per year</span> with a monthly gift
              </p>
            )}
          </div>

          <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 sm:p-8">
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-muted rounded-lg p-1" role="radiogroup" aria-label="Donation frequency">
                <button role="radio" aria-checked={isMonthly} onClick={() => setIsMonthly(true)}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${isMonthly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  Monthly
                </button>
                <button role="radio" aria-checked={!isMonthly} onClick={() => setIsMonthly(false)}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${!isMonthly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  One-time
                </button>
              </div>
            </div>

            <fieldset className="mb-4">
              <legend className="sr-only">Select donation amount</legend>
              <div className="grid grid-cols-3 gap-3">
                {d.presets.map((val) => (
                  <button key={val} onClick={() => { setAmount(val); setCustomAmount(""); }} aria-pressed={amount === val && !customAmount}
                    className={`py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${amount === val && !customAmount ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-foreground hover:bg-accent"}`}>
                    ${val}
                  </button>
                ))}
              </div>
            </fieldset>

            <label htmlFor="custom-amount" className="sr-only">Custom amount</label>
            <input id="custom-amount" type="number" min="1" max="100000" placeholder="Custom amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-ring transition-all" />

            <label htmlFor="currency-select" className="sr-only">Currency</label>
            <select id="currency-select" value={currency} onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground mb-6 focus:outline-none focus:ring-2 focus:ring-ring transition-all">
              {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <button onClick={handleDonate} disabled={loading}
              className="w-full py-4 rounded-lg bg-secondary text-secondary-foreground font-bold text-lg hover:brightness-110 transition-all duration-300 disabled:opacity-60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {loading ? "Processing..." : `Donate $${activeAmount} ${isMonthly ? "/ month" : ""}`}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-muted-foreground text-sm">
                <badge.icon className="w-4 h-4 text-primary" /><span>{badge.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-muted rounded-xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground text-sm">12,400+ monthly donors</span>
            </div>
            <p className="text-muted-foreground text-sm">Join thousands already making a difference every month</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Donate;
