import { useState } from "react";
import { toast } from "sonner";

const presets = [5, 10, 20, 50];
const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];

const DonationForm = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [amount, setAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  const activeAmount = customAmount ? Number(customAmount) : amount;

  const handleDonate = async () => {
    if (!activeAmount || activeAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: activeAmount, currency, recurring: isMonthly }),
      });
      if (!res.ok) throw new Error();
      toast.success("Thank you for your donation!");
    } catch {
      toast.error("Donation endpoint not connected yet. Thank you for your intent!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donate" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-center text-foreground mb-2">
          Make a Difference
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Choose an amount and frequency below.
        </p>

        <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-8">
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  isMonthly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  !isMonthly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                One-time
              </button>
            </div>
          </div>

          {/* Preset amounts */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {presets.map((val) => (
              <button
                key={val}
                onClick={() => { setAmount(val); setCustomAmount(""); }}
                className={`py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  amount === val && !customAmount
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-foreground hover:bg-accent"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <input
            type="number"
            min="1"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />

          {/* Currency */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground mb-6 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={handleDonate}
            disabled={loading}
            className="w-full py-4 rounded-lg bg-secondary text-secondary-foreground font-bold text-lg hover:brightness-110 transition-all duration-300 disabled:opacity-60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {loading ? "Processing..." : `Donate $${activeAmount} ${isMonthly ? "/ month" : ""}`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
