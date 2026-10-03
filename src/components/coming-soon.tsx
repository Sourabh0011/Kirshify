import { ArrowRight, Check, type LucideIcon } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  cta?: { label: string; href: string };
  children?: React.ReactNode;
}

/** Placeholder for platform screens whose backend isn't connected yet. */
export function ComingSoon({ icon, title, description, features, cta = { label: "Browse the marketplace", href: "/marketplace" }, children }: ComingSoonProps) {
  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-6 rounded-3xl border border-line-soft bg-white p-6 sm:p-10">
        <div className="flex flex-col gap-4">
          <IconTile icon={icon} tone="leaf" size="lg" />
          <Badge tone="marigold" className="self-start">
            Coming soon
          </Badge>
          <h1 className="text-display-md">{title}</h1>
          <p className="max-w-xl leading-relaxed text-muted">{description}</p>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 rounded-2xl bg-mist p-4 text-[15px]">
              <Check className="mt-0.5 size-[18px] shrink-0 text-forest" strokeWidth={2.6} />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          {children}
          <ButtonLink href={cta.href} variant={children ? "outline" : "primary"}>
            {cta.label} <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
