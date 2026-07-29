"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { brandAssets, primaryNav, siteConfig } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";

const MENU_ID = "menu-navegacao";

/**
 * Barra de navegação fixa.
 *
 * Acima de 1024px os links aparecem em linha; abaixo disso, um hambúrguer
 * acessível abre a gaveta (`MobileMenu`). O item correspondente à seção em
 * leitura — ou à rota atual — recebe `aria-current` e destaque visual.
 */
export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";

  const sectionIds = useMemo(
    () =>
      primaryNav
        .map((item) => item.sectionId)
        .filter((id): id is string => typeof id === "string"),
    [],
  );

  const activeSection = useActiveSection(sectionIds, isHome);

  const activeHref = useMemo(() => {
    const routeMatch = primaryNav.find(
      (item) => !item.sectionId && item.href === pathname,
    );
    if (routeMatch) return routeMatch.href;

    if (!isHome || !activeSection) return null;
    return primaryNav.find((item) => item.sectionId === activeSection)?.href ?? null;
  }, [pathname, isHome, activeSection]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Devolve o foco ao hambúrguer, de onde a interação começou.
    toggleRef.current?.focus();
  }, []);

  // Uma navegação de rota desmonta a gaveta; o estado precisa acompanhar.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-white/8",
          "bg-ink-800/85 backdrop-blur-[14px]",
        )}
      >
        <nav
          aria-label="Navegação principal"
          className="flex items-center justify-between gap-6 px-5 py-3.5 wide:px-10 wide:py-[18px]"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={`${siteConfig.name} — página inicial`}
          >
            <Image
              src={brandAssets.mark.src}
              alt=""
              width={brandAssets.mark.width}
              height={brandAssets.mark.height}
              priority
              sizes="32px"
              className="h-8 w-auto"
            />
            <span className="font-mono text-[12.5px] font-medium leading-none tracking-[.22em] text-white-soft">
              CODES
              <span className="text-white-soft/55"> / BY ERAX</span>
            </span>
          </Link>

          {/* Links em linha — só quando há largura para todos eles. */}
          <ul className="m-0 hidden list-none items-center gap-[26px] p-0 lg:flex">
            {primaryNav.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative inline-flex items-center py-2 font-sans text-[13.5px] transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left",
                      "after:scale-x-0 after:bg-cyan-400 after:transition-transform after:duration-300",
                      "hover:after:scale-x-100",
                      isActive
                        ? "text-white after:scale-x-100"
                        : "text-white-soft/75 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3 lg:gap-[18px]">
            <LocaleSwitch className="hidden sm:flex" />

            <Link
              href="/downloads"
              className="hidden min-h-[44px] items-center rounded-full border border-white/15 bg-white-soft/8 px-5 font-sans text-[13px] text-white-soft transition-colors hover:border-cyan-400/50 hover:bg-white-soft/16 sm:inline-flex"
            >
              Downloads
            </Link>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              onClick={() => setMenuOpen((value) => !value)}
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white-soft transition-colors hover:border-cyan-400/50 lg:hidden"
            >
              <span className="sr-only">
                {menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 14"
                className="w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <path d="M1 1h18M1 7h18M1 13h18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        id={MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        activeHref={activeHref}
      />
    </>
  );
}
