"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Texto de apoio sob o título, lido junto pelo leitor de tela. */
  description?: string;
  children: ReactNode;
}

/**
 * Diálogo modal acessível.
 *
 * - `role="dialog"` + `aria-modal` + `aria-labelledby`/`aria-describedby`;
 * - o foco entra no diálogo ao abrir e fica preso nele enquanto estiver aberto;
 * - fecha por botão, `Escape` e clique fora;
 * - devolve o foco ao elemento que o abriu;
 * - trava a rolagem da página apenas enquanto está aberto;
 * - nunca ultrapassa a viewport (rola internamente em telas baixas).
 */
export function Modal({ open, onClose, title, description, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const descriptionId = useId();

  useScrollLock(open);

  useEffect(() => setMounted(true), []);

  // Guarda quem abriu, para devolver o foco no fechamento.
  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;

    return () => {
      const opener = openerRef.current;
      // `isConnected` evita tentar focar um nó já removido da árvore.
      if (opener?.isConnected) opener.focus();
    };
  }, [open]);

  // Foco inicial no painel: o leitor de tela anuncia título e descrição antes
  // de o usuário chegar ao primeiro campo.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => panelRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  /**
   * Escape no documento: o painel captura o foco, mas ouvir aqui garante o
   * fechamento mesmo que o foco tenha escapado. Só o modal do topo responde,
   * porque um modal fechado não registra o listener.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /** Mantém o Tab circulando dentro do painel. */
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((element) => element.offsetParent !== null || element === panel);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

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

  const duration = prefersReducedMotion ? 0.12 : 0.32;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          onKeyDown={handleKeyDown}
        >
          {/* Fundo: atalho de ponteiro para fechar. Fica fora da árvore de
              acessibilidade porque o botão "Fechar" e a tecla Escape já cobrem
              teclado e leitor de tela — dois "Fechar" só criariam ruído. */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-space-black/80 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }
            }
            transition={{ duration, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-[520px] overflow-y-auto rounded-[14px] border border-violet-300/25 bg-[#0b0916]/95 p-6 shadow-[0_44px_100px_-44px_#000] outline-none sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id={titleId}
                  className="type-display m-0 text-[26px] leading-[1.2] text-white-hi"
                >
                  {title}
                </h2>
                {description ? (
                  <p
                    id={descriptionId}
                    className="mt-3 font-sans text-[14px] font-light leading-[1.6] text-white-soft/70"
                  >
                    {description}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="-mr-2 -mt-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-white-soft/70 transition-colors hover:border-cyan-400/50 hover:text-white"
              >
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

            <div className="mt-6">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
