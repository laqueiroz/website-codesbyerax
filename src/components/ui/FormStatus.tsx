import { cn } from "@/lib/cn";

export type FormState = "idle" | "submitting" | "success" | "error" | "not-configured";

const TONES: Record<Exclude<FormState, "idle" | "submitting">, string> = {
  success: "border-cyan-400/40 bg-cyan-400/8 text-cyan-400",
  error: "border-[#ff9d9d]/45 bg-[#ff9d9d]/8 text-[#ffb4b4]",
  "not-configured": "border-violet-300/45 bg-violet-300/8 text-violet-200",
};

interface FormStatusProps {
  state: FormState;
  message?: string;
  className?: string;
}

/**
 * Região viva que anuncia o resultado do envio.
 *
 * Sempre montada — um `aria-live` inserido no mesmo instante em que ganha
 * conteúdo costuma não ser anunciado por parte dos leitores de tela.
 * `role="status"` mantém o aviso educado, sem interromper a leitura.
 */
export function FormStatus({ state, message, className }: FormStatusProps) {
  const visible = state !== "idle" && state !== "submitting" && Boolean(message);

  return (
    <div role="status" aria-live="polite" className={cn("min-h-0", className)}>
      {visible ? (
        <p
          className={cn(
            "rounded-lg border px-4 py-3 text-[14px] font-light leading-[1.6]",
            TONES[state as keyof typeof TONES],
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
