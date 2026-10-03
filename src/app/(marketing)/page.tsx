import { getCrop } from "@/config/crops";
import { CtaSection } from "@/features/home/components/cta-section";
import { EarningsCalculator } from "@/features/home/components/earnings-calculator";
import { FaqSection } from "@/features/home/components/faq-section";
import { FeaturesSection } from "@/features/home/components/features-section";
import { Hero } from "@/features/home/components/hero";
import { HowItWorks } from "@/features/home/components/how-it-works";
import { LiveWidgets } from "@/features/home/components/live-widgets";
import { WhyKirshify } from "@/features/home/components/why-kirshify";
import { getAdvisoryTip, getMandiPrices, getWeather } from "@/server/services/market.service";

const WIDGET_CROPS = ["wheat", "soybean", "onion"];
const CALCULATOR_CROPS = ["wheat", "soybean", "basmati-rice", "onion", "cotton", "chana"];

export default async function HomePage() {
  const [prices, weather, tip] = await Promise.all([getMandiPrices(), getWeather(), getAdvisoryTip()]);

  const widgetPrices = WIDGET_CROPS.map((slug) => prices.find((p) => p.cropSlug === slug)).filter((p) => p !== undefined);
  const calculatorCrops = CALCULATOR_CROPS.map((slug) => prices.find((p) => p.cropSlug === slug))
    .filter((p) => p !== undefined)
    .map((p) => ({ slug: p.cropSlug, name: p.cropName, nameHi: getCrop(p.cropSlug)?.nameHi, rate: p.modalPrice }));

  return (
    <>
      <Hero />
      <LiveWidgets prices={widgetPrices} weather={weather} tip={tip} />
      <FeaturesSection />
      <HowItWorks />
      <EarningsCalculator crops={calculatorCrops} />
      <WhyKirshify />
      <FaqSection />
      <CtaSection />
    </>
  );
}
