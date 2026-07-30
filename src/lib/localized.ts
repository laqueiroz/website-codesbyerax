import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, localeCodes, type Locale } from "@/content/localized";
import { siteConfig } from "@/content/site";

export function isLocale(value: string): value is Locale {
  return localeCodes.includes(value as Locale);
}

export function getCopy(locale: string) {
  if (!isLocale(locale)) notFound();
  return content[locale];
}

export function localizedMetadata(locale: Locale, path: string, title: string, description: string, alternatePath = path): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  return {
    title, description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${siteConfig.url}/pt${locale === "pt" ? path : alternatePath}`,
        en: `${siteConfig.url}/en${locale === "en" ? path : alternatePath}`,
        "x-default": `${siteConfig.url}/pt${locale === "pt" ? path : alternatePath}`,
      },
    },
    openGraph: { type:"website", locale:locale === "pt" ? "pt_BR" : "en_US", url, title, description, siteName:"Codes by Erax", images:[{url:"/opengraph-image",width:1200,height:630,alt:title}] },
    twitter: { card:"summary_large_image", title, description, images:["/opengraph-image"] },
  };
}
