/**
 * Marketing copy for the home page. Kept out of components so it can move to a CMS
 * or translation files (next-intl) later without touching layout code.
 */

export const heroCopy = {
  en: {
    eyebrow: "AI-driven farm-to-consumer marketplace",
    titleLead: "Your harvest. Your price.",
    titleAccent: "No middlemen.",
    body: "Kirshify connects farmers and FPOs directly with buyers — with AI crop diagnosis, live mandi prices and expert advice in your own language. Built to return the 35–40% margin brokers take today.",
    primary: "Sell your crop",
    secondary: "Buy direct",
    trust: ["1% fee, only on closed trades", "हिंदी, मराठी, ਪੰਜਾਬੀ & more", "Works on low connectivity"],
  },
  hi: {
    eyebrow: "AI-आधारित खेत-से-ग्राहक बाज़ार",
    titleLead: "आपकी फसल। आपका दाम।",
    titleAccent: "कोई बिचौलिया नहीं।",
    body: "Kirshify किसानों और FPO को सीधे खरीदारों से जोड़ता है — AI फसल जाँच, लाइव मंडी भाव और आपकी अपनी भाषा में सलाह के साथ। ताकि दलालों का 35–40% मुनाफ़ा आपके पास रहे।",
    primary: "फसल बेचें",
    secondary: "सीधे खरीदें",
    trust: ["सौदा होने पर ही 1% शुल्क", "हिंदी, मराठी, ਪੰਜਾਬੀ और अन्य", "कम नेटवर्क में भी चलता है"],
  },
} as const;

export const quickActionsCopy = {
  en: {
    title: "What would you like to do today?",
    hint: "Tap any option to begin",
    items: ["Sell crop", "Buy produce", "Scan a leaf", "Mandi rates", "Ask advisor", "Tools & labour"],
    subs: ["Get direct offers", "Direct from farms", "Detect disease", "Live APMC prices", "Voice or text", "Share nearby"],
  },
  hi: {
    title: "आज आप क्या करना चाहेंगे?",
    hint: "शुरू करने के लिए कोई भी विकल्प चुनें",
    items: ["फसल बेचें", "उपज खरीदें", "पत्ती स्कैन करें", "मंडी भाव", "सलाह लें", "औज़ार व मज़दूर"],
    subs: ["सीधे ऑफ़र पाएं", "सीधे खेत से", "रोग पहचानें", "लाइव APMC भाव", "बोलकर या लिखकर", "आस-पास साझा करें"],
  },
} as const;

export type PillarId = "marketplace" | "doctor" | "mandi" | "advisor" | "pooling" | "weather";

export const pillars: {
  id: PillarId;
  n: string;
  title: string;
  blurb: string;
  tag: string;
  heading: string;
  description: string;
  bullets: string[];
  cta: { label: string; href?: string; advisor?: boolean };
}[] = [
  {
    id: "marketplace",
    n: "01",
    title: "P2P Direct Marketplace",
    blurb: "Sell direct to buyers",
    tag: "Marketplace",
    heading: "Trade directly with buyers. Keep the margin.",
    description:
      "Farmers and FPOs list produce in minutes. Bulk buyers and consumers browse live listings, chat with the grower and close the deal — no village agent, wholesaler or commission man in between.",
    bullets: ["List a crop with photo, quantity and asking price", "Chat and negotiate directly with buyers", "1% facilitation fee, charged only when a trade closes"],
    cta: { label: "Explore the marketplace", href: "/marketplace" },
  },
  {
    id: "doctor",
    n: "02",
    title: "AI Crop Disease Detection",
    blurb: "Leaf scan with organic remedies",
    tag: "AI Crop Doctor",
    heading: "Snap a leaf. Know the disease. Get an organic fix.",
    description:
      "Our ResNet-50 model, trained on 50,000+ PlantVillage images, identifies fungal infections and pest damage from a single phone photo — then recommends organic-first remedies.",
    bullets: ["Diagnosis from one mobile photo", "A confidence score with every result", "Organic-first treatment guides, step by step"],
    cta: { label: "Try a leaf scan", href: "/disease-scanner" },
  },
  {
    id: "mandi",
    n: "03",
    title: "Real-Time Mandi Pricing",
    blurb: "Live APMC rates via Agmarknet",
    tag: "Mandi Prices",
    heading: "Live mandi rates, so no one is forced into a distress sale.",
    description:
      "Kirshify syncs APMC prices from Agmarknet in real time. Every listing carries a fair floor price — full transparency that keeps cartels and panic selling out.",
    bullets: ["Live APMC rates via Agmarknet", "A fair floor price on every listing", "The same numbers for farmer and buyer"],
    cta: { label: "See today's prices", href: "/mandi-prices" },
  },
  {
    id: "advisor",
    n: "04",
    title: "Multilingual AI Advisory",
    blurb: "Voice or text, in your language",
    tag: "AI Advisory",
    heading: "Expert advice in your language — by voice or text.",
    description:
      "Ask about crop care, pests or fertiliser. Our Gemini-powered assistant answers in Hindi, Marathi, Punjabi and more regional languages — out loud, if you prefer.",
    bullets: ["Voice and text, in regional languages", "Crop care, pest control and fertilisation guidance", "Weather-aware recommendations"],
    cta: { label: "Ask the advisor now", advisor: true },
  },
  {
    id: "pooling",
    n: "05",
    title: "Resource & Labour Pooling",
    blurb: "Share tractors & crews nearby",
    tag: "Resource & Labour Pooling",
    heading: "Share tractors and crews across your village cluster.",
    description:
      "Book idle equipment from neighbours and find seasonal labour nearby. Local pooling cuts costs and idle time for everyone in the cluster.",
    bullets: ["Equipment sharing within village clusters", "Seasonal labour matched by location", "Lower costs, less idle machinery"],
    cta: { label: "Find equipment near you", href: "/marketplace" },
  },
  {
    id: "weather",
    n: "06",
    title: "Weather & Crop Calendar",
    blurb: "Know when to sow & harvest",
    tag: "Weather & Crop Calendar",
    heading: "Hyper-local forecasts that tell you when to sow and harvest.",
    description:
      "Micro-climate predictions for your village, turned into a crop calendar — so you time sowing and harvest around the monsoon instead of losing produce to it.",
    bullets: ["Village-level micro-climate forecasts", "Sowing and harvest windows for each crop", "Rain alerts before you harvest"],
    cta: { label: "Plan your season", href: "/weather" },
  },
];

export const brokerChain = ["Farmer", "Village agent", "Wholesaler", "Commission agent", "Retailer", "Consumer"];

export const problemStats = [
  { value: "60–65%", label: "of value captured by intermediaries before crops reach the market" },
  { value: "4–6", label: "layers of agents, wholesalers and commission men between farm and fork" },
  { value: "2–3×", label: "what consumers pay versus what the farmer was actually paid" },
];

export type RoleId = "farmers" | "fpos" | "buyers" | "labourers";

export const roles: {
  id: RoleId;
  tab: string;
  heading: string;
  bullets: string[];
  cta: { label: string; href: string };
  steps: { title: string; body: string }[];
}[] = [
  {
    id: "farmers",
    tab: "Farmers",
    heading: "Sell at a fair price, right from your phone.",
    bullets: ["Get direct offers from bulk buyers and consumers", "Scan sick leaves and get organic remedies", "Check live mandi rates and weather before you decide"],
    cta: { label: "Join as a farmer", href: "/sell" },
    steps: [
      { title: "Register with your mobile number", body: "Works on any smartphone, even on a slow network." },
      { title: "Scan and list your crop", body: "Add a photo, quantity and asking price." },
      { title: "Accept the best direct offer", body: "Pay just 1%, only when the trade closes." },
    ],
  },
  {
    id: "fpos",
    tab: "FPOs & Co-ops",
    heading: "Bring your members online and sell in bulk.",
    bullets: ["Onboard member farmers on a low-bandwidth app", "Aggregate produce for bulk buyers", "Pool equipment and labour across village clusters"],
    cta: { label: "Partner as an FPO", href: "/#start" },
    steps: [
      { title: "Apply to join the pilot", body: "We're onboarding 5 partner FPOs across 3 districts." },
      { title: "Onboard your member farmers", body: "Register members in their own language." },
      { title: "List aggregated produce", body: "Reach bulk buyers directly, at transparent prices." },
    ],
  },
  {
    id: "buyers",
    tab: "Crop Buyers",
    heading: "Buy direct from the farm, at transparent prices.",
    bullets: ["Source directly from farmers and FPOs", "Prices pegged to live APMC rates", "Fresher produce, with fewer hands between farm and you"],
    cta: { label: "Start buying", href: "/marketplace" },
    steps: [
      { title: "Create a buyer account", body: "Secure sign-in with your mobile number." },
      { title: "Browse live listings", body: "Filter by crop, quantity and location." },
      { title: "Chat with the grower and close the deal", body: "No commission agents in between." },
    ],
  },
  {
    id: "labourers",
    tab: "Farm Labourers",
    heading: "Find seasonal farm work close to home.",
    bullets: ["Work in your own village cluster", "See dates and location before you agree", "Get matched to crews by skill"],
    cta: { label: "Find work", href: "/#start" },
    steps: [
      { title: "Register with your mobile number", body: "Available in your language." },
      { title: "Add your skills and village", body: "Sowing, harvesting, spraying and more." },
      { title: "Get matched to nearby work", body: "Farmers and FPOs in your cluster find you." },
    ],
  },
];

export const cycleSteps = [
  { title: "Onboarding", body: "Farmer or FPO registers on the low-bandwidth web app." },
  { title: "Scan & list", body: "A leaf-scan health check, then the crop goes up for sale." },
  { title: "AI advisory", body: "Gemini-powered guidance in the farmer's own language." },
  { title: "Mandi price sync", body: "Live Agmarknet rates set a fair floor price." },
  { title: "Direct trade", body: "The marketplace connects buyer to farmer, one-to-one." },
  { title: "Higher earnings", body: "The farmer earns 35–40% more — and the loop repeats." },
];

export const comparisonRows = ["Direct P2P trading, no broker", "AI-based disease detection", "Real-time mandi price sync", "Multilingual voice advisory"];

export const faqs = [
  {
    q: "Is it free to join Kirshify?",
    a: "Yes. Signing up is free for farmers, FPOs, buyers and labourers. A 1% facilitation fee applies only when a marketplace trade successfully closes.",
  },
  {
    q: "Which languages does Kirshify support?",
    a: "The AI advisor speaks and writes Hindi, Marathi, Punjabi and English, with more regional languages being added.",
  },
  {
    q: "Do I need a fast internet connection?",
    a: "No. Kirshify is a lightweight progressive web app with an offline-first cache, built for low-connectivity villages. It syncs when you're back online.",
  },
  {
    q: "How accurate is the disease scanner?",
    a: "The scanner runs a ResNet-50 model trained on 50,000+ PlantVillage leaf images. Every result shows a confidence score, so you know how sure it is, and remedies are organic-first.",
  },
  {
    q: "How are crop prices decided?",
    a: "You set your asking price. Every listing also shows the live APMC rate from Agmarknet as a fair floor, so farmer and buyer see the same numbers.",
  },
  {
    q: "How can my FPO join the pilot?",
    a: "We're onboarding 5 partner FPOs across 3 districts for the pilot. Choose “Partner as an FPO” and our team will get in touch.",
  },
  {
    q: "Is my data safe?",
    a: "Sign-in is secured with Clerk authentication. [Add a one-line summary of your data-privacy policy here.]",
  },
];

export const roadmap = [
  { phase: "Phase 1", badge: "Pilot", title: "Prove it on the ground", body: "3 districts, 500 farmers and 5 partner FPOs — validating scan accuracy and marketplace liquidity." },
  { phase: "Phase 2", badge: "State rollout", title: "One state, FPO-led", body: "FPO-led onboarding across a full state, live Agmarknet sync and expanded regional-language advisory." },
  { phase: "Phase 3", badge: "National scale", title: "Every district", body: "Multi-state expansion through FPO federations, with labour pooling and weather modules live nationwide." },
];

/** Sample quotes for layout only — replace with real, consented testimonials before launch. */
export const sampleTestimonials = [
  { quote: "I sold my soybean directly to a buyer, got a better price and didn't have to deal with any middlemen.", name: "Ramesh Patel", place: "Farmer, Narsinghpur, MP" },
  { quote: "Our FPO lists aggregated wheat once and bulk buyers come to us. Members finally see the real mandi rate.", name: "Seoni Agro Producer Co.", place: "FPO, Seoni, MP" },
  { quote: "The leaf scan caught early blight on my tomatoes before it spread. The neem spray worked.", name: "Sunita Devi", place: "Farmer, Jabalpur, MP" },
];
