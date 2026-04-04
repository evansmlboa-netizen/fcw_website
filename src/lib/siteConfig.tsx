import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import nigeriaImg from "@/assets/stories/nigeria-flood-relief.jpg";
import cambodiaImg from "@/assets/stories/cambodia-school-meals.jpg";
import ghanaImg from "@/assets/stories/ghana-community-kitchen.jpg";
import kenyaImg from "@/assets/stories/kenya-clean-water.jpg";
import europeImg from "@/assets/stories/europe-winter-relief.jpg";
import mozambiqueImg from "@/assets/stories/mozambique-supply-chain.jpg";

/* ── Types ── */
export interface HeroConfig {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
}

export interface MetricItem {
  label: string;
  value: string;
}

export interface DollarMapping {
  amount: string;
  meals: string;
}

export interface HomeMetricsConfig {
  title: string;
  subtitle: string;
  metrics: MetricItem[];
  mappings: DollarMapping[];
}

export interface HomePartnersConfig {
  title: string;
  partners: string[];
}

export interface HomeStoryItem {
  title: string;
  snippet: string;
  image: string;
}

export interface HowItWorksStep {
  icon: string;
  title: string;
  description: string;
}

export interface HowItWorksConfig {
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
  showContactForm: boolean;
  formTitle: string;
  formSubtitle: string;
}

export interface FeaturedStoriesConfig {
  title: string;
  subtitle: string;
  maxStories: number;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface AboutConfig {
  missionTitle: string;
  missionDescription: string;
  valuesTitle: string;
  team: TeamMember[];
  partners: string[];
}

export interface StoryItem {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  category: string;
  location: string;
  date: string;
  readTime: string;
  impact: string;
  image: string;
}

export interface StoriesConfig {
  heroBackgroundImage: string;
  featuredStoryId: string;
  stories: StoryItem[];
}

export interface DonateConfig {
  heroTitle: string;
  heroSubtitle: string;
  presets: number[];
}

export interface ChartDataPoint {
  quarter: string;
  meals: number;
}

export interface ImpactStoryItem {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  category: string;
  location: string;
  date: string;
  readTime: string;
  impact: string;
  image: string;
}

export interface ImpactConfig {
  heroTitle: string;
  heroSubtitle: string;
  mealsServed: number;
  beneficiaries: number;
  projectsCompleted: number;
  chartData: ChartDataPoint[];
  featuredStoryId: string;
  heroBackgroundImage: string;
  stories: ImpactStoryItem[];
}

export interface BrandingConfig {
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
}

export interface FooterConfig {
  tagline: string;
  email: string;
  phone: string;
  address: string;
}

export interface PageVisibility {
  home: boolean;
  impact: boolean;
  donate: boolean;
  stories: boolean;
  about: boolean;
}

export interface SiteConfig {
  branding: BrandingConfig;
  hero: HeroConfig;
  homeMetrics: HomeMetricsConfig;
  homePartners: HomePartnersConfig;
  howItWorks: HowItWorksConfig;
  contact: ContactConfig;
  featuredStories: FeaturedStoriesConfig;
  about: AboutConfig;
  stories: StoriesConfig;
  donate: DonateConfig;
  impact: ImpactConfig;
  footer: FooterConfig;
  pages: PageVisibility;
}

/* ── Defaults ── */
export const defaultConfig: SiteConfig = {
  branding: {
    siteName: "FCW",
    logoUrl: "",
    faviconUrl: "",
  },
  hero: {
    headline: "Your $1 = 1 Meal for Someone in Need",
    subheadline: "FCW delivers meals to those experiencing hunger and homelessness globally. See the impact you create.",
    ctaPrimary: "Donate Monthly",
    ctaSecondary: "Give $1 Today",
    backgroundImage: "",
  },
  homeMetrics: {
    title: "Our Impact",
    subtitle: "Every dollar goes directly to feeding someone in need.",
    metrics: [
      { label: "Meals Served", value: "2,400,000+" },
      { label: "Beneficiaries", value: "180,000+" },
      { label: "Active Projects", value: "42" },
    ],
    mappings: [
      { amount: "$1", meals: "1 meal" },
      { amount: "$5", meals: "5 meals" },
      { amount: "$20", meals: "20 meals" },
      { amount: "$100", meals: "100 meals" },
    ],
  },
  homePartners: {
    title: "Trusted by global partners",
    partners: ["UNICEF", "Red Cross", "World Food Programme", "USAID", "Save the Children"],
  },
  howItWorks: {
    title: "How It Works",
    subtitle: "Three simple steps from your donation to a meal on someone's table.",
    steps: [
      { icon: "heart", title: "You Donate", description: "Choose an amount — every $1 feeds one person. Set up a one-time or recurring gift in seconds." },
      { icon: "truck", title: "We Mobilise", description: "Our logistics network activates local kitchens, purchases fresh ingredients, and coordinates volunteer drivers." },
      { icon: "utensils", title: "Meals Delivered", description: "Hot, nutritious meals reach families in need — often within 48 hours of your donation." },
    ],
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Have a question, want to volunteer, or need to reach our team? We'd love to hear from you.",
    email: "info@fcw.org",
    phone: "+1 555 123 4567",
    address: "123 Hope Street, New York, NY 10001",
    showContactForm: true,
    formTitle: "Send Us a Message",
    formSubtitle: "We typically respond within 24 hours.",
  },
  featuredStories: {
    title: "Stories From the Field",
    subtitle: "Real impact, real people. See how your donations change lives.",
    maxStories: 3,
  },
  about: {
    missionTitle: "Feeding Communities, Restoring Hope",
    missionDescription: "FCW was founded in 2019 with a simple belief: hunger is solvable. We connect generous donors with local partners to deliver nutritious meals to those who need them most — efficiently, transparently, and with dignity.",
    valuesTitle: "What We Stand For",
    team: [
      { name: "Amara Osei", role: "Co-Founder & Executive Director", bio: "Former UN WFP logistics lead with 12 years coordinating food distribution across 30+ countries.", initials: "AO" },
      { name: "James Whitfield", role: "Co-Founder & Operations", bio: "Supply-chain engineer who designed FCW's zero-waste meal delivery model.", initials: "JW" },
      { name: "Priya Sharma", role: "Head of Partnerships", bio: "Built relationships with 200+ local NGOs to ensure last-mile delivery in underserved regions.", initials: "PS" },
      { name: "Carlos Rivera", role: "Finance & Transparency", bio: "CPA and nonprofit auditor ensuring every dollar is tracked and reported publicly.", initials: "CR" },
    ],
    partners: ["World Food Programme", "UNICEF", "Feeding America", "Global FoodBanking Network", "Action Against Hunger", "Rise Against Hunger"],
  },
  stories: {
    heroBackgroundImage: "",
    featuredStoryId: "s1",
    stories: [
      { id: "s1", title: "How 10,000 meals reached Northern Nigeria in 72 hours", excerpt: "When flooding displaced 20,000 families across Borno State, our rapid-response team mobilised local kitchens and volunteer drivers to deliver hot meals within three days — the fastest deployment in FCW history.", fullContent: "When flooding displaced 20,000 families across Borno State, our rapid-response team mobilised local kitchens and volunteer drivers to deliver hot meals within three days — the fastest deployment in FCW history.\n\nThe operation began at 4am on a Tuesday when our regional coordinator received the first distress call. Within 6 hours, we had activated 12 community kitchens and mobilised 80 volunteer drivers.\n\nBy Thursday evening, 10,200 meals had reached families in the hardest-hit areas. This marked the fastest large-scale deployment in FCW history.", category: "Emergency", location: "Borno State, Nigeria", date: "Mar 2026", readTime: "6 min read", impact: "10,200 meals · 4,800 families", image: "" },
      { id: "s2", title: "School meals programme feeds 2,000 children daily in Cambodia", excerpt: "A partnership with local schools now ensures every child receives a nutritious lunch, boosting attendance by 34% and giving parents the confidence to send their children to class.", fullContent: "A partnership with local schools now ensures every child receives a nutritious lunch, boosting attendance by 34%.\n\nThe programme started with just 3 schools in rural Siem Reap. Today it covers 28 schools and serves over 2,000 children every single day.\n\nTeachers report that children are more focused, healthier, and happier — and parents no longer have to choose between sending their kids to school or to work.", category: "Education", location: "Siem Reap, Cambodia", date: "Feb 2026", readTime: "5 min read", impact: "2,000 daily meals · 34% attendance boost", image: "" },
      { id: "s3", title: "Community kitchens feeding 5,000 daily across West Africa", excerpt: "Our growing network of community kitchens in Ghana and Senegal now serves over 5,000 hot meals every day, powered entirely by local volunteers and donor generosity.", fullContent: "Our growing network of community kitchens in Ghana and Senegal now serves over 5,000 hot meals every day.\n\nEach kitchen is run by local volunteers who know their community's needs best. We provide the ingredients, training, and logistics — they provide the heart.\n\nThis model has proven so effective that we're now expanding to Côte d'Ivoire and Burkina Faso.", category: "Food Relief", location: "Accra, Ghana", date: "Jan 2026", readTime: "4 min read", impact: "5,000 daily meals · 120 volunteers", image: "" },
      { id: "s4", title: "Clean water stations transform three villages in Kenya's Rift Valley", excerpt: "Two solar-powered water stations now provide safe drinking water to 1,800 people. Combined with our meal programme, child malnutrition rates dropped 40% in six months.", fullContent: "Two solar-powered water stations now provide safe drinking water to 1,800 people in Kenya's Rift Valley.\n\nCombined with our ongoing meal programme, child malnutrition rates in the area dropped by 40% within just six months of installation.\n\nThe stations are maintained by trained community members, ensuring long-term sustainability.", category: "Clean Water", location: "Rift Valley, Kenya", date: "Dec 2025", readTime: "5 min read", impact: "12,000 meals · 2 water stations", image: "" },
      { id: "s5", title: "Winter relief reaches 4,500 displaced families in Eastern Europe", excerpt: "During the harshest winter months our programme provided warm meals, blankets, and emergency supplies across three countries to families who had lost everything.", fullContent: "During the harshest winter months, our programme provided warm meals, blankets, and emergency supplies across three countries.\n\n4,500 families who had lost everything received daily hot meals, warm clothing, and essential medical supplies throughout the winter season.", category: "Emergency", location: "Eastern Europe", date: "Nov 2025", readTime: "7 min read", impact: "4,500 families · 3 countries", image: "" },
      { id: "s6", title: "Emergency supply chain: from warehouse to table in 48 hours", excerpt: "A look inside FCW's logistics network that moved 30 tonnes of food and supplies from our regional hub to a disaster zone in under two days.", fullContent: "A look inside FCW's logistics network that moved 30 tonnes of food and supplies from our regional hub to a disaster zone in under two days.\n\nOur pre-positioned warehouses and trained logistics teams made this rapid response possible, turning donor generosity into real impact within hours.", category: "Emergency", location: "Mozambique", date: "Oct 2025", readTime: "4 min read", impact: "30 tonnes · 48 hours", image: "" },
    ],
  },
  donate: {
    heroTitle: "Feed Someone Today",
    heroSubtitle: "Every dollar you give delivers a meal. Choose your impact below.",
    presets: [5, 10, 20],
  },
  impact: {
    heroTitle: "Our Impact",
    heroSubtitle: "Transparent metrics showing exactly where your donations go and the lives they change.",
    mealsServed: 2_400_000,
    beneficiaries: 180_000,
    projectsCompleted: 42,
    chartData: [
      { quarter: "Q1 '25", meals: 480000 },
      { quarter: "Q2 '25", meals: 620000 },
      { quarter: "Q3 '25", meals: 540000 },
      { quarter: "Q4 '25", meals: 760000 },
    ],
    featuredStoryId: "i1",
    heroBackgroundImage: "",
    stories: [
      { id: "i1", title: "Community kitchens feeding 5,000 daily", excerpt: "Our growing network of community kitchens in Ghana and Senegal now serves over 5,000 hot meals every day, powered entirely by local volunteers and donor generosity.", fullContent: "Our growing network of community kitchens in Ghana and Senegal now serves over 5,000 hot meals every day, powered entirely by local volunteers and donor generosity.\n\nEach kitchen is staffed by trained community members who understand local dietary needs and cultural preferences. We provide ingredients, logistics support, and quality oversight.\n\nThis community-first model has proven remarkably efficient — reducing per-meal costs by 40% compared to centralised operations.", category: "Food Relief", location: "Accra, Ghana", date: "Jan 2026", readTime: "4 min read", impact: "5,000 daily meals · 120 volunteers", image: "" },
      { id: "i2", title: "Clean water & meals in rural Kenya", excerpt: "Thanks to donor support, FCW delivered over 12,000 meals and installed two clean water stations serving 3 villages in the Rift Valley.", fullContent: "Thanks to donor support, FCW delivered over 12,000 meals and installed two clean water stations serving 3 villages in Kenya's Rift Valley.\n\nThe solar-powered stations provide safe drinking water to 1,800 people daily. Combined with our nutrition programme, child malnutrition rates dropped 40% in six months.", category: "Clean Water", location: "Rift Valley, Kenya", date: "Dec 2025", readTime: "5 min read", impact: "12,000 meals · 2 water stations", image: "" },
      { id: "i3", title: "Winter relief across Eastern Europe", excerpt: "Our winter programme provided warm meals and emergency supplies to 4,500 displaced families across three countries during the harshest months.", fullContent: "Our winter programme provided warm meals and emergency supplies to 4,500 displaced families across three countries during the harshest winter months.\n\nTeams operated around the clock, delivering hot meals, blankets, and medical supplies to temporary shelters and community centres.", category: "Emergency", location: "Eastern Europe", date: "Nov 2025", readTime: "6 min read", impact: "4,500 families · 3 countries", image: "" },
    ],
  },
  footer: {
    tagline: "Feeding Communities Worldwide — delivering meals with dignity, efficiency, and full transparency.",
    email: "info@fcw.org",
    phone: "+1 555 123 4567",
    address: "123 Hope Street, New York, NY 10001",
  },
  pages: {
    home: true,
    impact: true,
    donate: true,
    stories: true,
    about: true,
  },
};

/* ── Context ── */
interface SiteConfigContextValue {
  config: SiteConfig;
  updateConfig: (patch: Partial<SiteConfig>) => void;
  resetConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextValue>({
  config: defaultConfig,
  updateConfig: () => {},
  resetConfig: () => {},
});

const STORAGE_KEY = "fcw-site-config";

function loadConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        branding: { ...defaultConfig.branding, ...parsed.branding },
        hero: { ...defaultConfig.hero, ...parsed.hero },
        homeMetrics: { ...defaultConfig.homeMetrics, ...parsed.homeMetrics },
        homePartners: { ...defaultConfig.homePartners, ...parsed.homePartners },
        howItWorks: { ...defaultConfig.howItWorks, ...parsed.howItWorks },
        contact: { ...defaultConfig.contact, ...parsed.contact },
        featuredStories: { ...defaultConfig.featuredStories, ...parsed.featuredStories },
        about: { ...defaultConfig.about, ...parsed.about },
        stories: { ...defaultConfig.stories, ...parsed.stories },
        donate: { ...defaultConfig.donate, ...parsed.donate },
        impact: { ...defaultConfig.impact, ...parsed.impact },
        footer: { ...defaultConfig.footer, ...parsed.footer },
        pages: { ...defaultConfig.pages, ...parsed.pages },
      };
    }
  } catch {}
  return defaultConfig;
}

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(loadConfig);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  // Update favicon dynamically
  useEffect(() => {
    if (config.branding.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = config.branding.faviconUrl;
    }
  }, [config.branding.faviconUrl]);

  const updateConfig = useCallback((patch: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export const useSiteConfig = () => useContext(SiteConfigContext);