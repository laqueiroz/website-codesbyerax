"use client";

import { useEffect } from "react";

/**
 * Trava o scroll da página enquanto `locked` for verdadeiro.
 *
 * Usa contagem de referências porque a intro e um modal podem se sobrepor: o
 * scroll só é liberado quando o último consumidor solta a trava. Compensa a
 * largura da barra de rolagem para não deslocar o layout ao travar.
 */
let lockCount = 0;
let previousPaddingRight = "";

export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      previousPaddingRight = body.style.paddingRight;
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
      documentElement.setAttribute("data-scroll-locked", "");
    }

    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        documentElement.removeAttribute("data-scroll-locked");
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [locked]);
}
