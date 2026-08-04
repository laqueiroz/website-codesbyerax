export const localeCodes = ["pt", "en"] as const;
export type Locale = (typeof localeCodes)[number];

export type Article = {
  slug: string;
  alternateSlug: string;
  title: string;
  description: string;
  published: string;
  modified: string;
  readingTime: string;
  intro: string;
  sections: { title: string; paragraphs: string[]; items?: string[] }[];
};

type Copy = {
  common: {
    home: string; product: string; blog: string; about: string; support: string;
    download: string; privacy: string; terms: string; licenses: string;
    changelog: string; feedback: string; skip: string;
  };
  home: {
    title: string; description: string; eyebrow: string; hero: string;
    heroText: string[]; primary: string; secondary: string;
    experienceTitle: string; experience: string[];
    featuredTitle: string; featured: string[]; features: string[];
    principlesTitle: string; principles: { title: string; text: string }[];
    contentTitle: string; contentText: string; blogButton: string;
    ctaTitle: string; ctaText: string; contact: string;
  };
  product: {
    title: string; description: string; subtitle: string; intro: string[];
    whyTitle: string; why: string[]; audienceTitle: string;
    audience: { title: string; text: string }[];
    featuresTitle: string; features: { title: string; text: string[] }[];
    stepsTitle: string; steps: { title: string; text: string }[];
    careTitle: string; care: string[];
    tutorialTitle: string; tutorial: string[];
    downloadTitle: string; downloadText: string[];
    downloadFacts: string[]; windowsTitle: string; windows: string;
    feedbackTitle: string; feedbackText: string; faqTitle: string;
    faqs: { q: string; a: string[] }[];
  };
  blog: { title: string; description: string; intro: string };
  legal: {
    privacyTitle: string; privacyDescription: string; privacy: { title: string; paragraphs: string[]; items?: string[] }[];
    termsTitle: string; termsDescription: string; terms: { title: string; paragraphs: string[]; items?: string[] }[];
    licensesTitle: string; licenses: { title: string; paragraphs: string[]; items?: string[] }[];
    changelogTitle: string; changelogDescription: string;
  };
  feedback: {
    title: string; intro: string; warning: string; name: string; nameHelp: string;
    email: string; emailHelp: string; role: string; version: string; rating: string;
    useful: string; problem: string; problemHelp: string; improve: string;
    improveHelp: string; consent: string; submit: string; success: string; error: string;
    roles: string[]; versions: string[]; ratings: string[]; features: string[]; consents: string[];
  };
  articles: Article[];
};

const ptArticles: Article[] = [
  {
    slug: "o-que-e-tutoria-escolar", alternateSlug: "what-is-school-tutoring",
    title: "O que é tutoria escolar e como ela apoia o desenvolvimento dos estudantes",
    description: "Entenda o papel da tutoria escolar, seus objetivos e como o acompanhamento contínuo pode fortalecer a autonomia e o vínculo dos estudantes.",
    published: "2026-07-29", modified: "2026-07-29", readingTime: "7 min de leitura",
    intro: "A tutoria escolar é uma prática de acompanhamento que cria um espaço regular de escuta, orientação e reflexão sobre a vida acadêmica do estudante.",
    sections: [
      { title: "Mais do que uma conversa isolada", paragraphs: ["A tutoria não se resume a resolver um problema pontual. Ela ganha sentido quando existe continuidade: o professor retoma metas, observa mudanças e ajuda o estudante a compreender o próprio percurso.", "Esse acompanhamento não substitui o trabalho da família, da coordenação ou de profissionais especializados. O tutor atua dentro de sua função pedagógica e encaminha situações que exigem outras formas de cuidado."] },
      { title: "O papel do professor tutor", paragraphs: ["O professor tutor acolhe, faz perguntas, organiza informações e ajuda a transformar preocupações amplas em próximos passos possíveis."], items: ["Escutar com atenção e respeito;", "Ajudar o estudante a definir metas realistas;", "Acompanhar frequência, organização e aprendizagem;", "Registrar combinados e retomar assuntos anteriores;", "Realizar encaminhamentos quando necessário."] },
      { title: "Autonomia e vínculo", paragraphs: ["Uma boa tutoria não cria dependência. Ela oferece referências para que o estudante aprenda a tomar decisões, pedir ajuda e avaliar seus avanços.", "O vínculo nasce da presença consistente, do respeito e da confiança. Registros objetivos ajudam o professor a dar continuidade às conversas sem transformar o encontro em um processo burocrático."] },
      { title: "Como começar", paragraphs: ["Defina uma frequência possível, explique a finalidade dos encontros e combine como os registros serão utilizados. Comece com perguntas abertas sobre rotina, desafios e objetivos.", "Ao final, registre apenas o necessário, estabeleça um próximo passo claro e marque quando o assunto será retomado."] },
    ],
  },
  {
    slug: "como-organizar-registros-de-tutoria", alternateSlug: "how-to-organize-tutoring-records",
    title: "Como organizar registros de tutoria escolar",
    description: "Veja como criar registros claros, úteis e respeitosos para dar continuidade ao acompanhamento dos estudantes.",
    published: "2026-07-29", modified: "2026-07-29", readingTime: "6 min de leitura",
    intro: "Registros de tutoria ajudam a recuperar o que foi conversado, acompanhar combinados e preparar encontros futuros. Para serem úteis, precisam ser objetivos, organizados e protegidos.",
    sections: [
      { title: "Registre com uma finalidade", paragraphs: ["Antes de escrever, pergunte qual informação será necessária para dar continuidade ao acompanhamento. Acumular detalhes sem propósito aumenta o risco de exposição e dificulta encontrar o que importa."] },
      { title: "Uma estrutura simples", paragraphs: ["Um registro pode conter data, contexto do encontro, assuntos principais, orientações, combinados e data de retomada."], items: ["Use linguagem profissional e descritiva;", "Diferencie fatos observados de relatos;", "Evite rótulos e julgamentos;", "Registre encaminhamentos e responsáveis;", "Revise o texto antes de salvar."] },
      { title: "Organize para recuperar", paragraphs: ["Mantenha os registros vinculados ao perfil correto e utilize datas e categorias consistentes. Uma ferramenta centralizada reduz a dispersão entre cadernos, documentos e planilhas.", "O histórico deve permitir compreender a sequência do acompanhamento, não apenas reunir anotações desconectadas."] },
      { title: "Proteção e revisão", paragraphs: ["Use senha no computador, limite acessos e mantenha cópias de segurança adequadas às regras da instituição. Revise periodicamente o que ainda precisa ser mantido.", "Nunca envie dados identificáveis de estudantes em pedidos de suporte ou feedback."] },
    ],
  },
  {
    slug: "tutoria-individual-e-coletiva", alternateSlug: "individual-and-group-tutoring",
    title: "Tutoria individual e coletiva: diferenças e possibilidades",
    description: "Conheça as diferenças entre tutoria individual e coletiva e saiba como combinar as duas práticas no acompanhamento escolar.",
    published: "2026-07-29", modified: "2026-07-29", readingTime: "6 min de leitura",
    intro: "Encontros individuais e coletivos atendem a necessidades diferentes. Quando planejados de forma complementar, ampliam as possibilidades de acompanhamento.",
    sections: [
      { title: "Tutoria individual", paragraphs: ["O encontro individual favorece uma conversa reservada sobre rotina, aprendizagem, metas e dificuldades específicas. O estudante dispõe de tempo para organizar suas ideias e o tutor pode formular orientações mais próximas de seu contexto.", "Privacidade não significa segredo absoluto: situações de risco ou que exigem encaminhamento devem seguir os procedimentos da escola."] },
      { title: "Tutoria coletiva", paragraphs: ["A tutoria coletiva permite trabalhar temas compartilhados, fortalecer a cooperação e criar espaços de reflexão entre estudantes."], items: ["Organização dos estudos;", "Convivência e comunicação;", "Planejamento de metas;", "Participação e pertencimento;", "Estratégias para desafios comuns."] },
      { title: "Como combinar as modalidades", paragraphs: ["Questões gerais podem ser abordadas em grupo, enquanto necessidades particulares são retomadas individualmente. Os registros devem permanecer separados quando incluírem informações pessoais.", "O planejamento deve considerar tempo disponível, objetivo do encontro e segurança dos participantes."] },
    ],
  },
  {
    slug: "cuidados-ao-registrar-informacoes", alternateSlug: "student-information-recording-practices",
    title: "Cuidados ao registrar informações de estudantes",
    description: "Boas práticas para registrar informações escolares com necessidade, respeito, segurança e responsabilidade.",
    published: "2026-07-29", modified: "2026-07-29", readingTime: "7 min de leitura",
    intro: "Informações produzidas durante a tutoria podem envolver a vida acadêmica e pessoal dos estudantes. Registrar exige finalidade pedagógica, linguagem respeitosa e proteção.",
    sections: [
      { title: "Registre apenas o necessário", paragraphs: ["Nem tudo o que é dito em uma conversa precisa ser armazenado. Priorize informações que apoiem uma ação pedagógica, um combinado ou a continuidade do acompanhamento."] },
      { title: "Descreva sem julgar", paragraphs: ["Prefira descrições verificáveis. Em vez de atribuir características permanentes ao estudante, registre a situação observada, o contexto e a orientação realizada."], items: ["Não registre comentários ofensivos;", "Não inclua diagnósticos não confirmados;", "Evite suposições sobre família ou saúde;", "Identifique quando uma informação é relato do estudante;", "Corrija dados incorretos assim que identificados."] },
      { title: "Controle o acesso", paragraphs: ["Proteja o dispositivo com senha, não compartilhe contas e evite deixar registros visíveis em espaços públicos. Siga as políticas da instituição para retenção, descarte e comunicação de incidentes.", "O Vínculo Tutoria funciona localmente na versão atual. Isso dá ao usuário responsabilidade direta pela proteção e pelas cópias de segurança."] },
      { title: "Em caso de dúvida", paragraphs: ["Converse com a coordenação ou com o responsável institucional por privacidade. A necessidade pedagógica deve ser avaliada antes do registro, não depois da exposição."] },
    ],
  },
  {
    slug: "como-o-vinculo-tutoria-nasceu", alternateSlug: "how-vinculo-tutoria-was-created",
    title: "Como o Vínculo Tutoria nasceu",
    description: "Conheça a necessidade educacional que deu origem ao Vínculo Tutoria e os princípios que orientam seu desenvolvimento.",
    published: "2026-07-29", modified: "2026-07-29", readingTime: "5 min de leitura",
    intro: "O Vínculo Tutoria nasceu de uma dificuldade cotidiana: acompanhar estudantes ao longo do ano quando as informações estavam espalhadas em diferentes lugares.",
    sections: [
      { title: "Uma necessidade observada na prática", paragraphs: ["Cadernos, documentos e planilhas atendiam a partes do trabalho, mas tornavam difícil recuperar uma conversa anterior, perceber recorrências e visualizar o percurso de cada estudante.", "A pergunta inicial foi simples: como reunir os registros essenciais em um ambiente compreensível para quem vive a rotina educacional?"] },
      { title: "Da rotina para o produto", paragraphs: ["O sistema foi organizado em torno de perfis, turmas, conversas, tutorias individuais e coletivas, frequência e informações acadêmicas. Cada área responde a uma ação concreta do acompanhamento.", "A tecnologia não pretende substituir a escuta. Ela organiza o apoio para que o professor tenha mais condições de se lembrar, preparar e continuar."] },
      { title: "Um produto em evolução", paragraphs: ["A versão 1.4.0 é o início do histórico público. Testes e relatos de uso ajudam a identificar problemas e orientar melhorias, sem promessas de recursos ou datas ainda não definidas.", "O desenvolvimento permanece ligado ao princípio que originou o projeto: criar a partir de necessidades reais, com simplicidade, responsabilidade e respeito às pessoas."] },
    ],
  },
];

const enArticles: Article[] = ptArticles.map((article, index) => {
  const translated: Article[] = [
    { slug:"what-is-school-tutoring", alternateSlug:article.slug, title:"What Is School Tutoring and How Does It Support Student Development?", description:"Understand the role and goals of school tutoring and how continuous follow-up can strengthen student autonomy and connection.", published:article.published, modified:article.modified, readingTime:"7 min read", intro:"School tutoring is a follow-up practice that creates a regular space for listening, guidance, and reflection on a student's academic life.", sections:[
      {title:"More than an isolated conversation",paragraphs:["Tutoring is not limited to solving a single problem. It becomes meaningful through continuity: the teacher revisits goals, observes changes, and helps the student understand their own path.","This follow-up does not replace family, pedagogical coordination, or specialized professionals. Tutors act within their educational role and refer situations that require other forms of support."]},
      {title:"The tutoring teacher's role",paragraphs:["Tutors welcome, ask questions, organize information, and help turn broad concerns into possible next steps."],items:["Listen attentively and respectfully;","Help students define realistic goals;","Follow attendance, organization, and learning;","Record agreements and revisit previous topics;","Make referrals when necessary."]},
      {title:"Autonomy and connection",paragraphs:["Good tutoring does not create dependence. It gives students references to make decisions, ask for help, and evaluate progress.","Connection grows from consistent presence, respect, and trust. Objective records support continuity without turning meetings into bureaucracy."]},
      {title:"How to begin",paragraphs:["Set a feasible schedule, explain the purpose of meetings, and agree on how records will be used. Begin with open questions about routines, challenges, and goals.","At the end, record only what is needed, define a clear next step, and decide when the topic will be revisited."]},
    ]},
    { slug:"how-to-organize-tutoring-records", alternateSlug:article.slug, title:"How to Organize School Tutoring Records", description:"Learn how to create clear, useful, and respectful records that support continuous student follow-up.", published:article.published, modified:article.modified, readingTime:"6 min read", intro:"Tutoring records help recover past conversations, follow agreements, and prepare future meetings. To be useful, they must be objective, organized, and protected.", sections:[
      {title:"Record with a purpose",paragraphs:["Before writing, ask what information will be needed for follow-up. Collecting details without a purpose increases exposure and makes important information harder to find."]},
      {title:"A simple structure",paragraphs:["A record can include the date, meeting context, main topics, guidance, agreements, and a follow-up date."],items:["Use professional, descriptive language;","Distinguish observed facts from reports;","Avoid labels and judgments;","Record referrals and responsibilities;","Review before saving."]},
      {title:"Organize for retrieval",paragraphs:["Link records to the correct profile and use consistent dates and categories. A centralized tool reduces information scattered across notebooks, files, and spreadsheets.","History should reveal the sequence of follow-up, not merely collect disconnected notes."]},
      {title:"Protection and review",paragraphs:["Protect the computer with a password, restrict access, and keep backups consistent with institutional rules. Periodically review what still needs to be retained.","Never submit identifiable student data in support or feedback requests."]},
    ]},
    { slug:"individual-and-group-tutoring", alternateSlug:article.slug, title:"Individual and Group Tutoring: Differences and Possibilities", description:"Learn the differences between individual and group tutoring and how to combine both practices.", published:article.published, modified:article.modified, readingTime:"6 min read", intro:"Individual and group meetings address different needs. Planned as complementary practices, they expand follow-up possibilities.", sections:[
      {title:"Individual tutoring",paragraphs:["Individual meetings support private conversations about routines, learning, goals, and specific difficulties. Students have time to organize their thoughts, and tutors can offer guidance closer to their context.","Privacy does not mean absolute secrecy: risk situations must follow school procedures."]},
      {title:"Group tutoring",paragraphs:["Group tutoring makes it possible to explore shared themes, strengthen cooperation, and create spaces for reflection."],items:["Study organization;","Communication and coexistence;","Goal planning;","Participation and belonging;","Strategies for common challenges."]},
      {title:"Combining both formats",paragraphs:["General questions can be discussed in a group, while particular needs are revisited individually. Records containing personal information should remain separate.","Planning should consider available time, the meeting goal, and participant safety."]},
    ]},
    { slug:"student-information-recording-practices", alternateSlug:article.slug, title:"Responsible Practices for Recording Student Information", description:"Good practices for recording school information with necessity, respect, security, and responsibility.", published:article.published, modified:article.modified, readingTime:"7 min read", intro:"Information produced during tutoring may involve students' academic and personal lives. Recording requires an educational purpose, respectful language, and protection.", sections:[
      {title:"Record only what is necessary",paragraphs:["Not everything said in a conversation needs to be stored. Prioritize information that supports educational action, an agreement, or continued follow-up."]},
      {title:"Describe without judging",paragraphs:["Prefer verifiable descriptions. Instead of assigning permanent characteristics, record the observed situation, context, and guidance provided."],items:["Do not record offensive comments;","Do not include unconfirmed diagnoses;","Avoid assumptions about family or health;","Identify information reported by the student;","Correct inaccurate data promptly."]},
      {title:"Control access",paragraphs:["Protect the device with a password, do not share accounts, and do not leave records visible in public places. Follow institutional retention, disposal, and incident procedures.","Vínculo Tutoria currently works locally. The user is directly responsible for protection and backups."]},
      {title:"When in doubt",paragraphs:["Talk to pedagogical coordination or the institutional privacy contact. Educational necessity should be evaluated before recording, not after exposure."]},
    ]},
    { slug:"how-vinculo-tutoria-was-created", alternateSlug:article.slug, title:"How Vínculo Tutoria Was Created", description:"Discover the educational need that inspired Vínculo Tutoria and the principles guiding its development.", published:article.published, modified:article.modified, readingTime:"5 min read", intro:"Vínculo Tutoria began with an everyday difficulty: following students throughout the year when information was scattered across different places.", sections:[
      {title:"A need observed in practice",paragraphs:["Notebooks, documents, and spreadsheets supported parts of the work, but made it hard to recover an earlier conversation, notice recurring themes, and see each student's path.","The first question was simple: how could essential records be gathered in an environment that makes sense to educators?"]},
      {title:"From routine to product",paragraphs:["The system was organized around profiles, classes, conversations, individual and group tutoring, attendance, and academic information. Each area responds to a concrete follow-up action.","Technology is not intended to replace listening. It organizes support so teachers can remember, prepare, and continue."]},
      {title:"A product in progress",paragraphs:["Version 1.4.0 begins the public history. Testing and user reports help identify problems and guide improvements, without promises about features or dates that have not been defined.","Development remains connected to the project's founding principle: build from real needs with simplicity, responsibility, and respect."]},
    ]},
  ];
  return translated[index]!;
});

export const content: Record<Locale, Copy> = {
  pt: {
    common: { home:"Início", product:"Vínculo Tutoria", blog:"Blog", about:"Sobre", support:"Suporte", download:"Baixar", privacy:"Política de Privacidade", terms:"Termos de Uso", licenses:"Licenças", changelog:"Atualizações", feedback:"Enviar feedback", skip:"Pular para o conteúdo" },
    home: {
      title:"Codes by Erax — Tecnologia criada a partir da educação", description:"Conheça a Codes by Erax, uma marca que desenvolve aplicativos e ferramentas digitais para tornar a rotina de professores e educadores mais organizada, prática e humana.",
      eyebrow:"Educação · Criatividade · Tecnologia", hero:"Tecnologia criada a partir de necessidades reais.",
      heroText:["A Codes by Erax desenvolve aplicativos e ferramentas digitais pensados para simplificar rotinas, organizar informações e transformar problemas do cotidiano em soluções acessíveis.","Nosso primeiro produto é o Vínculo Tutoria, um sistema criado para apoiar professores no acompanhamento de estudantes e na organização dos registros de tutoria escolar."],
      primary:"Conheça o Vínculo Tutoria", secondary:"Explorar os projetos",
      experienceTitle:"Ferramentas criadas por quem conhece a rotina educacional",
      experience:["A Codes by Erax nasceu da união entre educação, criatividade e tecnologia.","Cada projeto parte da observação de uma necessidade concreta: uma tarefa repetitiva, uma informação difícil de organizar, um processo confuso ou uma ferramenta que ainda não existe da forma como deveria.","O objetivo não é apenas desenvolver aplicativos. É criar soluções que sejam fáceis de compreender, agradáveis de usar e realmente úteis para quem está do outro lado da tela."],
      featuredTitle:"Conheça o Vínculo Tutoria", featured:["O Vínculo Tutoria é um sistema de acompanhamento escolar criado para ajudar professores tutores a organizar informações, registrar conversas, acompanhar estudantes e manter um histórico mais claro das ações realizadas durante o ano letivo.","Em vez de espalhar anotações entre cadernos, documentos e várias planilhas, o professor pode reunir os principais registros em um único ambiente."],
      features:["Perfis individuais de estudantes","Organização por turmas","Registros de conversas e atendimentos","Tutoria individual","Tutoria coletiva","Acompanhamento de frequência","Boletim e evolução das médias","Histórico de acompanhamento","Recuperação pela lixeira","Funcionamento local no computador"],
      principlesTitle:"Tecnologia com propósito", principles:[{title:"Utilidade real",text:"Criamos ferramentas para resolver problemas concretos, e não apenas para adicionar mais uma plataforma à rotina do usuário."},{title:"Simplicidade",text:"Uma boa ferramenta deve ser compreendida sem exigir conhecimentos técnicos avançados."},{title:"Organização",text:"As informações devem estar acessíveis, bem distribuídas e fáceis de localizar."},{title:"Evolução contínua",text:"Os produtos são aprimorados a partir de testes, observações e experiências reais de uso."}],
      contentTitle:"Educação, organização e tecnologia", contentText:"No blog da Codes by Erax, compartilhamos conteúdos sobre tutoria escolar, organização docente, tecnologia educacional, privacidade e desenvolvimento de ferramentas para professores.", blogButton:"Acessar o blog",
      ctaTitle:"Uma ferramenta pode facilitar uma tarefa. Uma boa ferramenta pode transformar uma rotina.", ctaText:"Conheça os projetos da Codes by Erax e acompanhe o desenvolvimento de soluções criadas para pessoas reais, contextos reais e necessidades reais.", contact:"Entrar em contato",
    },
    product: {
      title:"Vínculo Tutoria — Sistema de Tutoria Escolar | Codes by Erax", description:"Organize registros, tutorias individuais, encontros coletivos, frequência e acompanhamento dos estudantes com o Vínculo Tutoria.",
      subtitle:"Organização para acompanhar. Informação para compreender. Tempo para criar vínculos.", intro:["O Vínculo Tutoria é um sistema de acompanhamento escolar desenvolvido para ajudar professores tutores a organizar informações, registrar atendimentos e acompanhar o desenvolvimento dos estudantes ao longo do ano letivo.","A ferramenta reúne registros que normalmente ficam espalhados entre cadernos, planilhas e documentos, permitindo que o professor encontre as informações de que precisa com mais facilidade."],
      whyTitle:"A tutoria precisa de continuidade", why:["A tutoria escolar não acontece apenas durante uma conversa isolada. Ela é construída ao longo do tempo, por meio da escuta, do acompanhamento, da definição de metas e da observação das mudanças vividas pelo estudante.","Entretanto, quando os registros ficam espalhados entre diferentes cadernos, arquivos e planilhas, torna-se difícil recuperar informações importantes e acompanhar o que já foi conversado.","O Vínculo Tutoria foi criado para centralizar esses registros em um único ambiente. Assim, o professor consegue consultar o histórico de cada estudante, retomar assuntos anteriores e organizar melhor os próximos passos do acompanhamento.","O sistema não substitui o olhar, a escuta ou a presença do professor. Ele funciona como uma ferramenta de apoio para que o trabalho humano da tutoria possa acontecer com mais organização e continuidade."],
      audienceTitle:"Criado para quem acompanha estudantes de perto", audience:[{title:"Professores tutores",text:"Para professores responsáveis pelo acompanhamento individual de estudantes durante o ano letivo."},{title:"Escolas de tempo integral",text:"Para profissionais que atuam em programas de tutoria, orientação e acompanhamento estudantil."},{title:"Coordenadores pedagógicos",text:"Para educadores que precisam compreender processos de acompanhamento e orientar práticas de tutoria."},{title:"Profissionais da educação",text:"Para pessoas que realizam atendimentos, orientações, encaminhamentos ou encontros com estudantes."}],
      featuresTitle:"Tudo o que você precisa para organizar a tutoria",
      features:[
        {title:"Perfil do estudante",text:["Cada estudante possui um perfil próprio, no qual podem ser reunidas informações importantes para o acompanhamento.","O perfil permite visualizar os principais dados do estudante sem procurar em diferentes arquivos."]},
        {title:"Organização por turmas",text:["Os estudantes podem ser separados por turma, facilitando a localização dos perfis e a organização da rotina do professor."]},
        {title:"Registros de conversas",text:["Registre assuntos discutidos, dificuldades, objetivos, avanços, orientações, encaminhamentos e combinados.","Os registros formam um histórico que pode ser consultado posteriormente."]},
        {title:"Tutoria individual",text:["Acompanhe cada estudante de forma detalhada, consulte registros anteriores, identifique assuntos recorrentes e observe mudanças."]},
        {title:"Tutoria coletiva",text:["Registre encontros com grupos de estudantes, temas, atividades, observações e informações importantes."]},
        {title:"Frequência",text:["Acompanhe a presença dos estudantes nos encontros de tutoria definidos pelo professor."]},
        {title:"Boletim e evolução",text:["Registre informações acadêmicas e acompanhe a evolução das médias para apoiar conversas sobre organização, dificuldades e metas."]},
        {title:"Histórico de acompanhamento",text:["Os registros permanecem organizados no histórico do estudante para consulta posterior."]},
        {title:"Lixeira",text:["Itens removidos vão para a lixeira antes da exclusão definitiva, reduzindo o risco de perda por engano."]},
        {title:"Funcionamento local",text:["Os registros permanecem no dispositivo e não são sincronizados automaticamente com serviços externos.","Proteja o computador com senha, evite acessos não autorizados e mantenha cópias de segurança."]},
      ],
      stepsTitle:"Comece em poucos passos", steps:[{title:"Instale o aplicativo",text:"Baixe o instalador e conclua a instalação no computador com Windows."},{title:"Cadastre suas turmas",text:"Organize os grupos de estudantes que serão acompanhados."},{title:"Cadastre os estudantes",text:"Crie um perfil para cada estudante e registre as informações necessárias."},{title:"Realize os registros",text:"Registre assuntos, orientações, metas e encaminhamentos."},{title:"Consulte o histórico",text:"Retome registros anteriores sempre que precisar."},{title:"Acompanhe a evolução",text:"Use registros, frequência e dados acadêmicos para observar mudanças."}],
      careTitle:"Informações de estudantes exigem cuidado", care:["Registre apenas os dados necessários para a finalidade pedagógica. Evite comentários ofensivos, julgamentos pessoais, diagnósticos não confirmados ou informações que não contribuam para o acompanhamento.","Use linguagem profissional, objetiva e respeitosa. Como os registros ficam no dispositivo, mantenha o computador protegido e impeça acessos não autorizados."],
      tutorialTitle:"Comece sem complicação", tutorial:["O tutorial apresenta as principais funções de forma simples e progressiva.","Você aprenderá a cadastrar turmas, criar perfis, registrar encontros e consultar o histórico."],
      downloadTitle:"Baixe o Vínculo Tutoria", downloadText:["O Vínculo Tutoria está disponível para computadores com Windows. A versão atual é a 1.4.0.","Antes de instalar, leia as orientações de uso e mantenha uma cópia segura dos arquivos importantes."],
      downloadFacts:["Sistema: Windows","Versão atual: 1.4.0","Funcionamento: local","Internet: não necessária para os recursos principais","Conta obrigatória: não","Sincronização automática em nuvem: indisponível"],
      windowsTitle:"Instalação pelo Windows", windows:"O download é realizado pela página oficial do Vínculo Tutoria na Microsoft Store. Confirme que a página aberta pertence à Microsoft antes de instalar.",
      feedbackTitle:"Ajude a construir as próximas versões", feedbackText:"A experiência de professores é fundamental para identificar dificuldades, corrigir problemas e decidir quais recursos devem ser aprimorados.",
      faqTitle:"Perguntas frequentes", faqs:[{q:"O Vínculo Tutoria é gratuito?",a:["A disponibilidade e as condições de uso são informadas na página oficial de download. Baixe sempre pelo site oficial."]},{q:"O aplicativo precisa de internet?",a:["Não. Os principais recursos funcionam localmente. A conexão pode ser necessária para atualizações, tutoriais ou suporte."]},{q:"Onde os dados são armazenados?",a:["Na versão atual, os registros ficam localmente no dispositivo e não são sincronizados automaticamente com uma conta ou nuvem."]},{q:"O Vínculo funciona em celular?",a:["A versão atual foi desenvolvida para computadores com Windows. Não há versão oficial para celular."]},{q:"Como fazer backup?",a:["Mantenha cópias seguras de acordo com as orientações do aplicativo e as regras da instituição."]}],
    },
    blog:{title:"Blog",description:"Conteúdos sobre tutoria escolar, organização docente, privacidade e tecnologia educacional.",intro:"Reflexões e orientações práticas para apoiar quem acompanha estudantes e transforma a educação todos os dias."},
    legal:{
      privacyTitle:"Política de Privacidade",privacyDescription:"Saiba como a Codes by Erax trata dados no site e como o Vínculo Tutoria armazena informações localmente.",
      privacy:[
        {title:"1. Sobre esta política",paragraphs:["Última atualização: 29 de julho de 2026.","Esta Política explica como a Codes by Erax trata informações no site, nos formulários e no Vínculo Tutoria."]},
        {title:"2. Vínculo Tutoria e armazenamento local",paragraphs:["Na versão 1.4.0, os registros são armazenados no dispositivo do usuário. A Codes by Erax não recebe, sincroniza ou visualiza automaticamente os dados cadastrados no aplicativo.","O usuário e sua instituição são responsáveis por definir a base, finalidade, acesso, retenção e segurança das informações registradas."]},
        {title:"3. Dados enviados pelo site",paragraphs:["Formulários podem coletar nome, e-mail, função profissional, versão utilizada e o conteúdo enviado. Esses dados são usados para responder solicitações, oferecer suporte e planejar melhorias."],items:["Não envie nomes de estudantes;","Não envie dados de saúde, documentos ou informações acadêmicas identificáveis;","Inclua somente o necessário para descrever sua solicitação."]},
        {title:"4. Base e finalidade",paragraphs:["Tratamos dados para atender ao pedido do usuário, manter a segurança, prevenir abuso e melhorar nossos produtos. Quando aplicável, o consentimento poderá ser retirado."]},
        {title:"5. Compartilhamento",paragraphs:["Não vendemos dados pessoais. Prestadores de hospedagem, e-mail e segurança podem processar dados estritamente para operar o serviço, sujeitos a obrigações adequadas."]},
        {title:"6. Segurança e retenção",paragraphs:["Aplicamos medidas razoáveis de segurança, mas nenhum sistema é totalmente imune a riscos. Mantemos dados pelo período necessário à finalidade, às obrigações legais e à prevenção de abuso."]},
        {title:"7. Direitos e contato",paragraphs:["O titular pode solicitar confirmação, acesso, correção, eliminação ou informações sobre o tratamento, conforme a legislação aplicável.","Use o formulário oficial de contato sem incluir dados de estudantes."]},
      ],
      termsTitle:"Termos de Uso",termsDescription:"Conheça as condições de uso do site Codes by Erax e do aplicativo Vínculo Tutoria.",
      terms:[
        {title:"1. Aceitação",paragraphs:["Última atualização: 29 de julho de 2026.","Ao acessar o site ou usar o Vínculo Tutoria, o usuário concorda com estes termos e com a Política de Privacidade."]},
        {title:"2. Finalidade",paragraphs:["O aplicativo é uma ferramenta de apoio à organização da tutoria escolar. Ele não substitui decisões pedagógicas, profissionais especializados, protocolos institucionais ou obrigações legais."]},
        {title:"3. Responsabilidade do usuário",paragraphs:["O usuário deve registrar apenas informações necessárias, usar linguagem profissional, proteger o dispositivo, controlar acessos e manter cópias de segurança adequadas."]},
        {title:"4. Uso proibido",paragraphs:["É proibido usar o serviço para violar direitos, armazenar conteúdo ofensivo ou ilegal, tentar acesso não autorizado, distribuir código malicioso ou prejudicar o funcionamento do produto."]},
        {title:"5. Dados de estudantes",paragraphs:["O usuário deve seguir as normas de sua instituição e a legislação aplicável. Dados identificáveis de estudantes não devem ser enviados em formulários de suporte ou feedback."]},
        {title:"6. Disponibilidade e atualizações",paragraphs:["Recursos podem ser corrigidos, modificados ou descontinuados. Melhorias em análise não representam promessa de data ou garantia de implementação."]},
        {title:"7. Limitação de responsabilidade",paragraphs:["A Codes by Erax não se responsabiliza por perda decorrente de falta de backup, uso inadequado, acesso não autorizado ao dispositivo ou descumprimento de regras institucionais, nos limites permitidos pela lei."]},
        {title:"8. Propriedade intelectual",paragraphs:["O acesso ao site e ao aplicativo não transfere direitos sobre código, marca, interface, textos, ilustrações, documentação ou materiais."]},
        {title:"9. Redistribuição",paragraphs:["Não é permitido vender, sublicenciar, republicar, modificar, desmontar ou redistribuir o aplicativo sem autorização expressa. O link oficial de download pode ser compartilhado."]},
        {title:"10. Bibliotecas e contato",paragraphs:["Componentes de terceiros permanecem sujeitos às suas licenças. Dúvidas devem ser enviadas pelo formulário oficial sem dados de estudantes."]},
      ],
      licensesTitle:"Licenças e direitos autorais",licenses:[
        {title:"Vínculo Tutoria",paragraphs:["Última atualização: 29 de julho de 2026.","O Vínculo Tutoria é desenvolvido e distribuído pela Codes by Erax. A disponibilização não autoriza venda, alteração, desmontagem ou redistribuição independente."],items:["Código proprietário","Nome e identidade visual","Interface e textos","Ilustrações e materiais","Documentação e tutoriais"]},
        {title:"Uso pessoal e profissional",paragraphs:["O aplicativo pode ser instalado e utilizado conforme os Termos de Uso. O link oficial pode ser compartilhado."]},
        {title:"Componentes de código aberto",paragraphs:["O site utiliza os pacotes listados abaixo. Cada componente permanece sujeito à licença de seu autor. Avisos exigidos devem ser preservados."]},
        {title:"Fontes e recursos visuais",paragraphs:["Fontes, ícones e recursos de terceiros devem ser creditados conforme suas licenças. Recursos exclusivos da Codes by Erax permanecem protegidos."]},
      ],
      changelogTitle:"Histórico de atualizações",changelogDescription:"Consulte as novidades, melhorias, correções e problemas conhecidos das versões do Vínculo Tutoria.",
    },
    feedback:{title:"Conte como foi sua experiência com o Vínculo",intro:"Seu feedback será utilizado para identificar dificuldades, corrigir problemas e planejar melhorias no aplicativo.",warning:"Não inclua nomes ou informações pessoais de estudantes.",name:"Nome",nameHelp:"Informe como gostaria de ser identificado.",email:"E-mail",emailHelp:"Utilizado apenas caso seja necessário entrar em contato.",role:"Função profissional",version:"Qual versão você utilizou?",rating:"Como você avalia sua experiência geral?",useful:"Qual recurso foi mais útil?",problem:"Você encontrou algum problema?",problemHelp:"Descreva o que tentava fazer, o resultado esperado e o que aconteceu.",improve:"O que poderia ser melhorado?",improveHelp:"Compartilhe uma sugestão prática.",consent:"Você autoriza a publicação do seu depoimento?",submit:"Enviar feedback",success:"Feedback enviado com sucesso. Obrigada por contribuir com o desenvolvimento do Vínculo Tutoria.",error:"Não foi possível enviar o feedback. Verifique sua conexão e tente novamente.",roles:["Professor","Professor tutor","Coordenador pedagógico","Gestor escolar","Outro profissional da educação"],versions:["Versão 1.4.0","Não sei informar"],ratings:["Muito ruim","Ruim","Regular","Boa","Muito boa"],features:["Perfil do estudante","Registros de conversa","Tutoria individual","Tutoria coletiva","Frequência","Boletim e evolução","Organização por turmas","Outro"],consents:["Não autorizo","Autorizo apenas sem meu nome","Autorizo com meu primeiro nome e função profissional"]},
    articles:ptArticles,
  },
  en: {} as Copy,
};

content.en = {
  ...content.pt,
  common:{home:"Home",product:"Vínculo Tutoria",blog:"Blog",about:"About",support:"Support",download:"Download",privacy:"Privacy Policy",terms:"Terms of Use",licenses:"Licenses",changelog:"Updates",feedback:"Send Feedback",skip:"Skip to content"},
  home:{...content.pt.home,title:"Codes by Erax — Technology Built from Real Educational Needs",description:"Discover Codes by Erax, a brand that develops digital tools designed to make the daily work of teachers and educators more organized, practical, and human.",eyebrow:"Education · Creativity · Technology",hero:"Technology built from real needs.",heroText:["Codes by Erax develops digital tools designed to simplify routines, organize information, and transform everyday challenges into accessible solutions.","Our first main product is Vínculo Tutoria, a system created to support teachers in student follow-up and school tutoring record management."],primary:"Discover Vínculo Tutoria",secondary:"Explore Our Projects",experienceTitle:"Tools created by someone who understands education",experience:["Codes by Erax was born from the combination of education, creativity, and technology.","Every project begins with a concrete need: a repetitive task, information that is difficult to organize, a confusing process, or a tool that does not yet exist in the way it should.","The goal is not simply to develop applications. It is to create solutions that are easy to understand, pleasant to use, and genuinely useful to the person on the other side of the screen."],featuredTitle:"Discover Vínculo Tutoria",featured:["Vínculo Tutoria is a school follow-up system created to help tutoring teachers organize information, record conversations, monitor students, and maintain a clearer history throughout the school year.","Instead of spreading notes across notebooks, documents, and multiple spreadsheets, teachers can gather their main records in one environment."],features:["Individual student profiles","Class organization","Conversation and meeting records","Individual tutoring","Group tutoring","Attendance tracking","Grades and academic progress","Follow-up history","Trash recovery","Local computer operation"],principlesTitle:"Technology with purpose",principles:[{title:"Real usefulness",text:"We create tools to solve concrete problems, not simply to add another platform to the user's routine."},{title:"Simplicity",text:"A good tool should be understandable without advanced technical knowledge."},{title:"Organization",text:"Information should be accessible, clearly arranged, and easy to find."},{title:"Continuous improvement",text:"Products are improved through testing, observation, and real user experiences."}],contentTitle:"Education, organization, and technology",contentText:"On the Codes by Erax blog, we share content about school tutoring, teacher organization, educational technology, privacy, and tool development for educators.",blogButton:"Visit the Blog",ctaTitle:"A tool can simplify a task. A good tool can transform a routine.",ctaText:"Discover Codes by Erax projects and follow solutions created for real people, real contexts, and real needs.",contact:"Contact Us"},
  product:{...content.pt.product,title:"Vínculo Tutoria — School Tutoring System | Codes by Erax",description:"Organize records, individual tutoring, group meetings, attendance, and student follow-up with Vínculo Tutoria.",subtitle:"Organization to follow up. Information to understand. Time to build meaningful connections.",intro:["Vínculo Tutoria is a school follow-up system developed to help tutoring teachers organize information, record meetings, and follow student development throughout the school year.","The tool gathers records usually scattered across notebooks, spreadsheets, and documents so teachers can find what they need more easily."],whyTitle:"Tutoring needs continuity",why:["School tutoring is not limited to an isolated conversation. It is built over time through listening, follow-up, goals, and observation of student changes.","When records are scattered, important information and previous conversations become difficult to recover.","Vínculo Tutoria centralizes these records so teachers can consult each student's history, revisit topics, and organize next steps.","The system does not replace a teacher's attention, listening, or presence. It supports the human work of tutoring with organization and continuity."],audienceTitle:"Created for educators who follow students closely",audience:[{title:"Tutoring teachers",text:"For teachers responsible for individual student follow-up."},{title:"Full-time schools",text:"For professionals in tutoring, guidance, and student follow-up programs."},{title:"Pedagogical coordinators",text:"For educators guiding tutoring processes and practices."},{title:"Education professionals",text:"For people who provide meetings, guidance, referrals, or student support."}],featuresTitle:"Everything you need to organize tutoring",features:content.pt.product.features.map((_,i)=>({title:["Student profile","Class organization","Conversation records","Individual tutoring","Group tutoring","Attendance","Grades and progress","Follow-up history","Trash","Local operation"][i]!,text:[
    ["Each student has a dedicated profile for important follow-up information.","View essential data without searching different files."],
    ["Separate students by class to make profiles easier to find and routines easier to organize."],
    ["Record topics, difficulties, goals, progress, guidance, referrals, and agreements.","Records create a history that can be reviewed later."],
    ["Follow each student in detail, revisit records, identify recurring topics, and observe changes."],
    ["Record group meetings, themes, activities, observations, and important information."],
    ["Track student presence in tutoring meetings defined by the teacher."],
    ["Record academic information and monitor averages to support conversations about goals and difficulties."],
    ["Past records remain organized in the student's history."],
    ["Removed items go to trash before permanent deletion, reducing accidental loss."],
    ["Records remain on the device and are not automatically synchronized.","Protect the computer with a password and keep backups."],
  ][i]!})),stepsTitle:"Get started in a few steps",steps:[{title:"Install the application",text:"Download the installer and complete installation on Windows."},{title:"Create your classes",text:"Organize the student groups you will follow."},{title:"Create student profiles",text:"Add a profile and the information needed for follow-up."},{title:"Create records",text:"Record topics, guidance, goals, and referrals."},{title:"Review history",text:"Return to earlier records whenever needed."},{title:"Follow progress",text:"Use records, attendance, and academic data to observe changes."}],careTitle:"Student information requires care",care:["Record only data needed for an educational purpose. Avoid offensive comments, personal judgments, unconfirmed diagnoses, or irrelevant information.","Use professional, objective, respectful language. Protect the device and prevent unauthorized access."],tutorialTitle:"Get started without complications",tutorial:["The Vínculo Tutoria tutorial presents its main functions in a simple, progressive way.","Learn to create classes and profiles, record meetings, and review history."],downloadTitle:"Download Vínculo Tutoria",downloadText:["Vínculo Tutoria is available for Windows computers. The current version is 1.4.0.","Before installing, read the guidance and keep a safe copy of important files."],downloadFacts:["System: Windows","Current version: 1.4.0","Operation: local","Internet: not required for core features","Account required: no","Automatic cloud sync: unavailable"],windowsTitle:"Windows notice",windows:"Windows may display a protection message because the application is distributed outside Microsoft Store. Confirm it came from the official Codes by Erax website.",feedbackTitle:"Help build future versions",feedbackText:"Teacher experience is essential for finding difficulties, correcting problems, and deciding what should improve.",faqTitle:"Frequently asked questions",faqs:[{q:"Is Vínculo Tutoria free?",a:["Availability and conditions are shown on the official download page. Always use the official website."]},{q:"Does the application need internet?",a:["No. Core features work locally. A connection may be needed for updates, tutorials, or support."]},{q:"Where is data stored?",a:["Records are stored locally on the user's device and are not automatically synchronized online."]},{q:"Does Vínculo work on mobile?",a:["The current version is for Windows computers. There is no official mobile version."]},{q:"How do I back up records?",a:["Keep safe copies according to application guidance and institutional rules."]}]},
  blog:{title:"Blog",description:"Content about school tutoring, teacher organization, privacy, and educational technology.",intro:"Practical guidance and reflections for people who follow students and transform education every day."},
  legal:{
    privacyTitle:"Privacy Policy",privacyDescription:"Learn how Codes by Erax handles website data and how Vínculo Tutoria stores information locally.",privacy:[
      {title:"1. About this policy",paragraphs:["Last updated: July 29, 2026.","This Policy explains how Codes by Erax handles information on the website, forms, and Vínculo Tutoria."]},
      {title:"2. Local application storage",paragraphs:["In version 1.4.0, records are stored on the user's device. Codes by Erax does not automatically receive, synchronize, or view data entered in the application.","Users and their institutions are responsible for purpose, access, retention, and security."]},
      {title:"3. Website forms",paragraphs:["Forms may collect name, email, professional role, version, and submitted content to respond, provide support, and plan improvements."],items:["Do not submit student names;","Do not submit health data, documents, or identifiable academic information;","Include only what is necessary."]},
      {title:"4. Purpose and legal basis",paragraphs:["We process data to fulfill requests, maintain security, prevent abuse, and improve products. Consent may be withdrawn where applicable."]},
      {title:"5. Sharing",paragraphs:["We do not sell personal data. Hosting, email, and security providers may process data strictly to operate the service under appropriate obligations."]},
      {title:"6. Security and retention",paragraphs:["We apply reasonable safeguards, but no system is risk-free. Data is retained only as needed for its purpose, legal obligations, and abuse prevention."]},
      {title:"7. Rights and contact",paragraphs:["People may request confirmation, access, correction, deletion, or processing information under applicable law.","Use the official contact form and do not include student data."]},
    ],
    termsTitle:"Terms of Use",termsDescription:"Read the conditions for using the Codes by Erax website and Vínculo Tutoria.",terms:[
      {title:"1. Acceptance",paragraphs:["Last updated: July 29, 2026.","By accessing the site or using Vínculo Tutoria, users agree to these Terms and the Privacy Policy."]},
      {title:"2. Purpose",paragraphs:["The application supports school tutoring organization. It does not replace educational decisions, specialized professionals, institutional procedures, or legal duties."]},
      {title:"3. User responsibility",paragraphs:["Users must record only necessary information, use professional language, protect devices, control access, and keep suitable backups."]},
      {title:"4. Prohibited use",paragraphs:["Users may not violate rights, store illegal or offensive content, seek unauthorized access, distribute malicious code, or impair the product."]},
      {title:"5. Student data",paragraphs:["Users must follow institutional rules and applicable law. Identifiable student data must not be sent through support or feedback forms."]},
      {title:"6. Availability and updates",paragraphs:["Features may be corrected, changed, or discontinued. Items under consideration are not promises of dates or implementation."]},
      {title:"7. Liability",paragraphs:["Within limits permitted by law, Codes by Erax is not responsible for loss caused by missing backups, misuse, unauthorized device access, or violation of institutional rules."]},
      {title:"8. Intellectual property",paragraphs:["Access does not transfer rights over code, brand, interface, text, illustrations, documentation, or materials."]},
      {title:"9. Redistribution",paragraphs:["Users may not sell, sublicense, republish, modify, disassemble, or redistribute the application without authorization. The official link may be shared."]},
      {title:"10. Libraries and contact",paragraphs:["Third-party components remain subject to their licenses. Submit questions through the official form without student data."]},
    ],
    licensesTitle:"Licenses and Copyright",licenses:[
      {title:"Vínculo Tutoria",paragraphs:["Last updated: July 29, 2026.","Vínculo Tutoria is developed and distributed by Codes by Erax. Availability does not authorize independent sale, modification, disassembly, or redistribution."],items:["Proprietary code","Product name and visual identity","Interface and texts","Illustrations and materials","Documentation and tutorials"]},
      {title:"Personal and professional use",paragraphs:["Users may install and use the application under the Terms of Use. The official link may be shared."]},
      {title:"Open-source components",paragraphs:["The website uses the packages listed below. Each remains subject to its author's license and required notices must be preserved."]},
      {title:"Fonts and visual resources",paragraphs:["Third-party resources must be credited under their licenses. Codes by Erax exclusive resources remain protected."]},
    ],
    changelogTitle:"Update history",changelogDescription:"Review new features, improvements, corrections, and known issues in Vínculo Tutoria releases.",
  },
  feedback:{title:"Tell us about your experience with Vínculo",intro:"Your feedback will be used to identify difficulties, correct problems, and plan improvements.",warning:"Do not include student names or personal information.",name:"Name",nameHelp:"Enter how you would like to be identified.",email:"Email",emailHelp:"Used only if we need to contact you.",role:"Professional role",version:"Which Vínculo version did you use?",rating:"How would you rate your overall experience?",useful:"Which feature was most useful?",problem:"Did you encounter a problem?",problemHelp:"Describe what you tried, expected, and what happened.",improve:"What could be improved?",improveHelp:"Share a practical suggestion.",consent:"Do you authorize publication of your testimonial?",submit:"Send Feedback",success:"Feedback submitted successfully. Thank you for contributing to Vínculo Tutoria.",error:"Your feedback could not be submitted. Check your connection and try again.",roles:["Teacher","Tutoring teacher","Pedagogical coordinator","School administrator","Other education professional"],versions:["Version 1.4.0","I do not know"],ratings:["Very poor","Poor","Average","Good","Very good"],features:["Student profile","Conversation records","Individual tutoring","Group tutoring","Attendance","Grades and progress","Class organization","Other"],consents:["I do not authorize publication","I authorize anonymous publication","I authorize publication with my first name and professional role"]},
  articles:enArticles,
};

export const routePairs: Record<string, string> = Object.fromEntries([
  ["/pt/orcamento", "/en/quote"],
  ["/en/quote", "/pt/orcamento"],
  ...ptArticles.map((a) => [`/pt/blog/${a.slug}`, `/en/blog/${a.alternateSlug}`]),
  ...enArticles.map((a) => [`/en/blog/${a.slug}`, `/pt/blog/${a.alternateSlug}`]),
]);
