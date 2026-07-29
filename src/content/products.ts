import { vinculo } from "./site";

export type ProductStatus = "shipped" | "building" | "research";

export interface Product {
  id: string;
  name: string;
  status: ProductStatus;
  version?: string;
  platform?: string;
  /** Rótulo curto exibido no card ("Disponível", "Em desenvolvimento"…). */
  statusLabel: string;
  description: string;
  tags?: readonly string[];
  /** Rótulo do rodapé do card, ex. "Previsto". */
  etaLabel?: string;
  eta?: string;
  downloadUrl?: string;
  storeUrl?: string;
  /** Página interna do produto, quando existir. */
  href?: string;
  /** Produtos não lançados abrem o modal de lista de espera. */
  waitlist: boolean;
  /** Preenchimento da nébula que vela os cards não lançados. */
  nebula?: {
    background: string;
    opacity: number;
  };
}

export const products: readonly Product[] = [
  {
    id: "vinculo-tutoria",
    name: "Vínculo Tutoria",
    status: "shipped",
    version: vinculo.version,
    platform: "Windows 10/11",
    statusLabel: "Disponível",
    description:
      "Registro de atendimentos de tutoria para professores: sessões, evolução do aluno e relatórios prontos para a coordenação. Funciona offline, tudo salvo na sua máquina.",
    tags: ["Offline-first", "Relatórios PDF", "LGPD"],
    downloadUrl: vinculo.downloadUrl,
    storeUrl: vinculo.storeUrl,
    href: "/#app",
    waitlist: false,
  },
  {
    id: "plano-de-aula-ia",
    name: "Plano de Aula IA",
    status: "building",
    statusLabel: "Em desenvolvimento",
    description:
      "Rascunho de plano alinhado à BNCC em minutos, com o professor sempre no controle da revisão final.",
    etaLabel: "Previsto",
    eta: "2026 Q4",
    waitlist: true,
    nebula: {
      background: [
        "radial-gradient(42% 38% at 32% 28%, rgba(120,66,220,.55), transparent 70%)",
        "radial-gradient(40% 34% at 70% 62%, rgba(30,72,180,.45), transparent 72%)",
        "radial-gradient(50% 44% at 52% 48%, rgba(10,7,24,.7), transparent 76%)",
      ].join(","),
      opacity: 0.62,
    },
  },
  {
    id: "constelacao",
    name: "Constelação",
    status: "research",
    statusLabel: "Pesquisa",
    description:
      "Mapa visual de progresso da turma: cada aluno uma estrela, cada vínculo uma linha luminosa.",
    etaLabel: "Exploratório",
    eta: "Sem data",
    waitlist: true,
    nebula: {
      background: [
        "radial-gradient(40% 36% at 66% 30%, rgba(30,72,180,.5), transparent 70%)",
        "radial-gradient(44% 38% at 30% 66%, rgba(120,66,220,.42), transparent 72%)",
        "radial-gradient(50% 44% at 50% 50%, rgba(10,7,24,.7), transparent 76%)",
      ].join(","),
      opacity: 0.55,
    },
  },
];

export const waitlistProducts = products.filter((p) => p.waitlist);

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** IDs aceitos pela rota POST /api/waitlist. */
export const waitlistProductIds = waitlistProducts.map((p) => p.id);

/**
 * Micro-estatísticas do hero. Copy original do handoff, mantida como conteúdo
 * editável.
 *
 * PENDENTE COM A CLIENTE: o handoff diz "3 em construção", mas apenas dois
 * produtos não lançados estão catalogados acima. Confirmar o terceiro (e
 * adicioná-lo a `products`) ou ajustar o número para 2.
 */
export const heroStats: readonly string[] = [
  "1 app publicado",
  "3 em construção",
  "100% dados locais",
];

/** Recursos destacados no bloco do Vínculo Tutoria. */
export const vinculoFeatures: readonly string[] = [
  "Sessões de tutoria com objetivo, evolução e próximos passos",
  "Relatório por aluno ou por turma, exportável em PDF",
  "Backup local automático — sem nuvem, sem conta",
];
