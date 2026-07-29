"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PointerContextValue {
  /** Deslocamento normalizado dentro do escopo, de -0.5 a 0.5. */
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  enabled: boolean;
}

const PointerContext = createContext<PointerContextValue | null>(null);

type ScopeTag = "header" | "section" | "div";

interface MouseParallaxScopeProps extends HTMLAttributes<HTMLElement> {
  as?: ScopeTag;
  children: ReactNode;
}

/**
 * Define a área que o ponteiro controla (o `[data-par-scope]` do protótipo).
 *
 * Publica a posição normalizada do cursor para as camadas descendentes. Sob
 * `prefers-reduced-motion: reduce` os listeners nem são registrados e as
 * camadas ficam paradas na origem.
 */
export function MouseParallaxScope({
  as = "div",
  children,
  ...rest
}: MouseParallaxScopeProps) {
  const hostRef = useRef<HTMLElement | null>(null);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = !prefersReducedMotion;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      // Só o mouse conduz parallax: em toque isso brigaria com a rolagem.
      if (!enabled || event.pointerType !== "mouse") return;
      const host = hostRef.current;
      if (!host) return;

      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      nx.set((event.clientX - rect.left) / rect.width - 0.5);
      ny.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [enabled, nx, ny],
  );

  const handlePointerLeave = useCallback(() => {
    nx.set(0);
    ny.set(0);
  }, [nx, ny]);

  return createElement(
    as,
    {
      ...rest,
      ref: hostRef,
      ...(enabled
        ? { onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave }
        : {}),
    },
    <PointerContext.Provider value={{ nx, ny, enabled }}>
      {children}
    </PointerContext.Provider>,
  );
}

interface MouseParallaxLayerProps {
  /** Amplitude em px. Profundidades do handoff: 22, 18, 16, 14. */
  depth: number;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Mola frouxa: reproduz o "atraso" das transições de .8–.9s do protótipo. */
const SPRING = { stiffness: 45, damping: 18, mass: 0.9 } as const;

/**
 * Camada que se desloca contra o cursor (`[data-par="<depth>"]`).
 *
 * Deve ficar dentro de um `MouseParallaxScope`. Fora dele — ou com movimento
 * reduzido — renderiza estática, sem custo de animação.
 */
export function MouseParallaxLayer({
  depth,
  children,
  className,
  style,
}: MouseParallaxLayerProps) {
  const pointer = useContext(PointerContext);

  // Hooks são chamados sempre, na mesma ordem; o resultado é ignorado quando
  // não há escopo ativo.
  const fallback = useMotionValue(0);
  const rawX = useTransform(pointer?.nx ?? fallback, (value) => -value * depth);
  const rawY = useTransform(pointer?.ny ?? fallback, (value) => -value * depth);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  if (!pointer?.enabled) {
    return (
      <div aria-hidden="true" className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div aria-hidden="true" className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}
