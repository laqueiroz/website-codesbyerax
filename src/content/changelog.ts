export interface ChangelogEntry {
  version: string;
  /** ISO 8601 (YYYY-MM-DD) ou período, quando a data exata não foi informada. */
  date: string;
  /** Rótulo legível, ex. "2026 Q2". */
  period: string;
  highlights: readonly string[];
}

/**
 * Registro público de versões.
 *
 * ATENÇÃO — CONTEÚDO INCOMPLETO POR DECISÃO DELIBERADA.
 * Só há uma entrega documentada nos materiais recebidos (a 1.4, com relatórios
 * em PDF e backup local automático, no roadmap como "Entregue · 2026 Q2").
 * Nenhuma outra versão foi descrita, e inventar notas de release seria
 * fabricar histórico do produto. As versões anteriores devem ser preenchidas
 * pela cliente — ver docs/pendencias.md.
 */
export const changelog: readonly ChangelogEntry[] = [
  {
    version: "1.4",
    date: "2026-06-30",
    period: "2026 Q2",
    highlights: [
      "Relatórios em PDF por aluno e por turma.",
      "Backup local automático.",
    ],
  },
];

/** Exibido no topo da página de changelog enquanto o histórico estiver incompleto. */
export const changelogNotice =
  "Este registro está sendo montado. Apenas a versão 1.4 foi documentada nos materiais recebidos; as notas das versões anteriores serão publicadas assim que forem consolidadas.";
