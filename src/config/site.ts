export const siteConfig = {
  name: "Kirshify",
  tagline: "Your harvest. Your price. No middlemen.",
  description:
    "Kirshify is an AI-driven farm-to-consumer marketplace for Indian agriculture — direct trade, AI crop disease detection, live mandi prices and advice in your own language.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  // TODO: replace with real contact details before launch.
  contact: { email: "[contact email]", phone: "[phone]" },
  defaultLocation: "Narsinghpur, Madhya Pradesh",
} as const;

export type NavItem = { label: string; href: string };

export const marketingNav: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Mandi Prices", href: "/mandi-prices" },
  { label: "Earnings", href: "/#earnings" },
  { label: "For FPOs", href: "/#roles" },
  { label: "FAQ", href: "/#faq" },
];

export const appNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Mandi Prices", href: "/mandi-prices" },
  { label: "AI Advisor", href: "/advisor" },
  { label: "Crop Doctor", href: "/disease-scanner" },
  { label: "Weather", href: "/weather" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Sell your crop", href: "/sell" },
      { label: "Mandi prices", href: "/mandi-prices" },
      { label: "AI Crop Doctor", href: "/disease-scanner" },
      { label: "AI Advisor", href: "/advisor" },
      { label: "Weather", href: "/weather" },
    ],
  },
  {
    title: "For you",
    links: [
      { label: "Farmers", href: "/#roles" },
      { label: "FPOs & Cooperatives", href: "/#roles" },
      { label: "Crop Buyers", href: "/#roles" },
      { label: "Farm Labourers", href: "/#roles" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Earnings calculator", href: "/#earnings" },
      { label: "Community", href: "/#community" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#start" },
    ],
  },
];
