import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { AdvisorWidget } from "@/features/advisor/components/advisor-widget";

/** Signed-in platform shell: top bar, left sidebar (desktop) and bottom tab bar (mobile). */
export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-mist">
      <AppHeader />
      <div className="mx-auto flex max-w-[1440px] gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <AppSidebar className="sticky top-24 hidden w-60 shrink-0 self-start lg:flex" />
        <main id="main" className="min-w-0 flex-1 pb-28 lg:pb-10">
          {children}
        </main>
      </div>
      <MobileTabBar />
      <AdvisorWidget placement="app" />
    </div>
  );
}
