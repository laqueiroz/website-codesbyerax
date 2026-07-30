import { notFound } from "next/navigation";
import { SiteShell } from "@/components/localized/SiteShell";
import { isLocale } from "@/lib/localized";

export function generateStaticParams() { return [{locale:"pt"},{locale:"en"}]; }

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
