"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { primaryNav } from "@/content/site";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** `id` que o botão hambúrguer referencia em `aria-controls`. */
  id: string;
  /** Rota ou seção ativa, para o `aria-current`. */
  activeHref: string | null;
}

/**
 * Gaveta de navegação para telas pequenas.
 *
 * Substitui o comportamento do protótipo, que simplesmente escondia os links
 * abaixo de 760px. Fecha ao escolher um item, com `Escape` e com clique fora;
 * prende o foco enquanto está aberta, trava a rolagem da página e devolve o
 * foco ao botão hambúrguer ao sair (feito pelo `Navbar`).
 */
export function MobileMenu({ open, onClose, id, activeHref }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollLock(open);

  useEffect(() => setMounted(true), []);

  // Foco no painel assim que abre, para que a navegação por teclado continue
  // dentro da gaveta.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => panelRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  /**
   * Escape é ouvido no documento, não no painel: se o foco escapar da gaveta
   * por qualquer motivo, a tecla precisa continuar fechando.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /** Mantém o Tab circulando dentro da gaveta. */
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ),
    );
    if (focusable.length === 0) return;

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  if (!mounted) return null;

  const duration = prefersReducedMotion ? 0.12 : 0.34;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[250] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          onKeyDown={handleKeyDown}
        >
          {/* Fundo clicável. Fora da árvore de acessibilidade e da ordem de
              tabulação: para teclado e leitor de tela, quem fecha é o botão
              "Fechar menu" e a tecla Escape — este é só o atalho do ponteiro. */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-space-black/80 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            id={id}
            tabIndex={-1}
            initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute right-0 top-0 flex h-full w-[min(92vw,360px)] flex-col overflow-y-auto border-l border-white/10 bg-[#080713]/98 outline-none"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <span className="font-mono text-[10.5px] uppercase tracking-[.22em] text-white-soft/60">
                Navegação
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-full border border-white/12 text-white-soft/75 transition-colors hover:border-cyan-400/50 hover:text-white"
              >
                <span className="sr-only">Fechar menu</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>

            <nav aria-label="Navegação principal (celular)" className="flex-1 px-3 py-4">
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {primaryNav.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex min-h-[52px] items-center rounded-lg px-4 font-sans text-[16px] font-light transition-colors",
                          isActive
                            ? "bg-violet-500/15 text-white"
                            : "text-white-soft/80 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-4 border-t border-white/8 px-5 py-5">
              <Link
                href="/downloads"
                onClick={onClose}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white-soft/8 px-5 font-sans text-[14px] text-white-soft transition-colors hover:border-cyan-400/50 hover:bg-white-soft/16"
              >
                Downloads
              </Link>
              <LocaleSwitch className="self-start" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
