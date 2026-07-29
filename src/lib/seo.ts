import type { Metadata } from "next";

import { siteConfig, vinculo } from "@/content/site";

/**
 * Monta o metadata de uma página interna: título, descrição e canonical.
 * A homepage define o seu próprio em `app/layout.tsx`.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: siteConfig.name,
      title: `${title} · ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * Dados estruturados da organização e do aplicativo.
 *
 * Contém apenas fatos presentes nos materiais recebidos. Nenhuma nota de
 * avaliação (`aggregateRating`) ou contagem de usuários é declarada — não
 * existe dado real para sustentá-las.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/logo-full.png`,
    description: siteConfig.description,
    ...(siteConfig.supportEmail
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: siteConfig.supportEmail,
            availableLanguage: ["Portuguese"],
          },
        }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pt-BR",
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Vínculo Tutoria",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Windows 10, Windows 11",
    softwareVersion: vinculo.version,
    description:
      "Registro de atendimentos de tutoria para professores: sessões, evolução do aluno e relatórios em PDF prontos para a coordenação. Funciona offline, com os dados salvos apenas na máquina do professor.",
    inLanguage: "pt-BR",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(vinculo.downloadUrl ? { downloadUrl: vinculo.downloadUrl } : {}),
  };
}

/** FAQPage exige que as perguntas estejam visíveis na página que o declara. */
export function faqJsonLd(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
