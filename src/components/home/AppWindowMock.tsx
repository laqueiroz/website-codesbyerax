/**
 * Representação da janela do Vínculo Tutoria.
 *
 * NÃO é uma captura de tela do produto. Enquanto não houver imagens reais do
 * aplicativo, esta maquete ilustra a interface e é rotulada como tal na
 * legenda logo abaixo — nada aqui deve ser lido como print definitivo.
 *
 * Para substituir por capturas reais, troque este componente por um
 * `next/image` com `sizes`, `width`/`height` explícitos e `loading="lazy"`,
 * mantendo a moldura para que a imagem continue lendo como app do Windows.
 */

interface SessionRow {
  student: string;
  detail: string;
  status: string;
  statusClass: string;
  date: string;
  current?: boolean;
}

const SIDEBAR_ITEMS = [
  "Atendimentos",
  "Alunos",
  "Turmas",
  "Relatórios",
  "Configurações",
];

const SESSIONS: readonly SessionRow[] = [
  {
    student: "Ana Beatriz M.",
    detail: "Reforço · Frações equivalentes",
    status: "Evoluiu",
    statusClass: "text-cyan-400/90",
    date: "22 JUL",
    current: true,
  },
  {
    student: "Caio Ferreira",
    detail: "Leitura · Interpretação de texto",
    status: "Em curso",
    statusClass: "text-violet-300",
    date: "21 JUL",
  },
  {
    student: "Helena Duarte",
    detail: "Matemática · Tabuada",
    status: "Agendado",
    statusClass: "text-white-soft/62",
    date: "29 JUL",
  },
];

/** Alturas das barras, em %. A última é o mês corrente e ganha o tom ciano. */
const CHART_BARS = [34, 52, 44, 70, 62, 88];

export function AppWindowMock() {
  return (
    <figure className="relative m-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[16px] bg-[radial-gradient(60%_60%_at_60%_16%,rgba(139,92,240,.24),transparent_70%)] blur-[14px]"
      />

      <div
        // Ilustração: descrita pela legenda, então fica fora da árvore a11y
        // para não despejar dezenas de nós de texto decorativo no leitor.
        aria-hidden="true"
        className="relative overflow-hidden rounded-[10px] border border-white/12 bg-[rgba(11,9,20,.86)] shadow-[0_44px_100px_-44px_#000] backdrop-blur-[10px]"
      >
        <div className="flex items-center gap-2.5 border-b border-white/8 bg-white/[0.028] px-4 py-3">
          <span className="size-2.5 rounded-[3px] bg-white-soft/28" />
          <span className="size-2.5 rounded-[3px] bg-white-soft/18" />
          <span className="size-2.5 rounded-[3px] bg-white-soft/18" />
          <span className="ml-2 font-mono text-[11.5px] leading-none text-white-soft/60">
            Vínculo Tutoria — 3º ano B
          </span>
        </div>

        <div className="grid min-h-[430px] grid-cols-1 sm:grid-cols-[174px_1fr]">
          <div className="hidden flex-col gap-1.5 border-r border-white/8 px-3 py-4.5 sm:flex">
            {SIDEBAR_ITEMS.map((item, index) => (
              <div
                key={item}
                className={
                  index === 0
                    ? "rounded-[5px] bg-violet-500/18 px-3 py-2.5 font-sans text-[12.5px] font-medium leading-none"
                    : "px-3 py-2.5 font-sans text-[12.5px] leading-none text-white-soft/60"
                }
              >
                {item}
              </div>
            ))}
            <div className="mt-auto rounded-md border border-dashed border-cyan-400/30 p-3 font-mono text-[10px] leading-[1.5] text-cyan-400/80">
              SINCRONIA
              <br />
              LOCAL OK
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-sans text-[13.5px] leading-none">
                Julho · 18 atendimentos
              </span>
              <span className="rounded border border-white/15 px-2.5 py-1.5 font-mono text-[10.5px] leading-none text-white-soft/65">
                + NOVO
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              {SESSIONS.map((session) => (
                <div
                  key={session.student}
                  className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border px-3.5 py-3.5 ${
                    session.current
                      ? "border-white/12 bg-white/[0.024]"
                      : "border-white/[0.075]"
                  }`}
                >
                  <div>
                    <div className="font-sans text-[13px] font-medium leading-[1.2]">
                      {session.student}
                    </div>
                    <div className="mt-1.5 font-sans text-[12px] font-light leading-[1.4] text-white-soft/55">
                      {session.detail}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-mono text-[10.5px] uppercase leading-none ${session.statusClass}`}
                    >
                      {session.status}
                    </div>
                    <div className="mt-1.5 font-mono text-[10.5px] leading-none text-white-soft/50">
                      {session.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4.5 rounded-md border border-white/10 bg-white/[0.018] p-4">
              <div className="flex justify-between font-mono text-[10.5px] uppercase leading-none tracking-[.1em] text-white-soft/55">
                <span>Progresso da turma</span>
                <span>68%</span>
              </div>
              <div className="mt-3.5 flex h-[72px] items-end gap-1.5">
                {CHART_BARS.map((height, index) => (
                  <div
                    key={index}
                    className={`flex-1 rounded-t-[2px] ${
                      index === CHART_BARS.length - 1
                        ? "bg-[linear-gradient(180deg,#7fe3e8,rgba(127,227,232,.2))]"
                        : "bg-[linear-gradient(180deg,rgba(139,92,240,.85),rgba(139,92,240,.25))]"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 font-mono text-[10.5px] uppercase leading-[1.6] tracking-[.14em] text-white-soft/60">
        Representação da interface do Vínculo Tutoria. Nomes e dados são
        fictícios, para ilustração — não é uma captura de tela do aplicativo.
      </figcaption>
    </figure>
  );
}
