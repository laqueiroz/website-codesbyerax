import type { Metadata } from "next";
import Link from "next/link";

import { AppWindowMock } from "@/components/home/AppWindowMock";
import { Cards, Hero, Section } from "@/components/localized/PageComponents";
import { JsonLd } from "@/components/seo/JsonLd";
import { content, type Locale } from "@/content/localized";
import { isLocale, localizedMetadata } from "@/lib/localized";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = content[locale].product;
  return localizedMetadata(locale, "/vinculo-tutoria", copy.title, copy.description);
}

export default async function Product({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const copy = content[locale].product;
  const common = content[locale].common;

  return (
    <>
      <Hero
        eyebrow="Vínculo Tutoria · 1.4.0 · Windows"
        title="Vínculo Tutoria"
        text={[copy.subtitle, ...copy.intro]}
        actions={[
          {
            label: locale === "pt" ? "Baixar para Windows" : "Download for Windows",
            href: "#download",
          },
          {
            label: locale === "pt" ? "Conhecer os recursos" : "Explore features",
            href: "#recursos",
            secondary: true,
          },
        ]}
        visual={<div className="product-window"><AppWindowMock /></div>}
      />
      <Section title={copy.whyTitle} paragraphs={copy.why} />
      <Section title={copy.audienceTitle} tone><Cards items={copy.audience} /></Section>
      <Section id="recursos" title={copy.featuresTitle}><Cards items={copy.features} numbered /></Section>
      <Section id="steps" title={copy.stepsTitle} tone><Cards items={copy.steps} numbered /></Section>
      <Section title={copy.careTitle} paragraphs={copy.care}>
        <div className="text-links">
          <Link href={locale === "pt" ? "/pt/privacidade" : "/en/privacy"}>{common.privacy}</Link>
          <Link href={locale === "pt" ? "/pt/termos" : "/en/terms"}>{common.terms}</Link>
          <Link href={locale === "pt" ? "/pt/licencas" : "/en/licenses"}>{common.licenses}</Link>
        </div>
      </Section>
      <Section id="tutorial" title={copy.tutorialTitle} paragraphs={copy.tutorial} tone>
        <div className="actions">
          <Link className="button" href="#steps">{locale === "pt" ? "Acessar o tutorial" : "View tutorial"}</Link>
          <Link className="button secondary" href="#faq">{locale === "pt" ? "Ver perguntas frequentes" : "View FAQ"}</Link>
        </div>
      </Section>
      <Section id="download" title={copy.downloadTitle} paragraphs={copy.downloadText}>
        <ul className="fact-list">{copy.downloadFacts.map((item) => <li key={item}>{item}</li>)}</ul>
        <aside className="notice"><h3>{copy.windowsTitle}</h3><p>{copy.windows}</p></aside>
        {process.env.NEXT_PUBLIC_VINCULO_DOWNLOAD_URL ? (
          <a className="button" href={process.env.NEXT_PUBLIC_VINCULO_DOWNLOAD_URL}>
            {locale === "pt" ? "Baixar para Windows" : "Download for Windows"}
          </a>
        ) : (
          <span className="button disabled" aria-disabled="true">
            {locale === "pt" ? "Download temporariamente indisponível" : "Download temporarily unavailable"}
          </span>
        )}
      </Section>
      <Section title={copy.feedbackTitle} paragraphs={[copy.feedbackText]} tone>
        <Link className="button" href={`/${locale}/feedback`}>{common.feedback}</Link>
      </Section>
      <Section id="faq" title={copy.faqTitle}>
        <div className="faq-list">
          {copy.faqs.map((faq) => (
            <details key={faq.q}><summary>{faq.q}</summary>{faq.a.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</details>
          ))}
        </div>
      </Section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Vínculo Tutoria", applicationCategory: "EducationalApplication", operatingSystem: "Windows", softwareVersion: "1.4.0", description: copy.description, author: { "@type": "Organization", name: "Codes by Erax" } }} />
    </>
  );
}
