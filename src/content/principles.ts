export interface Principle {
  index: string;
  title: string;
  description: string;
}

export const principles: readonly Principle[] = [
  {
    index: "01",
    title: "Feito por quem dá aula",
    description:
      "Cada tela nasceu de uma rotina real de tutoria, não de um briefing genérico.",
  },
  {
    index: "02",
    title: "Seus dados ficam com você",
    description: "Armazenamento local, sem conta obrigatória, alinhado à LGPD.",
  },
  {
    index: "03",
    title: "IA como assistente",
    description: "A IA sugere, o professor decide. Nunca o contrário.",
  },
  {
    index: "04",
    title: "Atualizações abertas",
    description:
      "Changelog público, versões documentadas, nada de mudança silenciosa.",
  },
];
