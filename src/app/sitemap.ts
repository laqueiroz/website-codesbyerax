import type { MetadataRoute } from "next";
import { content } from "@/content/localized";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const bases = {pt:["","/vinculo-tutoria","/blog","/privacidade","/termos","/licencas","/changelog","/feedback","/status"],en:["","/vinculo-tutoria","/blog","/privacy","/terms","/licenses","/changelog","/feedback","/status"]} as const;
  const routes = (["pt","en"] as const).flatMap(locale => [
    ...bases[locale].map((path,index)=>({url:`${siteConfig.url}/${locale}${path}`,lastModified:new Date("2026-07-29"),changeFrequency:path==="/blog"?"weekly" as const:"monthly" as const,priority:path===""?1:path==="/vinculo-tutoria"?0.9:0.6,alternates:{languages:{"pt-BR":`${siteConfig.url}/pt${bases.pt[index]}`,en:`${siteConfig.url}/en${bases.en[index]}`}}})),
    ...content[locale].articles.map(article=>({url:`${siteConfig.url}/${locale}/blog/${article.slug}`,lastModified:new Date(article.modified),changeFrequency:"monthly" as const,priority:0.7,alternates:{languages:{"pt-BR":`${siteConfig.url}/pt/blog/${locale==="pt"?article.slug:article.alternateSlug}`,en:`${siteConfig.url}/en/blog/${locale==="en"?article.slug:article.alternateSlug}`}}})),
  ]);
  return routes;
}
