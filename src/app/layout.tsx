import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, Noto_Sans_Devanagari, Noto_Sans_Gurmukhi } from "next/font/google";

import { siteConfig } from "@/config/site";
import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-devanagari",
  display: "swap",
});
const gurmukhi = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], weight: ["500"], variable: "--font-gurmukhi", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Farm-to-consumer marketplace`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f4d36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${manrope.variable} ${devanagari.variable} ${gurmukhi.variable}`}
    >
      <body className="min-h-dvh overflow-x-clip bg-white text-ink antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
