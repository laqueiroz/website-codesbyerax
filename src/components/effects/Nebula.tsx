import { cn } from "@/lib/cn";

interface NebulaProps {
  /** Um ou mais `radial-gradient()` separados por vírgula. */
  background: string;
  /** Sangria além das bordas do elemento pai, em px. */
  inset?: number;
  blur?: number;
  opacity?: number;
  className?: string;
}

/**
 * Camada de nébula puramente decorativa. Sempre `pointer-events: none` para
 * não roubar cliques do conteúdo que ela envolve.
 */
export function Nebula({
  background,
  inset = -40,
  blur = 14,
  opacity = 1,
  className,
}: NebulaProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={{
        inset: `${inset}px`,
        background,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );
}
