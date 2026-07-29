import { vinculo } from "./site";

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/**
 * Respostas derivadas exclusivamente do material do handoff (offline-first,
 * sem conta, LGPD, Windows 10/11, relatórios em PDF, backup local).
 * Nada aqui promete recurso, prazo ou garantia que não conste nos materiais.
 */
export const faqs: readonly Faq[] = [
  {
    id: "custo",
    question: "O Vínculo Tutoria é gratuito?",
    answer:
      "Sim. O aplicativo é gratuito para professores, sem cadastro, sem assinatura e sem cobrança por relatório gerado.",
  },
  {
    id: "conta",
    question: "Preciso criar uma conta para usar?",
    answer:
      "Não. O aplicativo funciona sem conta e sem login. Você instala e começa a registrar atendimentos imediatamente.",
  },
  {
    id: "dados",
    question: "Onde ficam os dados dos meus alunos?",
    answer:
      "Na sua máquina. O Vínculo Tutoria é offline-first: os registros são gravados localmente e não são enviados para nenhum servidor. O backup local automático também fica no seu computador.",
  },
  {
    id: "internet",
    question: "Funciona sem internet?",
    answer:
      "Funciona. Todo o uso diário — registrar sessões, consultar histórico e gerar relatórios — acontece offline.",
  },
  {
    id: "sistema",
    question: "Quais são os requisitos de sistema?",
    answer: `${vinculo.platform}. O instalador tem cerca de ${vinculo.fileSize}. Não há versão para macOS ou Linux no momento.`,
  },
  {
    id: "relatorios",
    question: "Como funcionam os relatórios?",
    answer:
      "Você gera relatório por aluno ou por turma e exporta em PDF, no formato que a coordenação recebe pronto para leitura.",
  },
  {
    id: "smartscreen",
    question: "O Windows exibiu um aviso do SmartScreen. É normal?",
    answer:
      "Sim. O aviso aparece para instaladores novos, ainda sem histórico de reputação junto à Microsoft. Escolha “Mais informações” e depois “Executar assim mesmo”. Se preferir, confira antes o checksum SHA-256 publicado na página de downloads.",
  },
  {
    id: "atualizacao",
    question: "Como recebo atualizações?",
    answer:
      "Hoje as versões são publicadas na página de downloads e registradas no changelog público. A distribuição pela Microsoft Store, com atualização automática, está em curso no roadmap.",
  },
  {
    id: "lgpd",
    question: "E a LGPD?",
    answer:
      "O aplicativo foi desenhado para minimizar exposição de dados: armazenamento local, sem conta obrigatória e sem envio para a nuvem. A responsabilidade pelo tratamento dos dados dos alunos permanece com a instituição de ensino e com o professor.",
  },
];

export interface Troubleshooting {
  id: string;
  problem: string;
  solution: string;
}

export const troubleshooting: readonly Troubleshooting[] = [
  {
    id: "instalador-bloqueado",
    problem: "O instalador não abre ou é bloqueado pelo antivírus.",
    solution:
      "Confira o checksum SHA-256 do arquivo baixado na página de downloads. Se conferir, libere o arquivo na quarentena do antivírus e execute novamente.",
  },
  {
    id: "pdf-nao-gera",
    problem: "O relatório em PDF não é gerado.",
    solution:
      "Verifique se a pasta de destino escolhida existe e se você tem permissão de escrita nela. Pastas sincronizadas por serviços corporativos às vezes bloqueiam a gravação.",
  },
  {
    id: "dados-sumiram",
    problem: "Os registros sumiram depois de trocar de computador.",
    solution:
      "Os dados ficam apenas na máquina onde foram criados. Para migrar, copie o backup local automático do computador antigo antes de instalar no novo.",
  },
  {
    id: "outro",
    problem: "Meu problema não está na lista.",
    solution:
      "Descreva o que aconteceu pelo formulário de contato, informando a versão do aplicativo e a versão do Windows. Isso encurta bastante o diagnóstico.",
  },
];
