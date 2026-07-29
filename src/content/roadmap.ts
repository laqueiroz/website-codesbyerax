export type MilestoneStatus = "done" | "active" | "planned" | "exploratory";

export interface Milestone {
  id: string;
  status: MilestoneStatus;
  /** Rótulo completo, ex. "Entregue · 2026 Q2". */
  statusLabel: string;
  title: string;
  description: string;
}

/**
 * A progressão de opacidade é deliberada: quanto mais especulativo o item,
 * mais apagado o nó e o texto (ver `statusTone` em RoadmapSection).
 */
export const roadmap: readonly Milestone[] = [
  {
    id: "vinculo-1-4",
    status: "done",
    statusLabel: "Entregue · 2026 Q2",
    title: "Vínculo Tutoria 1.4",
    description: "Relatórios em PDF e backup local automático.",
  },
  {
    id: "microsoft-store",
    status: "active",
    statusLabel: "Em curso · 2026 Q3",
    title: "Microsoft Store",
    description: "Distribuição oficial e atualização automática.",
  },
  {
    id: "plano-de-aula-ia",
    status: "planned",
    statusLabel: "Previsto · 2026 Q4",
    title: "Plano de Aula IA",
    description: "Beta fechada com professores parceiros.",
  },
  {
    id: "constelacao",
    status: "exploratory",
    statusLabel: "Exploratório",
    title: "Constelação",
    description: "Visualização de progresso por turma.",
  },
];
