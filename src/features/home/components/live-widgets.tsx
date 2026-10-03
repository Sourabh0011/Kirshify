import { ArrowDown, ArrowRight, ArrowUp, CloudSun, Droplets, Sparkles, Umbrella, Wind } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { cn, formatINR } from "@/lib/utils";
import type { AdvisoryTip, MandiPrice, WeatherSnapshot } from "@/types/market";

import { OpenAdvisorButton } from "./open-advisor-button";

interface LiveWidgetsProps {
  prices: MandiPrice[];
  weather: WeatherSnapshot;
  tip: AdvisoryTip;
}

/** "Today on your farm" strip: mandi, weather and advisory at a glance. */
export function LiveWidgets({ prices, weather, tip }: LiveWidgetsProps) {
  return (
    <section aria-labelledby="live-title" className="border-y border-line-soft bg-mist py-10 sm:py-12">
      <Container className="flex flex-col gap-5">
        <h2 id="live-title" className="eyebrow text-forest">
          Today on your farm · {weather.location}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article className="flex flex-col gap-4 rounded-3xl border border-line-soft bg-white p-5">
            <header className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2.5 font-extrabold">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-forest" />
                </span>
                Live mandi prices
              </span>
              <Link href="/mandi-prices" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold">
                See all <ArrowRight className="size-4" />
              </Link>
            </header>
            <ul className="grid grid-cols-3 divide-x divide-line-soft">
              {prices.map((p) => {
                const up = p.changePct >= 0;
                return (
                  <li key={p.cropSlug} className="flex flex-col gap-1 px-3 first:pl-0 last:pr-0">
                    <span className="text-[13px] font-semibold text-muted">{p.cropName}</span>
                    <span className="text-lg font-extrabold">
                      {formatINR(p.modalPrice)}
                      <span className="text-xs font-semibold text-muted">/qtl</span>
                    </span>
                    <span className={cn("inline-flex items-center gap-0.5 text-xs font-extrabold", up ? "text-forest" : "text-danger")}>
                      {up ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
                      {Math.abs(p.changePct).toFixed(1)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>

          <article className="flex flex-col gap-4 rounded-3xl border border-line-soft bg-white p-5">
            <header className="flex items-center justify-between">
              <span className="font-extrabold">Weather</span>
              <Link href="/weather" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold">
                Forecast <ArrowRight className="size-4" />
              </Link>
            </header>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <CloudSun className="size-12 text-marigold" strokeWidth={1.5} />
                <span className="flex flex-col">
                  <span className="font-display text-3xl font-bold">{weather.temperatureC}°C</span>
                  <span className="text-[13px] text-muted">{weather.condition}</span>
                </span>
              </div>
              <dl className="grid flex-1 gap-1.5 text-[13px]">
                <div className="flex items-center justify-between gap-2">
                  <dt className="inline-flex items-center gap-1.5 text-muted"><Droplets className="size-3.5" /> Humidity</dt>
                  <dd className="font-bold">{weather.humidityPct}%</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="inline-flex items-center gap-1.5 text-muted"><Wind className="size-3.5" /> Wind</dt>
                  <dd className="font-bold">{weather.windKmh} km/h</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="inline-flex items-center gap-1.5 text-muted"><Umbrella className="size-3.5" /> Rain</dt>
                  <dd className="font-bold">{weather.rainChancePct}% · {weather.rainWindowDays} days</dd>
                </div>
              </dl>
            </div>
          </article>

          <article className="flex flex-col gap-4 rounded-3xl border border-line-soft bg-white p-5 md:col-span-2 xl:col-span-1">
            <header className="flex items-center justify-between">
              <span className="font-extrabold">AI advisory · हिंदी</span>
              <OpenAdvisorButton className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-forest">
                Ask more <ArrowRight className="size-4" />
              </OpenAdvisorButton>
            </header>
            <div className="flex items-start gap-3 rounded-2xl bg-leaf-soft p-4">
              <IconTile icon={Sparkles} tone="white" size="sm" />
              <span className="flex flex-col gap-1">
                <span lang="hi" className="text-[15px] leading-relaxed font-semibold text-forest">{tip.text}</span>
                <span className="text-[13px] text-muted">{tip.translation}</span>
              </span>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
