import type { Metadata } from "next";
import Link from "next/link";
import { Cards, Hero, Section } from "@/components/localized/PageComponents";
import { content, type Locale } from "@/content/localized";
import { isLocale, localizedMetadata } from "@/lib/localized";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return{};const c=content[locale].home;return localizedMetadata(locale,"",c.title,c.description);}

export default async function Home({params}:{params:Promise<{locale:string}>}) {
  const {locale:raw}=await params; const locale=raw as Locale; const c=content[locale].home;
  return <>
    <Hero eyebrow={c.eyebrow} title={c.hero} text={c.heroText} actions={[{label:c.primary,href:`/${locale}/vinculo-tutoria`},{label:c.secondary,href:"#projetos",secondary:true}]}/>
    <Section id="sobre" eyebrow={locale==="pt"?"Da experiência real para a tecnologia":"From real experience to technology"} title={c.experienceTitle} paragraphs={c.experience}/>
    <Section id="projetos" eyebrow={locale==="pt"?"Produto em destaque":"Featured product"} title={c.featuredTitle} paragraphs={c.featured} tone>
      <ul className="feature-list">{c.features.map((x)=><li key={x}>{x}</li>)}</ul>
      <div className="actions"><Link className="button" href={`/${locale}/vinculo-tutoria`}>{locale==="pt"?"Conhecer todos os recursos":"Explore All Features"}</Link><Link className="button secondary" href={`/${locale}/vinculo-tutoria#download`}>{locale==="pt"?"Baixar o Vínculo":"Download Vínculo"}</Link></div>
    </Section>
    <Section title={c.principlesTitle}><Cards items={c.principles}/></Section>
    <Section title={c.contentTitle} paragraphs={[c.contentText]} tone><Link className="button" href={`/${locale}/blog`}>{c.blogButton}</Link></Section>
    <Section title={c.ctaTitle} paragraphs={[c.ctaText]}><div className="actions"><Link className="button" href={`/${locale}/vinculo-tutoria`}>{c.primary}</Link><Link className="button secondary" href={`/${locale}/feedback`}>{c.contact}</Link></div></Section>
  </>;
}
