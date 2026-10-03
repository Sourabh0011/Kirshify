import { Camera, IndianRupee, Languages } from "lucide-react";
import type { Metadata } from "next";

import { IconTile } from "@/components/ui/icon-tile";
import { SellCropForm } from "@/features/sell/components/sell-crop-form";
import { DEFAULT_MARKET, getMandiPrices } from "@/server/services/market.service";

export const metadata: Metadata = {
  title: "Sell your crop",
  description: "List your crop in minutes and get direct offers from genuine buyers.",
};

const tips = [
  { icon: Camera, title: "Add clear photos", body: "Good light, one close-up of the grain and one of the full lot." },
  { icon: IndianRupee, title: "Price near the mandi rate", body: "Pricing close to today's mandi rate helps buyers decide quickly." },
  { icon: Languages, title: "Need help?", body: "Ask the advisor in Hindi, Marathi, Punjabi or English." },
];

export default async function SellPage() {
  const prices = await getMandiPrices();
  const mandiRates = Object.fromEntries(prices.map((p) => [p.cropSlug, p.modalPrice]));

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Sell your crop</h1>
        <p className="text-muted">List your crop in minutes and connect with genuine buyers — no middlemen.</p>
      </header>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <SellCropForm mandiRates={mandiRates} defaultLocation={DEFAULT_MARKET} />

        <aside className="flex flex-col gap-4 rounded-3xl bg-forest p-6 text-white">
          <span className="eyebrow text-leaf">More listings · More buyers · More earnings</span>
          <ul className="flex flex-col gap-5">
            {tips.map((t) => (
              <li key={t.title} className="flex gap-3.5">
                <IconTile icon={t.icon} tone="accent" size="sm" />
                <span className="flex flex-col gap-0.5">
                  <span className="font-extrabold">{t.title}</span>
                  <span className="text-sm leading-relaxed text-on-dark">{t.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
