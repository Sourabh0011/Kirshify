"use client";

import { ArrowRight, Check, Landmark, Leaf, ShoppingBag, Users, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

import { roles, type RoleId } from "../content";

const roleIcons: Record<RoleId, LucideIcon> = { farmers: Leaf, fpos: Landmark, buyers: ShoppingBag, labourers: Users };

export function RolesSection() {
  const [active, setActive] = useState<RoleId>("farmers");
  const role = roles.find((r) => r.id === active)!;

  return (
    <Section id="roles" tone="sage">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for every link in the chain."
          description="Choose who you are to see what Kirshify does for you — and how to start."
        />

        <div role="tablist" aria-label="Choose your role" className="flex flex-wrap gap-2 self-start rounded-3xl border border-line bg-white p-1.5">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              id={`role-tab-${r.id}`}
              aria-selected={r.id === active}
              aria-controls={`role-panel-${r.id}`}
              onClick={() => setActive(r.id)}
              className={cn(
                "min-h-12 rounded-[18px] px-4 text-[15px] font-extrabold transition-colors sm:px-5",
                r.id === active ? "bg-forest text-white" : "text-ink-soft hover:text-forest",
              )}
            >
              {r.tab}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`role-panel-${role.id}`}
          aria-labelledby={`role-tab-${role.id}`}
          className="flex flex-col gap-8 rounded-[32px] bg-white p-5 sm:p-10 lg:flex-row lg:p-12"
        >
          <div className="flex flex-col gap-5 lg:flex-1">
            <IconTile icon={roleIcons[role.id]} tone="forest" size="lg" />
            <h3 className="text-display-md">{role.heading}</h3>
            <ul className="flex flex-col gap-3.5">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-3 leading-normal">
                  <Check className="mt-0.5 size-5 shrink-0 text-forest" strokeWidth={2.6} />
                  {b}
                </li>
              ))}
            </ul>
            <ButtonLink href={role.cta.href} className="mt-2 self-start">
              {role.cta.label}
              <ArrowRight className="size-[18px]" />
            </ButtonLink>
          </div>

          <div className="flex flex-col gap-5 rounded-3xl bg-mist p-5 sm:p-8 lg:w-[44%]">
            <h4 className="eyebrow text-forest">Get started in 3 steps</h4>
            <ol className="flex flex-col gap-5">
            {role.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full font-extrabold",
                    i === role.steps.length - 1 ? "bg-leaf text-ink" : "bg-forest text-white",
                  )}
                >
                  {i + 1}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-extrabold">{step.title}</span>
                  <span className="text-[14.5px] leading-normal text-muted">{step.body}</span>
                </span>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
