"use client";

import { IndianRupee, Mic, ScanLine, ShoppingBag, Tractor, TrendingUp, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { IconTile, type IconTone } from "@/components/ui/icon-tile";
import { useAdvisor } from "@/providers/advisor-provider";
import { useLanguage } from "@/providers/language-provider";

import { quickActionsCopy } from "../content";

const actions: { icon: LucideIcon; tone: IconTone; href?: string; advisor?: boolean }[] = [
  { icon: TrendingUp, tone: "forest", href: "/sell" },
  { icon: ShoppingBag, tone: "marigold", href: "/marketplace" },
  { icon: ScanLine, tone: "mint", href: "/disease-scanner" },
  { icon: IndianRupee, tone: "sky", href: "/mandi-prices" },
  { icon: Mic, tone: "plum", advisor: true },
  { icon: Tractor, tone: "rose", href: "/#features" },
];

const tileClass =
  "group flex min-h-34 flex-col gap-3.5 rounded-[20px] bg-mist p-4 text-left text-ink transition hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_var(--color-forest)] sm:p-[18px]";

export function QuickActions() {
  const { lang } = useLanguage();
  const { openAdvisor } = useAdvisor();
  const t = quickActionsCopy[lang];

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-[28px] border border-line-soft bg-white p-4 shadow-card sm:mt-12 sm:p-6" lang={lang}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-lg font-extrabold sm:text-xl">{t.title}</h2>
        <span className="text-sm text-muted">{t.hint}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {actions.map((action, i) => {
          const inner = (
            <>
              <IconTile icon={action.icon} tone={action.tone} size="md" />
              <span className="flex flex-col gap-0.5">
                <span className="text-base font-extrabold">{t.items[i]}</span>
                <span className="text-[13.5px] text-muted">{t.subs[i]}</span>
              </span>
            </>
          );
          return action.advisor ? (
            <button key={i} type="button" onClick={() => openAdvisor()} className={tileClass}>
              {inner}
            </button>
          ) : (
            <Link key={i} href={action.href!} className={tileClass}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
