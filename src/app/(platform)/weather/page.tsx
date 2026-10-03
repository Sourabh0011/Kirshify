import { Cloud, CloudRain, CloudSun, Droplets, Sparkles, Sun, Umbrella, Wind } from "lucide-react";
import type { Metadata } from "next";

import { IconTile } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";
import { getAdvisoryTip, getWeather } from "@/server/services/market.service";

export const metadata: Metadata = {
  title: "Weather & crop calendar",
  description: "Hyper-local forecast and sowing / harvest windows for your village.",
};

const conditionIcon = { sunny: Sun, cloudy: Cloud, rain: CloudRain };

const calendar = [
  { crop: "Wheat", stages: [{ label: "Sow", left: 0, width: 18, color: "bg-forest" }, { label: "Irrigate", left: 20, width: 50, color: "bg-[#3E7FC1]" }, { label: "Harvest", left: 80, width: 20, color: "bg-marigold" }] },
  { crop: "Chana", stages: [{ label: "Sow", left: 5, width: 15, color: "bg-forest" }, { label: "Irrigate", left: 25, width: 35, color: "bg-[#3E7FC1]" }, { label: "Harvest", left: 72, width: 20, color: "bg-marigold" }] },
  { crop: "Mustard", stages: [{ label: "Sow", left: 0, width: 14, color: "bg-forest" }, { label: "Irrigate", left: 18, width: 40, color: "bg-[#3E7FC1]" }, { label: "Harvest", left: 66, width: 18, color: "bg-marigold" }] },
];

export default async function WeatherPage() {
  const [weather, tip] = await Promise.all([getWeather(), getAdvisoryTip()]);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Weather &amp; crop calendar</h1>
        <p className="text-muted">Hyper-local forecast for {weather.location}, turned into farm decisions.</p>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-forest p-6 text-white sm:p-8">
          <div aria-hidden="true" className="absolute -right-24 -bottom-32 size-80 rounded-full bg-forest-600" />
          <div className="relative flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-on-dark-muted">{weather.location} · Today</span>
              <span className="font-display text-7xl leading-none font-bold">{weather.temperatureC}°C</span>
              <span className="text-lg text-on-dark">{weather.condition}</span>
              <span className="mt-1 self-start rounded-full bg-leaf px-3 py-1 text-sm font-extrabold text-ink">{weather.advisory}</span>
            </div>
            <CloudSun className="size-20 text-marigold" strokeWidth={1.3} />
          </div>
          <dl className="relative grid grid-cols-3 gap-3">
            {[
              { icon: Droplets, label: "Humidity", value: `${weather.humidityPct}%` },
              { icon: Wind, label: "Wind", value: `${weather.windKmh} km/h` },
              { icon: Umbrella, label: "Rain", value: `${weather.rainChancePct}%` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-1 rounded-2xl bg-white/10 p-3.5">
                <dt className="inline-flex items-center gap-1.5 text-[13px] text-on-dark-muted">
                  <Icon className="size-4" /> {label}
                </dt>
                <dd className="text-lg font-extrabold">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="flex flex-col gap-5">
          <section aria-labelledby="forecast-title" className="flex flex-col gap-4 rounded-3xl border border-line-soft bg-white p-5">
            <h2 id="forecast-title" className="font-extrabold">5-day forecast</h2>
            <ul className="grid grid-cols-5 gap-2">
              {weather.forecast.map((f) => {
                const Icon = conditionIcon[f.condition];
                const rain = f.condition === "rain";
                return (
                  <li key={f.day} className={cn("flex flex-col items-center gap-2 rounded-2xl py-3.5 text-sm font-bold", rain ? "bg-sky-soft text-sky-ink" : "bg-mist")}>
                    <span className={rain ? "" : "text-muted"}>{f.day}</span>
                    <Icon className={cn("size-7", f.condition === "sunny" && "text-marigold-ink")} strokeWidth={1.7} aria-label={f.condition} />
                    <span>{f.tempC}°</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="flex items-start gap-3.5 rounded-3xl bg-leaf-soft p-5">
            <IconTile icon={Sparkles} tone="white" size="sm" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-extrabold text-forest">AI advisory</span>
              <span lang="hi" className="text-[15px] leading-relaxed font-semibold text-forest">{tip.text}</span>
              <span className="text-[13px] text-muted">{tip.translation}</span>
            </span>
          </section>
        </div>
      </div>

      <section aria-labelledby="calendar-title" className="flex flex-col gap-5 rounded-3xl border border-line-soft bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="calendar-title" className="font-extrabold">Crop calendar · Rabi season</h2>
          <span className="text-[13px] text-muted">Sample windows — personalised calendars arrive with your farm profile</span>
        </div>
        <div className="flex flex-col gap-5">
          {calendar.map((row) => (
            <div key={row.crop} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="w-24 shrink-0 font-bold">{row.crop}</span>
              <div className="relative h-8 flex-1 rounded-full bg-mist">
                {row.stages.map((s) => (
                  <span
                    key={s.label}
                    className={cn("absolute inset-y-1 flex items-center justify-center overflow-hidden rounded-full text-[11px] font-extrabold whitespace-nowrap text-white", s.color, s.label === "Harvest" && "text-ink")}
                    style={{ left: `${s.left}%`, width: `${s.width}%` }}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
