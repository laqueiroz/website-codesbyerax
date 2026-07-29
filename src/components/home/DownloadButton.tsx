import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { vinculo } from "@/content/site";

interface DownloadButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Mostra "WIN · <tamanho>" ao lado do rótulo. */
  showPlatformMeta?: boolean;
  /** Mostra "v<versão> · <tamanho>". */
  showVersionMeta?: boolean;
  className?: string;
  /** Sobrescreve a URL de configuração — usado nos testes. */
  url?: string;
  version?: string;
  fileSize?: string;
}

/**
 * Botão de download direto do instalador.
 *
 * Sem `NEXT_PUBLIC_VINCULO_DOWNLOAD_URL` configurada, ele NÃO vira um link
 * falso: renderiza desabilitado com o rótulo "Disponível em breve" e uma
 * explicação para leitores de tela. Assim a página nunca promete um arquivo
 * que não existe.
 */
export function DownloadButton({
  label = "Baixar para Windows",
  variant = "gradient",
  size = "md",
  showPlatformMeta = false,
  showVersionMeta = false,
  className,
  url = vinculo.downloadUrl,
  version = vinculo.version,
  fileSize = vinculo.fileSize,
}: DownloadButtonProps) {
  if (!url) {
    return (
      <Button size={size} className={className} disabled>
        Disponível em breve
        <span className="sr-only">
          {" "}
          — o instalador ainda não foi publicado nesta página.
        </span>
      </Button>
    );
  }

  const meta = showVersionMeta
    ? `v${version} · ${fileSize}`
    : showPlatformMeta
      ? `WIN · ${fileSize}`
      : undefined;

  return (
    <Button href={url} download variant={variant} size={size} className={className} meta={meta}>
      {label}
    </Button>
  );
}

interface StoreButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  url?: string;
}

/**
 * Botão da Microsoft Store. Abre em nova aba com `rel="noopener noreferrer"`.
 * Sem URL configurada, fica desabilitado — a distribuição na Store ainda está
 * "em curso" no roadmap.
 */
export function StoreButton({
  label = "Microsoft Store",
  variant = "outline",
  size = "md",
  className,
  url = vinculo.storeUrl,
}: StoreButtonProps) {
  if (!url) {
    return (
      <Button size={size} className={className} disabled>
        Microsoft Store em breve
        <span className="sr-only">
          {" "}
          — a publicação na loja ainda está em andamento.
        </span>
      </Button>
    );
  }

  return (
    <Button href={url} external variant={variant} size={size} className={className}>
      {label}
    </Button>
  );
}
