import type { Metadata } from "next";
import { QuotePage } from "@/components/localized/QuotePage";
import type { Locale } from "@/content/localized";
import { localizedMetadata } from "@/lib/localized";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale:raw}=await params;const locale=raw as Locale;return localizedMetadata(locale,"/quote","Get a quote | Codes by Erax","Request a quote for a UI/UX mockup, website or application.","/orcamento")}
export default async function Page({params}:{params:Promise<{locale:string}>}){const{locale}=await params;return <QuotePage locale={locale as Locale}/>}
