export type ServiceState = "operational" | "degraded" | "down" | "maintenance";

export interface ServiceStatus {
  id: string;
  name: string;
  state: ServiceState;
  description: string;
}

export const serviceStateLabels: Record<ServiceState, string> = {
  operational: "Operacional",
  degraded: "Degradado",
  down: "Indisponível",
  maintenance: "Em manutenção",
};

/**
 * Painel de status mantido manualmente — não há monitoramento automatizado
 * conectado a esta página. A própria página informa isso ao visitante para não
 * sugerir uma garantia de disponibilidade que não existe.
 */
export const services: readonly ServiceStatus[] = [
  {
    id: "site",
    name: "Site institucional",
    state: "operational",
    description: "Páginas públicas e formulários.",
  },
  {
    id: "downloads",
    name: "Distribuição de downloads",
    state: "operational",
    description: "Entrega do instalador do Vínculo Tutoria.",
  },
  {
    id: "app",
    name: "Vínculo Tutoria (aplicativo)",
    state: "operational",
    description:
      "O aplicativo é offline-first: funciona independentemente da disponibilidade dos serviços acima.",
  },
];

export const statusNotice =
  "Este painel é atualizado manualmente pela equipe da Codes by Erax e não reflete monitoramento automático em tempo real.";
