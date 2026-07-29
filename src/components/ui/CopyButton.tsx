"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type CopyState = "idle" | "copied" | "failed";

interface CopyButtonProps {
  value: string;
  /** Rótulo acessível, ex. "Copiar checksum SHA-256". */
  label: string;
  className?: string;
}

/**
 * Copia um valor para a área de transferência com confirmação visual.
 *
 * Além do rótulo visível (que muda para "Copiado"), o resultado é anunciado
 * numa região `aria-live`, para quem não vê a mudança de estado.
 *
 * Sem `navigator.clipboard` (contexto não seguro, navegador antigo) o
 * componente informa a falha em vez de fingir que copiou.
 */
export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard indisponível");
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }

    timeoutRef.current = setTimeout(() => setState("idle"), 2400);
  }, [value]);

  const text =
    state === "copied" ? "Copiado" : state === "failed" ? "Não foi possível copiar" : "Copiar";

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-2 rounded-md border px-4 py-2",
          "font-mono text-[11px] uppercase tracking-[.16em] transition-colors",
          state === "copied"
            ? "border-cyan-400/55 text-cyan-400"
            : state === "failed"
              ? "border-[#ff9d9d]/55 text-[#ffb4b4]"
              : "border-white/15 text-white-soft/75 hover:border-cyan-400/50 hover:text-white",
          className,
        )}
      >
        {state === "copied" ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5l3.2 3.2L13 5" />
          </svg>
        ) : null}
        {text}
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied"
          ? `${label}: copiado para a área de transferência.`
          : state === "failed"
            ? `${label}: não foi possível copiar. Selecione o texto manualmente.`
            : ""}
      </span>
    </>
  );
}
