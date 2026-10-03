import { ClipboardList, CloudSun, House, MapPin, MessageSquare, Mic, ScanLine, ShoppingBag, TrendingUp, TriangleAlert, Users } from "lucide-react";

import { CropArt } from "@/components/ui/crop-art";
import { cn } from "@/lib/utils";

/** Device frame for product mockups. Purely decorative — hidden from assistive tech. */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-[604px] w-[296px] shrink-0 rounded-[46px] bg-[#07130E] p-2.5 shadow-[0_40px_80px_rgb(3_20_12/0.45)]",
        className,
      )}
    >
      <div className="flex size-full flex-col overflow-hidden rounded-[37px] bg-mist text-ink">{children}</div>
    </div>
  );
}

function BottomNav({ active }: { active: "home" | "market" | "advisor" | "community" }) {
  const items = [
    { id: "home", label: "Home", icon: House },
    { id: "market", label: "Market", icon: ShoppingBag },
    { id: "advisor", label: "Advisor", icon: MessageSquare },
    { id: "community", label: "Community", icon: Users },
  ] as const;
  return (
    <div className="mt-auto flex h-[62px] shrink-0 items-center justify-around border-t border-line-soft bg-white text-[10px] font-bold text-subtle">
      {items.map(({ id, label, icon: Icon }) => (
        <span key={id} className={cn("flex flex-col items-center gap-1", active === id && "text-forest")}>
          <Icon className="size-5" strokeWidth={1.9} />
          {label}
        </span>
      ))}
    </div>
  );
}

export function HomeScreen() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-[11px] px-4 pt-[22px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="inline-flex items-center gap-1 text-[11.5px] text-muted">
              <MapPin className="size-3" strokeWidth={2} /> Narsinghpur, MP
            </span>
            <span className="font-display text-lg font-bold tracking-tight">Namaste, Kisan ji</span>
          </div>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-marigold text-[13px] font-extrabold">KJ</span>
        </div>
        <div className="flex items-start justify-between rounded-[18px] bg-forest p-3.5 text-white">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11.5px] text-on-dark-muted">Today · Partly cloudy</span>
            <span className="font-display text-[34px] leading-none font-bold">28°C</span>
            <span className="self-start rounded-full bg-leaf px-2 py-1 text-[11px] font-extrabold text-ink">Ideal sowing window</span>
          </div>
          <CloudSun className="size-11 text-marigold" strokeWidth={1.5} />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-line-soft bg-white px-3 py-2.5">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-muted">Mandi · Wheat</span>
            <span className="text-base font-extrabold">
              ₹2,340<span className="text-[11px] font-semibold text-muted">/qtl</span>
            </span>
          </div>
          <span className="rounded-lg bg-leaf-soft px-2 py-1 text-xs font-extrabold text-forest">▲ 2.1%</span>
        </div>
        <div className="flex flex-col gap-1.5 rounded-2xl border border-line-soft bg-white px-3 py-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-forest">
            <Mic className="size-3.5" strokeWidth={2} /> AI Advisory · हिंदी
          </span>
          <span lang="hi" className="text-[13.5px] leading-normal font-semibold">
            अगले 3 दिन बारिश की संभावना — कटाई टालें
          </span>
          <span className="text-[11px] text-muted">Rain likely in the next 3 days — delay harvest.</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Scan", icon: ScanLine },
            { label: "Sell", icon: TrendingUp },
            { label: "Pool", icon: Users },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1 rounded-[14px] border border-line-soft bg-white py-2.5 text-[11.5px] font-bold">
              <Icon className="size-[22px] text-forest" strokeWidth={1.8} />
              {label}
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </>
  );
}

const marketRows = [
  { slug: "soybean", name: "Soybean", qty: "80 qtl", price: "₹4,210" },
  { slug: "onion", name: "Onion", qty: "120 qtl", price: "₹1,480" },
  { slug: "wheat", name: "Wheat", qty: "100 qtl", price: "₹2,340" },
  { slug: "cotton", name: "Cotton", qty: "30 qtl", price: "₹6,900" },
];

export function MarketScreen() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-2.5 px-4 pt-[22px]">
        <span className="font-display text-lg font-bold tracking-tight">P2P Marketplace</span>
        <span className="rounded-xl border border-line-soft bg-white px-3 py-2 text-[11px] text-subtle">Search crops, e.g. soybean…</span>
        {marketRows.map((row) => (
          <div key={row.slug} className="flex items-center gap-2.5 rounded-2xl bg-white p-2">
            <span className="size-11 shrink-0 overflow-hidden rounded-xl">
              <CropArt cropSlug={row.slug} alt="" />
            </span>
            <span className="flex flex-1 flex-col">
              <span className="text-[13px] font-extrabold">{row.name}</span>
              <span className="text-[11px] text-muted">{row.qty}</span>
            </span>
            <span className="flex flex-col items-end">
              <span className="text-[13px] font-extrabold">{row.price}</span>
              <span className="text-[10px] font-bold text-forest">Direct buyer</span>
            </span>
          </div>
        ))}
        <span className="mt-1 rounded-xl border-[1.5px] border-dashed border-forest py-2 text-center text-xs font-extrabold text-forest">+ List new crop</span>
      </div>
      <BottomNav active="market" />
    </>
  );
}

export function ScanScreen() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-3 bg-deep px-4 pt-[22px] text-white">
        <span className="font-display text-lg font-bold tracking-tight">Disease Scanner</span>
        <div className="relative grid h-[230px] place-items-center overflow-hidden rounded-2xl bg-forest-600">
          <svg width="150" height="150" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M50 92C22 74 14 46 30 20c10-16 30-14 40 0 16 26 8 54-20 72z" fill="#86C25E" />
            <path d="M50 92V22M50 40L36 30M50 52L33 42M50 64L36 56M50 40l14-10M50 52l17-10M50 64l14-8" stroke="#5E9A3E" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="38" cy="48" r="5" fill="#7A5A22" />
            <circle cx="61" cy="60" r="6" fill="#7A5A22" />
            <circle cx="57" cy="34" r="3.5" fill="#7A5A22" />
          </svg>
          <span className="absolute inset-x-6 h-0.5 animate-scan bg-leaf shadow-[0_0_12px_#A8E05F]" />
          <span className="absolute bottom-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold">Scanning leaf…</span>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-white p-3.5 text-ink">
          <span className="inline-flex items-center gap-1.5 text-sm font-extrabold">
            <TriangleAlert className="size-4 text-marigold-ink" strokeWidth={2} /> Early Blight detected
          </span>
          <div className="h-1.5 overflow-hidden rounded-full bg-line-soft">
            <div className="h-full w-[94%] rounded-full bg-forest" />
          </div>
          <span className="text-xs text-ink-soft">94% confidence · Organic fix: neem oil spray, 3-day interval</span>
          <span className="rounded-xl bg-forest py-2 text-center text-xs font-extrabold text-white">View remedy guide</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-on-dark-muted">
          <ClipboardList className="size-3.5" /> Saved to your crop health log
        </span>
      </div>
      <BottomNav active="advisor" />
    </>
  );
}
