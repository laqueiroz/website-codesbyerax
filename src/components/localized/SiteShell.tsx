"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { content, routePairs, type Locale } from "@/content/localized";

function languagePath(pathname: string, locale: Locale) {
  const mapped = routePairs[pathname];
  if (mapped) {
    const currentLocale = pathname.split("/")[1];
    return currentLocale === locale ? pathname : mapped;
  }
  const legalRoutes: Record<string, Record<Locale, string>> = {
    "/pt/privacidade": { pt: "/pt/privacidade", en: "/en/privacy" },
    "/en/privacy": { pt: "/pt/privacidade", en: "/en/privacy" },
    "/pt/termos": { pt: "/pt/termos", en: "/en/terms" },
    "/en/terms": { pt: "/pt/termos", en: "/en/terms" },
    "/pt/licencas": { pt: "/pt/licencas", en: "/en/licenses" },
    "/en/licenses": { pt: "/pt/licencas", en: "/en/licenses" },
  };
  if (legalRoutes[pathname]) return legalRoutes[pathname][locale];
  return pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${locale}`);
}

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const copy = content[locale].common;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav: [string, string][] = [
    [`/${locale}`, copy.home],
    [`/${locale}/vinculo-tutoria`, copy.product],
    [`/${locale}/blog`, copy.blog],
    [locale === "pt" ? "/pt/orcamento" : "/en/quote", locale === "pt" ? "Orçamento" : "Get a quote"],
    [`/${locale}#sobre`, copy.about],
    [`/${locale}/vinculo-tutoria#faq`, copy.support],
  ];
  useEffect(() => setOpen(false), [pathname]);
  function closeMenu(returnFocus = false) {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => menuButton.current?.focus());
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeMenu(true);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <a href="#main-content" className="skip-link">{copy.skip}</a>
      <header className="site-nav">
        <Link href={`/${locale}`} className="brand" aria-label={`Codes by Erax — ${copy.home}`}>
          <Image src="/assets/logo-full.png" width={180} height={48} alt="Codes by Erax" priority />
        </Link>
        <button ref={menuButton} className="menu-button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"}>
          <span /><span /><span />
        </button>
        <nav id="primary-navigation" className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {nav.map(([href,label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
          <Link className="nav-download" href={`/${locale}/vinculo-tutoria#download`}>{copy.download}</Link>
          <div className="locale-switch" aria-label="Language">
            <Link href={languagePath(pathname, "pt")} hrefLang="pt-BR" lang="pt-BR" aria-current={locale === "pt" ? "true" : undefined}>Português</Link>
            <span aria-hidden="true">·</span>
            <Link href={languagePath(pathname, "en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>English</Link>
          </div>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div><h2>{locale === "pt" ? "Produto" : "Product"}</h2><Link href={`/${locale}/vinculo-tutoria`}>Vínculo Tutoria</Link><Link href={`/${locale}/vinculo-tutoria#recursos`}>{locale === "pt" ? "Recursos" : "Features"}</Link><Link href={`/${locale}/vinculo-tutoria#tutorial`}>Tutorial</Link><Link href={`/${locale}/vinculo-tutoria#download`}>Download</Link><Link href={`/${locale}/changelog`}>{copy.changelog}</Link></div>
          <div><h2>{locale === "pt" ? "Conteúdo" : "Content"}</h2><Link href={`/${locale}/blog`}>Blog</Link><Link href={`/${locale}/vinculo-tutoria#faq`}>{locale === "pt" ? "Perguntas frequentes" : "Frequently Asked Questions"}</Link><Link href={`/${locale}/feedback`}>{copy.feedback}</Link></div>
          <div><h2>Codes by Erax</h2><Link href={`/${locale}#sobre`}>{copy.about}</Link><Link href={locale === "pt" ? "/pt/orcamento" : "/en/quote"}>{locale === "pt" ? "Orçamento e contato" : "Quote and contact"}</Link><a href="mailto:contato@codesbyerax.com.br">contato@codesbyerax.com.br</a><a href="mailto:suporte@codesbyerax.com.br">suporte@codesbyerax.com.br</a><Link href={`/${locale}#projetos`}>{locale === "pt" ? "Projetos" : "Projects"}</Link></div>
          <div><h2>Legal</h2><Link href={locale === "pt" ? "/pt/privacidade" : "/en/privacy"}>{copy.privacy}</Link><Link href={locale === "pt" ? "/pt/termos" : "/en/terms"}>{copy.terms}</Link><Link href={locale === "pt" ? "/pt/licencas" : "/en/licenses"}>{copy.licenses}</Link><Link href={`/${locale}/status`}>Status</Link></div>
        </div>
        <div className="footer-signature">
          <p>Codes by Erax — {locale === "pt" ? "Tecnologia criada a partir de necessidades reais." : "Technology built from real needs."}</p>
          <p>Vínculo Tutoria — {locale === "pt" ? "Organização para acompanhar. Informação para compreender. Tempo para criar vínculos." : "Organization to follow up. Information to understand. Time to build meaningful connections."}</p>
        </div>
      </footer>
    </>
  );
}
