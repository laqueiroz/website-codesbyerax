import type { Metadata } from "next";
import { QuotePage } from "@/components/localized/QuotePage";
import type { Locale } from "@/content/localized";
import { localizedMetadata } from "@/lib/localized";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale:raw}=await params;const locale=raw as Locale;return localizedMetadata(locale,"/orcamento","Orçamento | Codes by Erax","Solicite um orçamento para mockup de UI/UX, site ou aplicativo.","/quote")}
export default async function Page({params}:{params:Promise<{locale:string}>}){const{locale}=await params;return <QuotePage locale={locale as Locale}/>}
