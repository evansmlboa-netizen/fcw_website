import { useState } from "react";
import { toast } from "sonner";

const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const [microAmount, setMicroAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/fallback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, microDonation: microAmount }),
      });
      if (!res.ok) throw new Error();
      toast.success("Thank you! We'll be in touch.");
    } catch {
      toast.error("Endpoint not connected yet. Thank you for your interest!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6 max-w-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
          Not ready to donate?
        </h2>
        <p className="text-muted-foreground mb-8">
          Stay updated on our impact and give a micro-donation if you'd like.
        </p>

        <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-8">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />

          <p className="text-sm text-muted-foreground mb-3">Optional micro-donation</p>
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 5].map((val) => (
              <button
                key={val}
                onClick={() => setMicroAmount(val)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  microAmount === val
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-accent"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all duration-300 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {loading ? "Sending..." : "Stay Connected"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmailCapture;
