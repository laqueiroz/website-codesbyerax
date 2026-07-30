import type { Metadata } from "next";
import Link from "next/link";
import { content, type Locale } from "@/content/localized";
import { isLocale, localizedMetadata } from "@/lib/localized";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return{};const c=content[locale].blog;return localizedMetadata(locale,"/blog",`${c.title} | Codes by Erax`,c.description);}
export default async function Blog({params}:{params:Promise<{locale:string}>}){const {locale:raw}=await params;const locale=raw as Locale;const c=content[locale];return <div className="listing page-container"><header><p className="eyebrow">Codes by Erax</p><h1>{c.blog.title}</h1><p className="lead">{c.blog.intro}</p></header><div className="article-grid">{c.articles.map(a=><article key={a.slug}><p className="article-meta"><time dateTime={a.published}>{locale==="pt"?"29 de julho de 2026":"July 29, 2026"}</time> · {a.readingTime}</p><h2><Link href={`/${locale}/blog/${a.slug}`}>{a.title}</Link></h2><p>{a.description}</p><Link className="read-more" href={`/${locale}/blog/${a.slug}`}>{locale==="pt"?"Ler artigo":"Read article"} →</Link></article>)}</div></div>}
