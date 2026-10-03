"use client";

import { BadgeCheck, MessageSquare, Phone, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { buttonClasses } from "@/components/ui/button";
import { cn, maskPhone } from "@/lib/utils";
import type { Seller } from "@/types/listing";

/** Seller summary with a privacy-friendly "show number" step before calling. */
export function SellerCard({ seller, listingId }: { seller: Seller; listingId: string }) {
  const [revealed, setRevealed] = useState(false);
  const tel = seller.phone.replace(/\s/g, "");

  return (
    <section aria-label="Seller" className="flex flex-col gap-4 rounded-3xl border border-line-soft bg-white p-5">
      <div className="flex items-center gap-3.5">
        <Avatar name={seller.name} size="lg" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 text-lg font-extrabold">
            <span className="truncate">{seller.name}</span>
            {seller.verified && <BadgeCheck className="size-[18px] shrink-0 text-forest" aria-label="Verified seller" />}
          </span>
          <span className="text-[13px] text-muted">
            {seller.type === "farmer" ? "Farmer" : "FPO"} · {seller.experienceYears} years experience
          </span>
          <span className="inline-flex items-center gap-1 text-[13px] font-bold">
            <Star className="size-4 fill-marigold text-marigold" />
            {seller.rating.toFixed(1)}
            <span className="font-semibold text-muted">({seller.reviewCount} reviews)</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3 text-sm">
        <span className="text-muted">Mobile</span>
        <span className="font-extrabold tabular-nums">{revealed ? seller.phone : maskPhone(seller.phone)}</span>
      </div>

      <Link href={`/messages?listing=${listingId}`} className={buttonClasses({ className: "w-full rounded-xl" })}>
        <MessageSquare className="size-[18px]" /> Message seller
      </Link>
      {revealed ? (
        <a href={`tel:${tel}`} className={buttonClasses({ variant: "soft", className: "w-full rounded-xl" })}>
          <Phone className="size-[18px]" /> Call {seller.name.split(" ")[0]}
        </a>
      ) : (
        <button type="button" onClick={() => setRevealed(true)} className={cn(buttonClasses({ variant: "soft", className: "w-full rounded-xl" }))}>
          <Phone className="size-[18px]" /> Show number to call
        </button>
      )}
    </section>
  );
}
