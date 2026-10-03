import { Check, Leaf, TrendingDown, X } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";

import { comparisonRows } from "../content";

export function WhyKirshify() {
  return (
    <Section tone="sage">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading eyebrow="Why Kirshify" title="1% instead of 15–20%. And a lot more in return." />

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative overflow-x-auto rounded-[28px] border border-line bg-white lg:flex-[1.3]">
            <table className="w-full min-w-[480px] text-left">
              <caption className="sr-only">Kirshify compared with a traditional mandi broker</caption>
              <thead className="bg-mist text-[13px] font-extrabold tracking-wide text-muted uppercase">
                <tr>
                  <th scope="col" className="px-5 py-4 sm:px-6">What you get</th>
                  <th scope="col" className="px-3 py-4 text-center">Mandi broker</th>
                  <th scope="col" className="px-3 py-4 text-center text-forest">Kirshify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft text-[15.5px] font-semibold">
                {comparisonRows.map((row) => (
                  <tr key={row}>
                    <th scope="row" className="px-5 py-4 font-semibold sm:px-6">{row}</th>
                    <td className="px-3 py-4">
                      <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-mist text-subtle">
                        <X className="size-4" strokeWidth={2.6} />
                        <span className="sr-only">No</span>
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-forest text-white">
                        <Check className="size-4" strokeWidth={3} />
                        <span className="sr-only">Yes</span>
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-mist">
                  <th scope="row" className="px-5 py-5 font-bold sm:px-6">What it costs you</th>
                  <td className="px-3 py-5 text-center text-lg font-extrabold text-marigold-ink">15–20%</td>
                  <td className="px-3 py-5 text-center">
                    <span className="rounded-full bg-forest px-3 py-1.5 font-extrabold text-white">1%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 lg:flex-1">
            <div className="flex flex-1 flex-col justify-between gap-4 rounded-[28px] bg-forest p-7 text-white">
              <span className="eyebrow text-leaf">Farmer profit surge</span>
              <span className="font-display text-7xl leading-[0.9] font-extrabold tracking-[-0.05em] sm:text-8xl">35–40%</span>
              <span className="leading-relaxed text-on-dark">Direct margin recovered by cutting out 4–6 layers of intermediaries.</span>
            </div>
            <div className="flex items-start gap-4 rounded-[22px] bg-white p-5">
              <IconTile icon={TrendingDown} tone="leaf" size="sm" />
              <span className="flex flex-col gap-1">
                <span className="font-extrabold">Less post-harvest wastage</span>
                <span className="text-[14.5px] leading-normal text-muted">Real-time buyer matching moves produce before it spoils in transit or storage.</span>
              </span>
            </div>
            <div className="flex items-start gap-4 rounded-[22px] bg-white p-5">
              <IconTile icon={Leaf} tone="leaf" size="sm" />
              <span className="flex flex-col gap-1">
                <span className="font-extrabold">Healthier soil</span>
                <span className="text-[14.5px] leading-normal text-muted">Organic-first remedies over blanket pesticide use, cutting chemical runoff.</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
