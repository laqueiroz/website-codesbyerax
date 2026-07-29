"use client";

import { useEffect, useState } from "react";

/**
 * Descobre qual seção da home está sendo lida no momento, para o `aria-current`
 * dos links da navbar.
 *
 * Usa uma faixa estreita no meio da viewport (`rootMargin`) — o marcador só
 * muda quando a seção realmente domina a tela, evitando o pisca-pisca que
 * aparece quando o limiar fica na borda.
 */
export function useActiveSection(sectionIds: readonly string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) {
      setActiveId(null);
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }

        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        setActiveId(best);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const element of elements) observer.observe(element);

    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return activeId;
}
