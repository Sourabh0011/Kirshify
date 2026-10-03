import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ListingFilters } from "@/types/listing";

import { marketplaceHref } from "../query";

export function Pagination({ filters, page, totalPages }: { filters: ListingFilters; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const item = "inline-flex size-11 items-center justify-center rounded-xl text-sm font-bold transition-colors";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 pt-2">
      {page > 1 ? (
        <Link href={marketplaceHref(filters, { page: page - 1 })} aria-label="Previous page" className={cn(item, "border border-line bg-white hover:border-forest")}>
          <ChevronLeft className="size-5" />
        </Link>
      ) : (
        <span className={cn(item, "border border-line-soft text-line")} aria-hidden="true">
          <ChevronLeft className="size-5" />
        </span>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={marketplaceHref(filters, { page: p })}
          aria-current={p === page ? "page" : undefined}
          className={cn(item, p === page ? "bg-forest text-white" : "border border-line bg-white hover:border-forest")}
        >
          {p}
        </Link>
      ))}
      {page < totalPages ? (
        <Link href={marketplaceHref(filters, { page: page + 1 })} aria-label="Next page" className={cn(item, "border border-line bg-white hover:border-forest")}>
          <ChevronRight className="size-5" />
        </Link>
      ) : (
        <span className={cn(item, "border border-line-soft text-line")} aria-hidden="true">
          <ChevronRight className="size-5" />
        </span>
      )}
    </nav>
  );
}
