import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrustSection from "@/components/TrustSection";
import FeaturedStoriesSection from "@/components/FeaturedStoriesSection";
import DonationForm from "@/components/DonationForm";
import ContactSection from "@/components/ContactSection";
import EmailCapture from "@/components/EmailCapture";
import { useSiteConfig } from "@/lib/siteConfig";

const Index = () => {
  const { config } = useSiteConfig();
  const donateEnabled = config.pages.donate;

  return (
    <main>
      <HeroSection />
      <MetricsSection />
      <HowItWorksSection />
      <TrustSection />
      <FeaturedStoriesSection />
      {donateEnabled && <DonationForm />}
      <ContactSection />
      {donateEnabled && <EmailCapture />}
    </main>
  );
};

export default Index;