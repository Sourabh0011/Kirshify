"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export interface ListingTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

/** Accessible tab strip; panels are rendered on the server and passed in. */
export function ListingTabs({ tabs }: { tabs: ListingTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="flex flex-col gap-5">
      <div role="tablist" aria-label="Listing details" className="scrollbar-none flex gap-1 overflow-x-auto border-b border-line-soft">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`ltab-${t.id}`}
            aria-selected={t.id === current.id}
            aria-controls={`lpanel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={cn(
              "-mb-px min-h-12 shrink-0 border-b-2 px-4 text-sm font-bold whitespace-nowrap transition-colors",
              t.id === current.id ? "border-forest text-forest" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`lpanel-${current.id}`} aria-labelledby={`ltab-${current.id}`}>
        {current.content}
      </div>
    </div>
  );
}
