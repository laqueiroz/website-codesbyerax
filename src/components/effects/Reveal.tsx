"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** Atraso em segundos, para escalonar itens irmãos. */
  delay?: number;
  /** Deslocamento vertical inicial, em px. */
  distance?: number;
  as?: "div" | "section" | "article" | "li";
}

/**
 * Revelação na rolagem — o equivalente Framer Motion do `[data-rise]` do
 * protótipo: sobe 26px e aparece, uma única vez (`once: true`), com o mesmo
 * limiar de 14% de visibilidade.
 *
 * Com movimento reduzido, o deslocamento some e resta apenas o fade.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 26,
  as = "div",
  ...rest
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const offset = prefersReducedMotion ? 0 : distance;

  // Os componentes de motion são tipados por tag, e os handlers de evento
  // divergem entre elas (HTMLDivElement vs HTMLLIElement…). Como este wrapper
  // só repassa props genéricas de container, um cast único aqui evita
  // transformar o componente inteiro em genérico sem ganho real.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      // Gancho para o fallback sem JavaScript declarado no layout: sem ele,
      // o `opacity: 0` do HTML do servidor nunca seria desfeito.
      data-reveal=""
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.9,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
