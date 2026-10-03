/**
 * Marketing copy for the home page, in English and Hindi. Kept out of components so it can move
 * to a CMS or translation files (next-intl) later without touching layout code.
 */

export const heroCopy = {
  en: {
    eyebrow: "Made for Indian farmers",
    titleLead: "Your harvest. Your price.",
    titleAccent: "No middlemen.",
    body: "Sell your crop directly to buyers, check today's mandi rates and get farming advice in your own language — all from your phone.",
    primary: "Sell your crop",
    secondary: "Buy crops",
    trust: ["Free to join — 1% only when you sell", "Hindi, English & more", "Works on slow internet"],
    cards: {
      offer: "New offer from a buyer",
      offerCrop: "Onion · 120 qtl",
      offerPrice: "₹1,480/qtl · No broker",
      disease: "Early Blight",
      sure: "94% sure",
      remedy: "Organic fix: neem oil spray every 3 days",
      gain: "more money for the farmer",
    },
  },
  hi: {
    eyebrow: "भारतीय किसानों के लिए",
    titleLead: "आपकी फसल। आपका दाम।",
    titleAccent: "कोई बिचौलिया नहीं।",
    body: "अपनी फसल सीधे खरीदारों को बेचें, आज का मंडी भाव देखें और अपनी भाषा में खेती की सलाह पाएं — सब कुछ अपने फ़ोन से।",
    primary: "फसल बेचें",
    secondary: "फसल खरीदें",
    trust: ["जुड़ना मुफ़्त — बिकने पर ही 1%", "हिंदी, अंग्रेज़ी और अन्य भाषाएं", "धीमे नेटवर्क पर भी चलता है"],
    cards: {
      offer: "खरीदार का नया ऑफ़र",
      offerCrop: "प्याज़ · 120 क्विंटल",
      offerPrice: "₹1,480/क्विंटल · कोई दलाल नहीं",
      disease: "अगेती झुलसा",
      sure: "94% पक्का",
      remedy: "जैविक इलाज: हर 3 दिन नीम तेल का छिड़काव",
      gain: "किसान की ज़्यादा कमाई",
    },
  },
} as const;

export const quickActionsCopy = {
  en: {
    title: "What would you like to do today?",
    hint: "Tap any option to begin",
    items: ["Sell crop", "Buy crops", "Scan a leaf", "Mandi rates", "Ask advisor", "Tools & labour"],
    subs: ["Get direct offers", "Direct from farms", "Find plant disease", "Today's prices", "In your language", "Share nearby"],
  },
  hi: {
    title: "आज आप क्या करना चाहेंगे?",
    hint: "शुरू करने के लिए कोई भी विकल्प चुनें",
    items: ["फसल बेचें", "फसल खरीदें", "पत्ती स्कैन करें", "मंडी भाव", "सलाह लें", "मशीन व मज़दूर"],
    subs: ["सीधे ऑफ़र पाएं", "सीधे खेत से", "पौधे का रोग पहचानें", "आज के भाव", "अपनी भाषा में", "आस-पास साझा करें"],
  },
} as const;

export const liveCopy = {
  en: {
    title: "Today on your farm",
    mandi: "Today's mandi prices",
    perQtl: "/qtl",
    seeAll: "See all",
    weather: "Weather",
    forecast: "Forecast",
    humidity: "Humidity",
    wind: "Wind",
    rain: "Rain",
    days: "days",
    tip: "Today's farming tip",
    askMore: "Ask more",
  },
  hi: {
    title: "आज आपके खेत के लिए",
    mandi: "आज का मंडी भाव",
    perQtl: "/क्विंटल",
    seeAll: "सभी देखें",
    weather: "मौसम",
    forecast: "पूर्वानुमान",
    humidity: "नमी",
    wind: "हवा",
    rain: "बारिश",
    days: "दिन",
    tip: "आज की खेती सलाह",
    askMore: "और पूछें",
  },
} as const;

export type PillarId = "marketplace" | "doctor" | "mandi" | "advisor" | "pooling" | "weather";

/** Where each service's button leads. Copy lives in `featuresCopy`. */
export const pillars: { id: PillarId; n: string; href?: string; advisor?: boolean }[] = [
  { id: "marketplace", n: "01", href: "/marketplace" },
  { id: "doctor", n: "02", href: "/disease-scanner" },
  { id: "mandi", n: "03", href: "/mandi-prices" },
  { id: "advisor", n: "04", advisor: true },
  { id: "pooling", n: "05", href: "/marketplace" },
  { id: "weather", n: "06", href: "/weather" },
];

export interface PillarCopy {
  title: string;
  blurb: string;
  heading: string;
  description: string;
  bullets: string[];
  cta: string;
}

export const featuresCopy: Record<
  "en" | "hi",
  { eyebrow: string; title: string; description: string; tabsLabel: string; items: Record<PillarId, PillarCopy> }
> = {
  en: {
    eyebrow: "Our services",
    title: "Everything you need, in one app.",
    description: "From sowing to selling — tap any service to see how it helps you.",
    tabsLabel: "Kirshify services",
    items: {
      marketplace: {
        title: "Sell Directly to Buyers",
        blurb: "No middlemen, better price",
        heading: "Sell your crop directly. Keep the full price.",
        description:
          "Put your crop up for sale in a few minutes. Buyers see it, chat with you and make offers — no agent or commission man in between.",
        bullets: ["Add a photo, quantity and your price", "Talk to buyers directly on chat", "Pay just 1%, only when your crop is sold"],
        cta: "Go to marketplace",
      },
      doctor: {
        title: "Crop Doctor",
        blurb: "Find plant disease from a photo",
        heading: "Click a photo of the leaf. Know the disease and the cure.",
        description:
          "Take a photo of a sick leaf with your phone. Kirshify tells you the likely disease and suggests safe, organic remedies first.",
        bullets: ["Just one photo from your phone", "Shows how sure it is about the result", "Step-by-step organic treatment"],
        cta: "Scan a leaf",
      },
      mandi: {
        title: "Today's Mandi Rates",
        blurb: "Know the right price before you sell",
        heading: "Check today's mandi rate before you sell.",
        description:
          "See the latest rates from mandis near you. Every crop for sale shows the mandi rate too, so no one can push you to sell cheap.",
        bullets: ["Daily rates from government mandis", "Compare mandis near you", "Farmer and buyer see the same rate"],
        cta: "See today's rates",
      },
      advisor: {
        title: "Advice in Your Language",
        blurb: "Ask by voice or text",
        heading: "Ask any farming question — in your own language.",
        description:
          "Ask about seeds, pests, fertiliser or water. Get simple answers in Hindi, Marathi, Punjabi or English.",
        bullets: ["Speak or type your question", "Help with pests, fertiliser and crop care", "Advice that keeps the weather in mind"],
        cta: "Ask a question",
      },
      pooling: {
        title: "Rent Tractors & Find Labour",
        blurb: "Share machines and workers nearby",
        heading: "Rent a tractor or find workers in your area.",
        description:
          "Book machines lying idle with neighbouring farmers and find farm workers close by. Sharing saves money for everyone.",
        bullets: ["Tractors, sprayers and more from nearby farmers", "Find workers for sowing and harvest", "Lower cost, less waiting"],
        cta: "Find equipment",
      },
      weather: {
        title: "Weather & Crop Calendar",
        blurb: "Know when to sow and harvest",
        heading: "Know your village's weather. Plan sowing and harvest.",
        description: "Get the weather forecast for your area and a simple crop calendar — so rain doesn't spoil your harvest.",
        bullets: ["Weather forecast for your village", "Best time to sow and harvest each crop", "Rain alert before harvest"],
        cta: "Check the weather",
      },
    },
  },
  hi: {
    eyebrow: "हमारी सेवाएं",
    title: "खेती की हर ज़रूरत, एक ही ऐप में।",
    description: "बुवाई से बिक्री तक — कोई भी सेवा चुनें और देखें कि यह आपकी कैसे मदद करती है।",
    tabsLabel: "Kirshify की सेवाएं",
    items: {
      marketplace: {
        title: "सीधे खरीदार को बेचें",
        blurb: "बिचौलिया नहीं, बेहतर दाम",
        heading: "अपनी फसल सीधे बेचें। पूरा दाम आपका।",
        description:
          "कुछ ही मिनटों में अपनी फसल बिक्री के लिए डालें। खरीदार उसे देखते हैं, आपसे बात करते हैं और दाम लगाते हैं — बीच में कोई दलाल या आढ़तिया नहीं।",
        bullets: ["फोटो, मात्रा और अपना दाम डालें", "खरीदारों से सीधे चैट पर बात करें", "फसल बिकने पर ही सिर्फ़ 1% शुल्क"],
        cta: "बाज़ार देखें",
      },
      doctor: {
        title: "फसल डॉक्टर",
        blurb: "फोटो से पौधे का रोग पहचानें",
        heading: "पत्ती की फोटो खींचें। रोग और इलाज जानें।",
        description: "बीमार पत्ती की फोटो अपने फ़ोन से लें। Kirshify बताएगा कि कौन-सा रोग हो सकता है और पहले सुरक्षित, जैविक इलाज सुझाएगा।",
        bullets: ["फ़ोन से बस एक फोटो", "नतीजा कितना पक्का है, यह भी बताता है", "जैविक इलाज, एक-एक कदम में"],
        cta: "पत्ती स्कैन करें",
      },
      mandi: {
        title: "आज का मंडी भाव",
        blurb: "बेचने से पहले सही दाम जानें",
        heading: "बेचने से पहले आज का मंडी भाव देखें।",
        description:
          "अपने आस-पास की मंडियों के ताज़ा भाव देखें। बिकने वाली हर फसल के साथ मंडी भाव भी दिखता है, ताकि कोई आपको सस्ते में बेचने पर मजबूर न कर सके।",
        bullets: ["सरकारी मंडियों के रोज़ के भाव", "आस-पास की मंडियों की तुलना करें", "किसान और खरीदार को एक ही भाव दिखता है"],
        cta: "आज के भाव देखें",
      },
      advisor: {
        title: "अपनी भाषा में सलाह",
        blurb: "बोलकर या लिखकर पूछें",
        heading: "खेती का कोई भी सवाल पूछें — अपनी भाषा में।",
        description: "बीज, कीट, खाद या पानी के बारे में पूछें। हिंदी, मराठी, पंजाबी या अंग्रेज़ी में आसान जवाब पाएं।",
        bullets: ["बोलकर या लिखकर सवाल पूछें", "कीट, खाद और फसल की देखभाल पर मदद", "मौसम को ध्यान में रखकर सलाह"],
        cta: "सवाल पूछें",
      },
      pooling: {
        title: "ट्रैक्टर किराए पर, मज़दूर भी",
        blurb: "आस-पास मशीन और मज़दूर साझा करें",
        heading: "अपने इलाके में ट्रैक्टर किराए पर लें या मज़दूर ढूंढें।",
        description: "पड़ोसी किसानों की खाली पड़ी मशीनें बुक करें और पास में ही खेत मज़दूर पाएं। मिलकर इस्तेमाल करने से सबका खर्च बचता है।",
        bullets: ["पास के किसानों से ट्रैक्टर, स्प्रेयर और बहुत कुछ", "बुवाई और कटाई के लिए मज़दूर पाएं", "कम खर्च, कम इंतज़ार"],
        cta: "मशीन ढूंढें",
      },
      weather: {
        title: "मौसम और फसल कैलेंडर",
        blurb: "कब बोएं, कब काटें — जानें",
        heading: "अपने गांव का मौसम जानें। बुवाई और कटाई की योजना बनाएं।",
        description: "अपने इलाके का मौसम पूर्वानुमान और आसान फसल कैलेंडर पाएं — ताकि बारिश आपकी फसल खराब न करे।",
        bullets: ["आपके गांव का मौसम पूर्वानुमान", "हर फसल की बुवाई और कटाई का सही समय", "कटाई से पहले बारिश की चेतावनी"],
        cta: "मौसम देखें",
      },
    },
  },
};

export const howItWorksCopy = {
  en: {
    eyebrow: "How it works",
    title: "Sell your crop in 4 easy steps",
    description: "No paperwork, no running around. All you need is a phone.",
    cta: "Start selling",
    steps: [
      { title: "Sign up with your mobile number", body: "It's free and works on any smartphone." },
      { title: "Add your crop", body: "A photo, how much you have and your price." },
      { title: "Get offers from buyers", body: "Chat with buyers and pick the best offer." },
      { title: "Sell and earn more", body: "Pay just 1%, only after your crop is sold." },
    ],
  },
  hi: {
    eyebrow: "कैसे काम करता है",
    title: "4 आसान कदमों में फसल बेचें",
    description: "न कागज़ी झंझट, न भाग-दौड़। बस एक फ़ोन चाहिए।",
    cta: "बेचना शुरू करें",
    steps: [
      { title: "मोबाइल नंबर से जुड़ें", body: "मुफ़्त है और किसी भी स्मार्टफ़ोन पर चलता है।" },
      { title: "अपनी फसल डालें", body: "फोटो, कितनी फसल है और आपका दाम।" },
      { title: "खरीदारों से ऑफ़र पाएं", body: "खरीदारों से बात करें और सबसे अच्छा ऑफ़र चुनें।" },
      { title: "बेचें और ज़्यादा कमाएं", body: "फसल बिकने के बाद ही सिर्फ़ 1% शुल्क।" },
    ],
  },
} as const;

export const calculatorCopy = {
  en: {
    eyebrow: "Earnings calculator",
    title: "See how much more you earn.",
    description: "Choose your crop and quantity. See what a broker would leave you with, and what you keep on Kirshify.",
    chooseCrop: "1. Choose your crop",
    chooseQty: "2. How much are you selling?",
    quintal: "quintal",
    qtl: "qtl",
    perQtl: "/qtl",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    saleValue: "Sale value",
    broker: "Through a broker (15–20% cut)",
    kirshify: "On Kirshify (1% fee)",
    extra: "Extra money in your pocket",
    cta: "Start selling on Kirshify",
    note: "An estimate using today's mandi rate. It compares a usual 15–20% broker commission with Kirshify's 1% fee.",
  },
  hi: {
    eyebrow: "कमाई कैलकुलेटर",
    title: "देखें आप कितना ज़्यादा कमाते हैं।",
    description: "अपनी फसल और मात्रा चुनें। देखें कि दलाल के ज़रिए कितना मिलता है और Kirshify पर कितना।",
    chooseCrop: "1. अपनी फसल चुनें",
    chooseQty: "2. आप कितनी फसल बेच रहे हैं?",
    quintal: "क्विंटल",
    qtl: "क्विंटल",
    perQtl: "/क्विंटल",
    decrease: "मात्रा घटाएं",
    increase: "मात्रा बढ़ाएं",
    saleValue: "बिक्री मूल्य",
    broker: "दलाल के ज़रिए (15–20% कटौती)",
    kirshify: "Kirshify पर (1% शुल्क)",
    extra: "आपकी जेब में अतिरिक्त पैसा",
    cta: "Kirshify पर बेचना शुरू करें",
    note: "आज के मंडी भाव पर आधारित अनुमान। इसमें दलाल के आम 15–20% कमीशन की तुलना Kirshify के 1% शुल्क से की गई है।",
  },
} as const;

export const whyCopy = {
  en: {
    eyebrow: "Why Kirshify",
    title: "Made for Indian farmers.",
    description: "Simple to use, fair to you, and there whenever you need help.",
    primary: "Get started",
    secondary: "Browse marketplace",
    points: [
      { title: "Better price, no middlemen", body: "Sell straight to buyers and keep what brokers used to take." },
      { title: "Free to join", body: "No sign-up cost. Pay 1% only when your crop is sold." },
      { title: "In your language", body: "Hindi, English and more — ask by voice or text." },
      { title: "Works on any phone", body: "Light and fast, even on a slow network." },
      { title: "Same rate for everyone", body: "Farmer and buyer both see the same mandi rate." },
      { title: "Organic-first advice", body: "Remedies that protect your crop and your soil." },
    ],
  },
  hi: {
    eyebrow: "Kirshify क्यों",
    title: "भारतीय किसानों के लिए बना।",
    description: "इस्तेमाल में आसान, आपके लिए ईमानदार, और ज़रूरत पड़ने पर हमेशा साथ।",
    primary: "शुरू करें",
    secondary: "बाज़ार देखें",
    points: [
      { title: "बेहतर दाम, कोई बिचौलिया नहीं", body: "सीधे खरीदार को बेचें और दलाल का हिस्सा अपने पास रखें।" },
      { title: "जुड़ना मुफ़्त", body: "कोई पंजीकरण शुल्क नहीं। फसल बिकने पर ही 1%।" },
      { title: "आपकी अपनी भाषा में", body: "हिंदी, अंग्रेज़ी और अन्य भाषाएं — बोलकर या लिखकर।" },
      { title: "हर फ़ोन पर चलता है", body: "हल्का और तेज़, धीमे नेटवर्क पर भी।" },
      { title: "सबके लिए एक ही भाव", body: "किसान और खरीदार दोनों को एक ही मंडी भाव दिखता है।" },
      { title: "जैविक सलाह पहले", body: "ऐसे उपाय जो फसल और मिट्टी दोनों को बचाएं।" },
    ],
  },
} as const;

export const faqCopy = {
  en: {
    eyebrow: "Help",
    title: "Common questions",
    description: "Can't find your answer? Ask our advisor in your own language.",
    ask: "Ask Kirshify",
    items: [
      {
        q: "Is Kirshify free?",
        a: "Yes. Joining Kirshify is free. You pay a small 1% fee only when your crop is sold — nothing otherwise.",
      },
      {
        q: "Who decides the price of my crop?",
        a: "You do. You set your own price. Kirshify also shows today's mandi rate, so you and the buyer see the same number and no one can push you to sell cheap.",
      },
      {
        q: "Which languages can I use?",
        a: "The website works in Hindi and English. The advisor understands and replies in Hindi, Marathi, Punjabi and English, and more languages are coming.",
      },
      {
        q: "Do I need fast internet or an expensive phone?",
        a: "No. Kirshify is light and works on any smartphone, even on a slow network.",
      },
      {
        q: "How does the Crop Doctor work?",
        a: "Take a clear photo of a sick leaf. Kirshify tells you the likely disease, how sure it is, and organic remedies to try first. For serious problems, also check with your nearest Krishi Vigyan Kendra (KVK).",
      },
      {
        q: "I'm not used to apps. Can I still use Kirshify?",
        a: "Yes. Kirshify has big buttons and simple screens, and you can ask the advisor whenever you're stuck.",
      },
    ],
  },
  hi: {
    eyebrow: "मदद",
    title: "आम सवाल",
    description: "अपना जवाब नहीं मिला? हमारे सलाहकार से अपनी भाषा में पूछें।",
    ask: "Kirshify से पूछें",
    items: [
      {
        q: "क्या Kirshify मुफ़्त है?",
        a: "हाँ। Kirshify से जुड़ना मुफ़्त है। फसल बिकने पर ही 1% का छोटा-सा शुल्क लगता है — वरना कुछ नहीं।",
      },
      {
        q: "मेरी फसल का दाम कौन तय करता है?",
        a: "आप। अपना दाम आप खुद रखते हैं। Kirshify आज का मंडी भाव भी दिखाता है, ताकि आपको और खरीदार को एक ही भाव दिखे और कोई आपको सस्ते में बेचने पर मजबूर न कर सके।",
      },
      {
        q: "किन भाषाओं में इस्तेमाल कर सकते हैं?",
        a: "वेबसाइट हिंदी और अंग्रेज़ी में चलती है। सलाहकार हिंदी, मराठी, पंजाबी और अंग्रेज़ी में समझता और जवाब देता है, और भाषाएं जल्द आ रही हैं।",
      },
      {
        q: "क्या तेज़ इंटरनेट या महंगा फ़ोन चाहिए?",
        a: "नहीं। Kirshify हल्का है और किसी भी स्मार्टफ़ोन पर चलता है, धीमे नेटवर्क पर भी।",
      },
      {
        q: "फसल डॉक्टर कैसे काम करता है?",
        a: "बीमार पत्ती की साफ़ फोटो लें। Kirshify संभावित रोग, नतीजा कितना पक्का है, और पहले आज़माने लायक जैविक इलाज बताता है। गंभीर समस्या में अपने नज़दीकी कृषि विज्ञान केंद्र (KVK) से भी सलाह लें।",
      },
      {
        q: "ऐप चलाने की आदत नहीं है — क्या फिर भी इस्तेमाल कर सकते हैं?",
        a: "हाँ। Kirshify में बड़े बटन और आसान स्क्रीन हैं, और अटकने पर आप कभी भी सलाहकार से पूछ सकते हैं।",
      },
    ],
  },
} as const;

export const ctaCopy = {
  en: {
    title: "Get the full price for your harvest.",
    body: "Join free as a farmer or a buyer. You pay 1% only when a deal is done.",
    iAm: "I am a…",
    roles: { farmer: "Farmer", buyer: "Buyer" },
    phoneLabel: "Mobile number",
    submit: "Get started",
    hint: "We'll send a one-time code (OTP) to verify your number.",
    error: "Please enter a valid 10-digit mobile number.",
    sentTitle: "Almost there!",
    sent: (phone: string, role: string) => `We'll send a one-time code to +91 ${phone} to set up your ${role.toLowerCase()} account.`,
    change: "Use a different number",
    browse: "Browse the marketplace",
  },
  hi: {
    title: "अपनी फसल का पूरा दाम पाएं।",
    body: "किसान या खरीदार के रूप में मुफ़्त जुड़ें। सौदा होने पर ही 1% शुल्क।",
    iAm: "मैं हूँ…",
    roles: { farmer: "किसान", buyer: "खरीदार" },
    phoneLabel: "मोबाइल नंबर",
    submit: "शुरू करें",
    hint: "नंबर की पुष्टि के लिए हम एक OTP भेजेंगे।",
    error: "कृपया सही 10 अंकों का मोबाइल नंबर डालें।",
    sentTitle: "बस एक कदम और!",
    sent: (phone: string, role: string) => `हम +91 ${phone} पर OTP भेजेंगे, ताकि आपका ${role} खाता बन सके।`,
    change: "दूसरा नंबर डालें",
    browse: "बाज़ार देखें",
  },
} as const;
