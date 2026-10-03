import { ArrowRight, Check } from "lucide-react";

import { HomeScreen, MarketScreen, PhoneFrame, ScanScreen } from "@/components/mockups/phone";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const points = ["Works offline", "Lightweight & fast on any phone", "Local language support", "Big buttons, easy to navigate"];

export function AppShowcase() {
  return (
    <section className="relative overflow-hidden bg-deep py-18 text-white sm:py-24">
      <div aria-hidden="true" className="absolute -top-80 -right-72 size-[720px] rounded-full bg-[#0D3A2A]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div className="relative flex h-[520px] items-center justify-center sm:h-[600px]">
          <PhoneFrame className="absolute top-14 left-[2%] hidden scale-[0.82] -rotate-6 opacity-95 md:block">
            <MarketScreen />
          </PhoneFrame>
          <PhoneFrame className="relative z-10 scale-[0.86] sm:scale-95">
            <ScanScreen />
          </PhoneFrame>
          <PhoneFrame className="absolute top-14 right-[2%] hidden scale-[0.82] rotate-6 opacity-95 md:block">
            <HomeScreen />
          </PhoneFrame>
        </div>

        <div className="flex flex-col gap-6">
          <span className="eyebrow text-leaf">Smart &amp; simple</span>
          <h2 className="text-display-lg text-white">A mobile app built for rural, low-connectivity India.</h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-on-dark">
            Same power, less complexity. Kirshify runs as a lightweight progressive web app that keeps working when the network drops.
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-semibold">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-leaf text-ink">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/sell" variant="accent" size="lg">
              Get started
              <ArrowRight className="size-[18px]" />
            </ButtonLink>
            <ButtonLink href="/marketplace" variant="on-dark" size="lg">
              Open web app
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
