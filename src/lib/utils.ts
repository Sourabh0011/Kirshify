import { extendTailwindMerge } from "tailwind-merge";

type ClassValue = string | number | false | null | undefined;

// Teach tailwind-merge about the custom utilities in globals.css so they aren't mistaken for colours.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-hero", "display-lg", "display-md"] }],
    },
  },
});

/** Joins class names, skipping falsy values; later Tailwind classes win over conflicting earlier ones. */
export function cn(...classes: ClassValue[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}

const inrFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹1,17,000 — Indian digit grouping. */
export function formatINR(value: number): string {
  return `₹${inrFormatter.format(Math.round(value))}`;
}

export function formatNumber(value: number): string {
  return inrFormatter.format(Math.round(value));
}

export function formatPct(value: number, digits = 1): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }): string {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", ...opts }).format(new Date(iso));
}

/** Initials for avatars: "Ramesh Patel" → "RP". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** "+91 90000 00101" → "+91 90000 0XXXX" */
export function maskPhone(phone: string): string {
  return phone.replace(/\d{4}$/, "XXXX");
}

/** Deterministic PRNG so generated art and mock series match on server and client. */
export function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/** Reads the first value of a Next.js search param. */
export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
