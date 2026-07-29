import { cn } from "@/lib/cn";
import type { ProductStatus } from "@/content/products";

type Tone = "cyan" | "violet" | "muted";

const TONE_BY_STATUS: Record<ProductStatus, Tone> = {
  shipped: "cyan",
  building: "violet",
  research: "violet",
};

const TONE_CLASSES: Record<Tone, { text: string; dot: string }> = {
  cyan: { text: "text-cyan-400", dot: "bg-cyan-400" },
  violet: { text: "text-violet-300", dot: "bg-violet-300" },
  muted: { text: "text-white-soft/62", dot: "bg-white-soft/62" },
};

interface StatusBadgeProps {
  status?: ProductStatus;
  tone?: Tone;
  children: React.ReactNode;
  /** Ponto pulsante — só para o que está de fato ativo agora. */
  pulse?: boolean;
  className?: string;
}

/**
 * Rótulo de estado em mono maiúsculo, com ponto colorido opcional.
 *
 * O estado nunca é comunicado só pela cor: o texto ("Disponível",
 * "Em desenvolvimento") carrega a mesma informação.
 */
export function StatusBadge({
  status,
  tone,
  children,
  pulse = false,
  className,
}: StatusBadgeProps) {
  const resolved: Tone = tone ?? (status ? TONE_BY_STATUS[status] : "muted");
  const classes = TONE_CLASSES[resolved];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[10.5px] uppercase leading-none tracking-[.2em]",
        classes.text,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          classes.dot,
          pulse && "anim-blinkdot",
        )}
      />
      {children}
    </span>
  );
}
