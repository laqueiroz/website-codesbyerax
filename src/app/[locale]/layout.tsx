import { notFound } from "next/navigation";
import { SiteShell } from "@/components/localized/SiteShell";
import { isLocale } from "@/lib/localized";
import { SpaceBackground } from "@/components/effects/SpaceBackground";
import { IntroOverlay } from "@/components/home/IntroOverlay";

export function generateStaticParams() { return [{locale:"pt"},{locale:"en"}]; }

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  return (
    <>
      <IntroOverlay />
      <SpaceBackground />
      <div className="relative z-[1]">
        <SiteShell locale={locale}>{children}</SiteShell>
      </div>
    </>
  );
}
