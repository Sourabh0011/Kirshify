export const siteConfig = {
  name: "Kirshify",
  tagline: "Your harvest. Your price. No middlemen.",
  description:
    "Kirshify is an AI-driven farm-to-consumer marketplace for Indian agriculture — direct trade, AI crop disease detection, live mandi prices and advice in your own language.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  // TODO: replace with real contact details before launch.
  contact: { email: "limitless@sourabh.info" },
  defaultLocation: "Jabalpur, Madhya Pradesh",
} as const;

export type NavItem = { label: string; labelHi?: string; href: string };

export const marketingNav: NavItem[] = [
  { label: "Services", labelHi: "सेवाएं", href: "/#features" },
  { label: "How it works", labelHi: "कैसे काम करता है", href: "/#how-it-works" },
  { label: "Mandi Prices", labelHi: "मंडी भाव", href: "/mandi-prices" },
  { label: "Marketplace", labelHi: "बाज़ार", href: "/marketplace" },
  { label: "Earnings", labelHi: "कमाई", href: "/#earnings" },
  { label: "Help", labelHi: "मदद", href: "/#faq" },
];

export const appNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Mandi Prices", href: "/mandi-prices" },
  { label: "AI Advisor", href: "/advisor" },
  { label: "Crop Doctor", href: "/disease-scanner" },
  { label: "Weather", href: "/weather" },
];

export const footerNav: { title: string; titleHi: string; links: NavItem[] }[] = [
  {
    title: "Services",
    titleHi: "सेवाएं",
    links: [
      { label: "Sell your crop", labelHi: "फसल बेचें", href: "/sell" },
      { label: "Marketplace", labelHi: "बाज़ार", href: "/marketplace" },
      { label: "Mandi prices", labelHi: "मंडी भाव", href: "/mandi-prices" },
      { label: "Crop Doctor", labelHi: "फसल डॉक्टर", href: "/disease-scanner" },
      { label: "Ask the advisor", labelHi: "सलाह लें", href: "/advisor" },
      { label: "Weather", labelHi: "मौसम", href: "/weather" },
    ],
  },
  {
    title: "Help",
    titleHi: "मदद",
    links: [
      { label: "How it works", labelHi: "कैसे काम करता है", href: "/#how-it-works" },
      { label: "Earnings calculator", labelHi: "कमाई कैलकुलेटर", href: "/#earnings" },
      { label: "Common questions", labelHi: "आम सवाल", href: "/#faq" },
      { label: "Contact us", labelHi: "संपर्क करें", href: "/#start" },
    ],
  },
];
