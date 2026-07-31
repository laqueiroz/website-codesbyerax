import type { Metadata, Viewport } from "next";

import "./globals.css";

import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    // Verificação de domínio do Zoho Mail.
    "zoho-verification":
      process.env.NEXT_PUBLIC_ZOHO_VERIFICATION || "zb68600730.zmverify.zoho.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#040309",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="antialiased">
        {/*
          As revelações na rolagem começam invisíveis e contam com o
          IntersectionObserver para aparecer. Sem JavaScript ninguém as revela,
          então aqui elas nascem visíveis — o site perde a animação, não o
          conteúdo.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <div className="relative z-[1] min-h-screen">{children}</div>

        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
