import { CopyButton } from "@/components/ui/CopyButton";
import { vinculo } from "@/content/site";

interface ChecksumLineProps {
  sha256?: string;
  /** Versão compacta usada dentro do CTA. */
  compact?: boolean;
}

/**
 * Checksum SHA-256 do instalador, com botão de cópia.
 *
 * A cópia do site promete o checksum, então ele não pode ser uma frase solta:
 * ou o valor está configurado e é exibido por inteiro, copiável, ou a página
 * diz claramente que ele ainda será publicado.
 */
export function ChecksumLine({ sha256 = vinculo.sha256, compact = false }: ChecksumLineProps) {
  if (!sha256) {
    return (
      <p className="m-0 font-mono text-[10.5px] uppercase leading-[1.6] tracking-[.16em] text-white-soft/60">
        Checksum SHA-256 ainda não publicado para esta versão.
      </p>
    );
  }

  return (
    <div
      className={
        compact
          ? "flex flex-col items-center gap-3"
          : "flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4"
      }
    >
      <p className="m-0 font-mono text-[10.5px] uppercase leading-none tracking-[.16em] text-white-soft/60">
        Checksum SHA-256
      </p>
      <code className="block max-w-full break-all font-mono text-[12px] leading-[1.6] text-white-soft/85">
        {sha256}
      </code>
      <CopyButton
        value={sha256}
        label="Copiar checksum SHA-256 do instalador"
        className="self-start"
      />
    </div>
  );
}
