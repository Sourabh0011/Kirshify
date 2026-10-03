import {
  CloudRain,
  CloudSun,
  Cloud,
  MapPin,
  Mic,
  RefreshCw,
  ShieldCheck,
  Sprout,
  Sun,
  Tractor,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

import { CropArt } from "@/components/ui/crop-art";
import { IconTile, type IconTone } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";

import type { PillarId } from "../content";

/** Static product previews shown beside each feature tab (illustrative sample data). */
export function FeaturePreview({ id }: { id: PillarId }) {
  switch (id) {
    case "marketplace":
      return <MarketplacePreview />;
    case "doctor":
      return <DoctorPreview />;
    case "mandi":
      return <MandiPreview />;
    case "advisor":
      return <AdvisorPreview />;
    case "pooling":
      return <PoolingPreview />;
    case "weather":
      return <WeatherPreview />;
  }
}

function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex h-full flex-col gap-2.5 rounded-[22px] bg-sage p-4", className)}>{children}</div>;
}

const listings = [
  { slug: "basmati-rice", name: "Basmati Rice", qty: "50 qtl", price: "₹3,120/qtl" },
  { slug: "onion", name: "Onion", qty: "120 qtl", price: "₹1,480/qtl" },
  { slug: "cotton", name: "Cotton", qty: "30 qtl", price: "₹6,900/qtl" },
  { slug: "soybean", name: "Soybean", qty: "80 qtl", price: "₹4,210/qtl" },
];

function MarketplacePreview() {
  return (
    <Panel>
      <div className="flex items-center justify-between px-1 pb-1.5">
        <span className="font-extrabold">Live listings</span>
        <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-muted">
          <MapPin className="size-3.5" /> Near Narsinghpur
        </span>
      </div>
      {listings.map((l) => (
        <div key={l.slug} className="flex items-center gap-3 rounded-2xl bg-white p-2.5">
          <span className="size-11 shrink-0 overflow-hidden rounded-xl">
            <CropArt cropSlug={l.slug} alt="" />
          </span>
          <span className="flex flex-1 flex-col">
            <span className="text-[14.5px] font-extrabold">{l.name}</span>
            <span className="text-[12.5px] text-muted">{l.qty}</span>
          </span>
          <span className="flex flex-col items-end gap-1">
            <span className="text-[14.5px] font-extrabold">{l.price}</span>
            <span className="rounded-full bg-leaf-soft px-2 py-0.5 text-[11px] font-extrabold text-forest">Direct buyer</span>
          </span>
        </div>
      ))}
      <span className="mt-1 rounded-2xl border-[1.5px] border-dashed border-forest py-3 text-center text-sm font-extrabold text-forest">
        + List a new crop
      </span>
    </Panel>
  );
}

function DoctorPreview() {
  return (
    <Panel className="bg-deep">
      <div className="relative grid h-56 place-items-center overflow-hidden rounded-2xl bg-forest-600">
        <svg width="160" height="160" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 92C22 74 14 46 30 20c10-16 30-14 40 0 16 26 8 54-20 72z" fill="#86C25E" />
          <path d="M50 92V22M50 40L36 30M50 52L33 42M50 64L36 56M50 40l14-10M50 52l17-10M50 64l14-8" stroke="#5E9A3E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="48" r="5" fill="#7A5A22" />
          <circle cx="61" cy="60" r="6" fill="#7A5A22" />
          <circle cx="57" cy="34" r="3.5" fill="#7A5A22" />
        </svg>
        {["top-4 left-4 border-t-3 border-l-3 rounded-tl-lg", "top-4 right-4 border-t-3 border-r-3 rounded-tr-lg", "bottom-4 left-4 border-b-3 border-l-3 rounded-bl-lg", "bottom-4 right-4 border-b-3 border-r-3 rounded-br-lg"].map((c) => (
          <span key={c} className={cn("absolute size-7 border-leaf", c)} />
        ))}
        <span className="absolute inset-x-6 h-0.5 animate-scan bg-leaf shadow-[0_0_12px_#A8E05F]" />
        <span className="absolute bottom-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11.5px] font-bold text-white">Scanning leaf…</span>
      </div>
      <div className="flex flex-col gap-2.5 rounded-2xl bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-extrabold">
            <TriangleAlert className="size-[18px] text-marigold-ink" /> Early Blight detected
          </span>
          <span className="text-sm font-extrabold text-forest">94%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line-soft">
          <div className="h-full w-[94%] rounded-full bg-forest" />
        </div>
        <span className="text-sm text-ink-soft">
          <b>Organic fix:</b> neem oil spray, 3-day interval
        </span>
      </div>
    </Panel>
  );
}

const rates = [
  { crop: "Wheat", price: "2,340", change: "▲ 2.1%" },
  { crop: "Basmati Rice", price: "3,120" },
  { crop: "Onion", price: "1,480" },
  { crop: "Cotton", price: "6,900" },
  { crop: "Soybean", price: "4,210", change: "▲ 2.1%" },
];

function MandiPreview() {
  return (
    <Panel>
      <div className="flex items-center justify-between px-1">
        <span className="font-extrabold">Today&apos;s APMC rates</span>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-muted">
          <RefreshCw className="size-3.5" /> Agmarknet sync
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white">
        <div className="grid grid-cols-3 border-b border-line-soft px-4 py-2.5 text-[11.5px] font-extrabold tracking-wider text-muted uppercase">
          <span>Crop</span>
          <span className="text-right">₹ / qtl</span>
          <span className="text-right">Today</span>
        </div>
        {rates.map((r) => (
          <div key={r.crop} className="grid grid-cols-3 border-b border-line-soft px-4 py-3 text-[14.5px] last:border-0">
            <span className="font-bold">{r.crop}</span>
            <span className="text-right font-extrabold">{r.price}</span>
            <span className="text-right">
              {r.change ? (
                <span className="rounded-md bg-leaf-soft px-1.5 py-0.5 text-xs font-extrabold text-forest">{r.change}</span>
              ) : (
                <span className="text-[12.5px] font-bold text-muted">Live</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-forest p-3.5 text-white">
        <ShieldCheck className="size-[22px] shrink-0 text-leaf" />
        <span className="text-[13.5px] leading-snug">
          Floor price of <b>₹2,340/qtl</b> applied to your wheat listing
        </span>
      </div>
    </Panel>
  );
}

function AdvisorPreview() {
  return (
    <Panel className="gap-3.5">
      <div className="flex flex-wrap gap-2">
        {["हिंदी", "मराठी", "ਪੰਜਾਬੀ", "English", "+ more"].map((l, i) => (
          <span key={l} className={cn("rounded-full px-3 py-1.5 text-[13px] font-bold", i === 0 ? "bg-forest text-white" : "bg-white text-ink-soft")}>
            {l}
          </span>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        <span lang="hi" className="self-end rounded-2xl rounded-br-md bg-forest px-3.5 py-3 text-[14.5px] text-white">
          गेहूं की कटाई कब करूं?
        </span>
        <div className="flex max-w-[90%] flex-col gap-1.5 self-start rounded-2xl rounded-bl-md bg-white p-3.5">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold text-forest">
            <Sprout className="size-3.5" /> Kirshify Advisor
          </span>
          <span lang="hi" className="text-[15px] leading-relaxed font-semibold">
            अगले 3 दिन बारिश की संभावना — कटाई टालें।
          </span>
          <span className="text-[12.5px] text-muted">Rain likely in the next 3 days — delay the harvest.</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-4 text-sm text-subtle">
        <span className="flex-1">Ask about crops, pests, weather…</span>
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-forest text-white">
          <Mic className="size-[18px]" />
        </span>
      </div>
    </Panel>
  );
}

const pool: { icon: LucideIcon; tone: IconTone; title: string; meta: string }[] = [
  { icon: Tractor, tone: "marigold", title: "Tractor · 45 HP", meta: "2 km away · Free Thu–Sat" },
  { icon: Users, tone: "leaf", title: "Harvest crew · 8 workers", meta: "4 km away · From next week" },
  { icon: Sprout, tone: "sky", title: "Sprayer pump", meta: "1 km away · Free today" },
];

function PoolingPreview() {
  return (
    <Panel>
      <div className="flex items-center justify-between px-1 pb-1.5">
        <span className="font-extrabold">Available in your cluster</span>
        <span className="text-[12.5px] font-bold text-muted">Within 5 km</span>
      </div>
      {pool.map((p) => (
        <div key={p.title} className="flex items-center gap-3 rounded-2xl bg-white p-3.5">
          <IconTile icon={p.icon} tone={p.tone} />
          <span className="flex flex-1 flex-col">
            <span className="text-[14.5px] font-extrabold">{p.title}</span>
            <span className="text-[12.5px] text-muted">{p.meta}</span>
          </span>
          <span className="rounded-full bg-forest px-3.5 py-2 text-[13px] font-extrabold text-white">Request</span>
        </div>
      ))}
      <span className="mt-1 rounded-2xl border-[1.5px] border-dashed border-forest py-3 text-center text-sm font-extrabold text-forest">
        + Offer your equipment
      </span>
    </Panel>
  );
}

const forecastIcon = { sunny: Sun, cloudy: Cloud, rain: CloudRain };
const forecast = [
  { day: "Mon", t: 29, c: "sunny" },
  { day: "Tue", t: 27, c: "cloudy" },
  { day: "Wed", t: 24, c: "rain" },
  { day: "Thu", t: 23, c: "rain" },
  { day: "Fri", t: 28, c: "sunny" },
] as const;

function WeatherPreview() {
  return (
    <Panel>
      <div className="flex items-start justify-between rounded-[18px] bg-forest p-4 text-white">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] text-on-dark-muted">Narsinghpur · Today</span>
          <span className="font-display text-[44px] leading-none font-bold">28°C</span>
          <span className="self-start rounded-full bg-leaf px-2.5 py-1 text-xs font-extrabold text-ink">Ideal sowing window</span>
        </div>
        <CloudSun className="size-14 text-marigold" strokeWidth={1.5} />
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {forecast.map((f) => {
          const Icon = forecastIcon[f.c];
          const rain = f.c === "rain";
          return (
            <div key={f.day} className={cn("flex flex-col items-center gap-1.5 rounded-xl py-2.5 text-xs font-bold", rain ? "bg-sky-soft text-sky-ink" : "bg-white")}>
              <span className={rain ? "" : "text-muted"}>{f.day}</span>
              <Icon className={cn("size-[22px]", f.c === "sunny" && "text-marigold-ink")} strokeWidth={1.8} />
              <span>{f.t}°</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4">
        <span className="text-sm font-extrabold">Crop calendar · Wheat</span>
        {[
          { label: "Sow", left: "0%", width: "18%", color: "bg-forest" },
          { label: "Irrigate", left: "20%", width: "50%", color: "bg-[#3E7FC1]" },
          { label: "Harvest", left: "80%", width: "20%", color: "bg-marigold" },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2.5 text-xs font-bold">
            <span className="w-16 shrink-0 text-muted">{row.label}</span>
            <span className="relative h-3 flex-1 rounded-full bg-mist">
              <span className={cn("absolute inset-y-0 rounded-full", row.color)} style={{ left: row.left, width: row.width }} />
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
