import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  children: ReactNode;
  /** Índice à direita, ex. "01 — Catálogo". */
  index?: string;
  /** `id` usado pelo `aria-labelledby` da seção. */
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  /** Aproxima o índice do título em vez de empurrá-lo para a borda. */
  tight?: boolean;
}

/**
 * Cabeçalho de seção: display em Cormorant mais o índice em mono.
 * O tamanho é fluido — `clamp(32px, 4.2vw, 62px)`, conforme o handoff.
 */
export function SectionHeading({
  children,
  index,
  id,
  as: Tag = "h2",
  className,
  tight = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-5 gap-y-3",
        tight ? "justify-start" : "justify-between",
        className,
      )}
    >
      <Tag
        id={id}
        className="type-display m-0 text-[clamp(32px,4.2vw,62px)] text-white-soft"
      >
        {children}
      </Tag>
      {index ? (
        <span className="type-label shrink-0 text-white-soft/55">{index}</span>
      ) : null}
    </div>
  );
}
