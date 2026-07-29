"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Lê `prefers-reduced-motion` e reage a mudanças em tempo real.
 *
 * Começa em `false` para que o HTML do servidor e a primeira renderização do
 * cliente sejam idênticos (sem erro de hidratação); o valor real chega no
 * primeiro efeito, antes de qualquer animação longa disparar.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    setPrefersReduced(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
