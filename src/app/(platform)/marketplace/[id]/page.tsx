import { ArrowLeft, BadgeCheck, CalendarDays, MapPin, Medal, Package } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { getCategoryLabel } from "@/config/crops";
import { ListingCardCompact } from "@/features/marketplace/components/listing-card";
import { ListingGallery } from "@/features/marketplace/components/listing-gallery";
import { ListingTabs } from "@/features/marketplace/components/listing-tabs";
import { MarketReferenceCard } from "@/features/marketplace/components/market-reference-card";
import { OfferPanel } from "@/features/marketplace/components/offer-panel";
import { SellerCard } from "@/features/marketplace/components/seller-card";
import { formatDate, formatINR } from "@/lib/utils";
import { getListingById, getSimilarListings } from "@/server/services/listing.service";
import { getMandiPrice, getPriceTrend } from "@/server/services/market.service";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) return { title: "Listing not found" };
  return {
    title: `${listing.cropName} · ${listing.quantityQtl} qtl in ${listing.location}`,
    description: `${listing.cropName} at ${formatINR(listing.pricePerQtl)}/qtl from ${listing.seller.name}, ${listing.location}.`,
  };
}

const gradeLabel = { A: "A (Premium)", B: "B (Standard)", C: "C (Fair average)" } as const;

export default async function ListingPage({ params }: { params: Params }) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const [similar, mandi, trend] = await Promise.all([
    getSimilarListings(listing),
    getMandiPrice(listing.cropSlug),
    getPriceTrend(listing.cropSlug, "7d"),
  ]);

  const facts = [
    { icon: Package, label: `${listing.quantityQtl} quintal available` },
    { icon: MapPin, label: `${listing.location}, ${listing.state}` },
    { icon: CalendarDays, label: `Harvested ${formatDate(listing.harvestDate, { month: "short", year: "numeric" })}` },
    { icon: Medal, label: `Grade ${gradeLabel[listing.grade]}` },
  ];

  const detailRows = [
    { label: "Quantity", value: `${listing.quantityQtl} qtl` },
    { label: "Expected price", value: `${formatINR(listing.pricePerQtl)}/qtl` },
    { label: "Quality", value: gradeLabel[listing.grade] },
    { label: "Harvest date", value: formatDate(listing.harvestDate) },
    { label: "Location", value: `${listing.location}, MP` },
    { label: "Seller type", value: listing.seller.type === "farmer" ? "Individual farmer" : "Farmer Producer Organisation" },
    { label: "Category", value: getCategoryLabel(listing.category) },
    { label: "Variety", value: listing.variety ?? "—" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Link href="/marketplace" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-ink-soft hover:text-forest">
        <ArrowLeft className="size-4" /> Back to marketplace
      </Link>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[auto_1fr]">
        {/* Gallery + summary */}
        <section className="grid grid-cols-1 gap-6 rounded-3xl border border-line-soft bg-white p-4 sm:p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:col-start-1">
          <ListingGallery cropSlug={listing.cropSlug} cropName={listing.cropName} images={listing.images} />
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-display text-3xl font-extrabold tracking-tight">{listing.cropName}</h1>
              {listing.verified && (
                <Badge>
                  <BadgeCheck className="size-3.5" /> Verified {listing.seller.type === "farmer" ? "farmer" : "FPO"}
                </Badge>
              )}
            </div>
            <span className="text-3xl font-extrabold text-forest">
              {formatINR(listing.pricePerQtl)}
              <span className="text-base font-semibold text-muted"> /qtl</span>
            </span>
            <ul className="flex flex-col gap-3 text-[15px]">
              {facts.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="size-[18px] shrink-0 text-muted" strokeWidth={1.9} />
                  {label}
                </li>
              ))}
            </ul>
            {listing.description && <p className="rounded-2xl bg-mist p-4 text-[14.5px] leading-relaxed text-ink-soft">{listing.description}</p>}
          </div>
        </section>

        {/* Seller + actions */}
        <div className="flex flex-col gap-5 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <SellerCard seller={listing.seller} listingId={listing.id} />
          <OfferPanel listingId={listing.id} price={listing.pricePerQtl} maxQty={listing.quantityQtl} verified={listing.verified} />
        </div>

        {/* Details */}
        <section className="rounded-3xl border border-line-soft bg-white p-4 sm:p-6 lg:col-start-1">
          <ListingTabs
            tabs={[
              {
                id: "overview",
                label: "Overview",
                content: (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                    <div className="flex flex-col gap-4">
                      <h2 className="font-extrabold">Crop details</h2>
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {detailRows.map((row) => (
                          <div key={row.label} className="flex flex-col gap-0.5">
                            <dt className="text-[13px] text-muted">{row.label}</dt>
                            <dd className="font-bold">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    {mandi && <MarketReferenceCard mandi={mandi} trend={trend} listingPrice={listing.pricePerQtl} />}
                  </div>
                ),
              },
              {
                id: "farmer",
                label: "Farmer details",
                content: (
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      ["Name", listing.seller.name],
                      ["Type", listing.seller.type === "farmer" ? "Individual farmer" : "FPO"],
                      ["Based in", `${listing.seller.location}, ${listing.seller.state}`],
                      ["Experience", `${listing.seller.experienceYears} years`],
                      ["Rating", `${listing.seller.rating.toFixed(1)} from ${listing.seller.reviewCount} buyers`],
                      ["KYC", listing.seller.verified ? "Verified" : "Pending verification"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-0.5 rounded-2xl bg-mist p-4">
                        <dt className="text-[13px] text-muted">{k}</dt>
                        <dd className="font-bold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                ),
              },
              {
                id: "quality",
                label: "Quality & grade",
                content: (
                  <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <p>
                      Graded <b className="text-ink">{gradeLabel[listing.grade]}</b> by the seller. Grade A means uniform size, low moisture and minimal foreign
                      matter; Grade B is market standard.
                    </p>
                    <p className="rounded-2xl bg-marigold-soft p-4 text-marigold-ink">
                      Third-party assaying and AI-based quality checks from photos are on the roadmap.
                    </p>
                  </div>
                ),
              },
              {
                id: "offers",
                label: "Buyer offers",
                content: (
                  <p className="rounded-2xl bg-mist p-5 text-[15px] text-ink-soft">
                    No public offers yet. Offers you send are visible only to you and the seller.
                  </p>
                ),
              },
            ]}
          />
        </section>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="similar-title" className="flex flex-col gap-4">
          <h2 id="similar-title" className="text-xl font-extrabold">
            Similar listings
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {similar.map((l) => (
              <ListingCardCompact key={l.id} listing={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
