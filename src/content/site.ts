/**
 * Single source of truth for identity, navigation and distribution config.
 *
 * Anything the client changes often (version, installer size, checksum, store
 * links) is read from environment variables here and nowhere else, so a release
 * never requires touching a component.
 */

export const siteConfig = {
  name: "Codes by Erax",
  legalName: "Codes by Erax",
  tagline: "Tecnologia que observa a sala de aula.",
  description:
    "Estúdio de software, inteligência artificial e educação. Criamos o Vínculo Tutoria e outras ferramentas para quem ensina — offline-first, sem conta obrigatória e alinhadas à LGPD.",
  shortDescription:
    "Software, inteligência artificial e educação. Feito com atenção em cada detalhe.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://codesbyerax.com").replace(/\/$/, ""),
  locale: "pt-BR",
  copyrightYear: 2026,
  /** Exibido nas páginas de contato/suporte. Vazio = bloco oculto. */
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
} as const;

/** Marca — arquivos em /public/assets. Ver docs/assets-pendentes.md. */
export const brandAssets = {
  mark: { src: "/assets/logo-mark.png", width: 539, height: 491 },
  word: { src: "/assets/logo-word.png", width: 539, height: 187 },
  full: { src: "/assets/logo-full.png", width: 539, height: 678 },
} as const;

// ---------------------------------------------------------------------------
// Distribuição do Vínculo Tutoria
// ---------------------------------------------------------------------------

export interface DownloadConfig {
  version: string;
  fileSize: string;
  /** Vazio => botão desabilitado com "Disponível em breve". Nunca um link falso. */
  downloadUrl: string;
  storeUrl: string;
  sha256: string;
  platform: string;
  requirements: readonly string[];
  installSteps: readonly string[];
}

export const vinculo: DownloadConfig = {
  version: process.env.NEXT_PUBLIC_VINCULO_VERSION || "1.4.2",
  fileSize: process.env.NEXT_PUBLIC_VINCULO_FILE_SIZE || "24 MB",
  downloadUrl: process.env.NEXT_PUBLIC_VINCULO_DOWNLOAD_URL || "",
  storeUrl: process.env.NEXT_PUBLIC_VINCULO_STORE_URL || "",
  sha256: process.env.NEXT_PUBLIC_VINCULO_SHA256 || "",
  platform: "Windows 10 / 11 · 64 bits",
  requirements: [
    "Windows 10 (versão 1809) ou Windows 11, 64 bits",
    "4 GB de memória RAM",
    "200 MB livres em disco",
    "Não requer conexão com a internet para uso diário",
  ],
  installSteps: [
    "Baixe o instalador nesta página.",
    "Confira o checksum SHA-256 do arquivo antes de executar (opcional, mas recomendado).",
    "Execute o instalador. O Windows pode exibir um aviso do SmartScreen para aplicativos novos — escolha “Mais informações” e depois “Executar assim mesmo”.",
    "Abra o Vínculo Tutoria. Nenhuma conta é necessária: os dados ficam na sua máquina desde o primeiro uso.",
  ],
};

// ---------------------------------------------------------------------------
// Navegação
// ---------------------------------------------------------------------------

export interface NavItem {
  href: string;
  label: string;
  /** Preenchido quando o destino é uma seção da home (scroll-spy / aria-current). */
  sectionId?: string;
}

export const primaryNav: readonly NavItem[] = [
  { href: "/#produtos", label: "Produtos", sectionId: "produtos" },
  { href: "/#porque", label: "Por que nós", sectionId: "porque" },
  { href: "/#roadmap", label: "Roadmap", sectionId: "roadmap" },
  { href: "/#app", label: "Vínculo Tutoria", sectionId: "app" },
  { href: "/suporte", label: "Suporte" },
];

export interface FooterColumn {
  heading: string;
  links: readonly NavItem[];
}

export const footerNav: readonly FooterColumn[] = [
  {
    heading: "Produtos",
    links: [
      { href: "/#app", label: "Vínculo Tutoria" },
      { href: "/produtos", label: "Futuros aplicativos" },
      { href: "/downloads", label: "Downloads" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    heading: "Empresa",
    links: [
      { href: "/sobre", label: "Sobre" },
      { href: "/blog", label: "Blog / Novidades" },
      { href: "/suporte", label: "Suporte" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacidade", label: "Privacidade (LGPD)" },
      { href: "/termos", label: "Termos de uso" },
      { href: "/licencas", label: "Licenças" },
      { href: "/status", label: "Status" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Feature flags de conteúdo
// ---------------------------------------------------------------------------

/**
 * Os depoimentos do protótipo são placeholders escritos na voz pretendida —
 * não são declarações reais de clientes. A seção só volta ao ar quando
 * `testimonials` em content/testimonials.ts tiver depoimentos autorizados.
 */
export const showTestimonials = false;

/** Nenhum artigo publicado ainda; a rota /blog exibe estado "em construção". */
export const showBlogPosts = false;
