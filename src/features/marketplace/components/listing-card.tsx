import { BadgeCheck, MapPin } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { CropArt } from "@/components/ui/crop-art";
import { cn, formatINR } from "@/lib/utils";
import type { ListingWithSeller } from "@/types/listing";

export function ListingCard({ listing, priority }: { listing: ListingWithSeller; priority?: boolean }) {
  const href = `/marketplace/${listing.id}`;
  const fromFarmer = listing.seller.type === "farmer";

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line-soft bg-white transition-shadow hover:shadow-card">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden">
        <CropArt
          cropSlug={listing.cropSlug}
          image={listing.images[0]}
          alt={listing.cropName}
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {listing.verified && (
          <Badge tone="forest" className="absolute top-3 right-3 shadow-sm">
            <BadgeCheck className="size-3.5" /> Verified
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[17px] font-extrabold">
            <Link href={href} className="hover:text-forest">
              {listing.cropName}
            </Link>
          </h3>
          <span className="text-[13.5px] text-muted">
            {listing.quantityQtl} quintal{listing.variety ? ` · ${listing.variety}` : ""}
          </span>
        </div>
        <span className="text-xl font-extrabold">
          {formatINR(listing.pricePerQtl)}
          <span className="text-[13px] font-semibold text-muted"> /qtl</span>
        </span>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
          <span className="inline-flex items-center gap-1 text-muted">
            <MapPin className="size-3.5" />
            {listing.location}, MP · {listing.distanceKm} km
          </span>
          <span className={cn("font-bold", fromFarmer ? "text-forest" : "text-sky-ink")}>{fromFarmer ? "Direct from farmer" : "FPO"}</span>
        </div>
        <Link href={href} className={buttonClasses({ size: "sm", className: "mt-auto w-full rounded-xl" })}>
          View details
        </Link>
      </div>
    </article>
  );
}

export function ListingCardCompact({ listing }: { listing: ListingWithSeller }) {
  const href = `/marketplace/${listing.id}`;
  return (
    <article className="flex items-center gap-3.5 rounded-2xl border border-line-soft bg-white p-3">
      <span className="size-18 shrink-0 overflow-hidden rounded-xl">
        <CropArt cropSlug={listing.cropSlug} image={listing.images[0]} alt="" sizes="72px" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <Link href={href} className="truncate font-extrabold hover:text-forest">
          {listing.cropName}
        </Link>
        <span className="text-[13px] text-muted">{listing.quantityQtl} qtl</span>
        <span className="font-extrabold">{formatINR(listing.pricePerQtl)}/qtl</span>
        <span className="truncate text-[12.5px] font-semibold text-forest">{listing.location}</span>
      </div>
      <Link href={href} className={buttonClasses({ variant: "outline", size: "sm", className: "rounded-xl border px-3.5" })}>
        View
      </Link>
    </article>
  );
}
