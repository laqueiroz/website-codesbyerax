import type { Metadata } from "next";
import Link from "next/link";
import { Cards, Hero, Section } from "@/components/localized/PageComponents";
import { content, type Locale } from "@/content/localized";
import { isLocale, localizedMetadata } from "@/lib/localized";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return{};const c=content[locale].product;return localizedMetadata(locale,"/vinculo-tutoria",c.title,c.description);}

export default async function Product({params}:{params:Promise<{locale:string}>}) {
  const {locale:raw}=await params; const locale=raw as Locale; const c=content[locale].product; const common=content[locale].common;
  return <>
    <Hero eyebrow="Vínculo Tutoria · 1.4.0" title="Vínculo Tutoria" text={[c.subtitle,...c.intro]} actions={[{label:locale==="pt"?"Baixar para Windows":"Download for Windows",href:"#download"},{label:locale==="pt"?"Conhecer os recursos":"Explore features",href:"#recursos",secondary:true},{label:locale==="pt"?"Acessar o tutorial":"View tutorial",href:"#tutorial",secondary:true}]}/>
    <Section title={c.whyTitle} paragraphs={c.why}/>
    <Section title={c.audienceTitle} tone><Cards items={c.audience}/></Section>
    <Section id="recursos" title={c.featuresTitle}><Cards items={c.features} numbered/></Section>
    <Section id="steps" title={c.stepsTitle} tone><Cards items={c.steps} numbered/></Section>
    <Section title={c.careTitle} paragraphs={c.care}><div className="text-links"><Link href={`/${locale}/privacidade`}>{common.privacy}</Link><Link href={`/${locale}/termos`}>{common.terms}</Link><Link href={`/${locale}/licencas`}>{common.licenses}</Link></div></Section>
    <Section id="tutorial" title={c.tutorialTitle} paragraphs={c.tutorial} tone><div className="actions"><Link className="button" href="#steps">{locale==="pt"?"Acessar o tutorial":"View tutorial"}</Link><Link className="button secondary" href="#faq">{locale==="pt"?"Ver perguntas frequentes":"View FAQ"}</Link></div></Section>
    <Section id="download" title={c.downloadTitle} paragraphs={c.downloadText}><ul className="fact-list">{c.downloadFacts.map(x=><li key={x}>{x}</li>)}</ul><aside className="notice"><h3>{c.windowsTitle}</h3><p>{c.windows}</p></aside>{process.env.NEXT_PUBLIC_VINCULO_DOWNLOAD_URL?<a className="button" href={process.env.NEXT_PUBLIC_VINCULO_DOWNLOAD_URL}>{locale==="pt"?"Baixar para Windows":"Download for Windows"}</a>:<span className="button disabled" aria-disabled="true">{locale==="pt"?"Download temporariamente indisponível":"Download temporarily unavailable"}</span>}</Section>
    <Section title={c.feedbackTitle} paragraphs={[c.feedbackText]} tone><Link className="button" href={`/${locale}/feedback`}>{common.feedback}</Link></Section>
    <Section id="faq" title={c.faqTitle}><div className="faq-list">{c.faqs.map(f=><details key={f.q}><summary>{f.q}</summary>{f.a.map(p=><p key={p}>{p}</p>)}</details>)}</div></Section>
    <JsonLd data={{"@context":"https://schema.org","@type":"SoftwareApplication",name:"Vínculo Tutoria",applicationCategory:"EducationalApplication",operatingSystem:"Windows",softwareVersion:"1.4.0",description:c.description,author:{"@type":"Organization",name:"Codes by Erax"}}}/>
  </>;
}
