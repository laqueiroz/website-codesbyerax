import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roadmap, type MilestoneStatus } from "@/content/roadmap";

/**
 * A opacidade cai conforme o item fica mais especulativo — é a gradação
 * deliberada do handoff. Os pisos respeitam o contraste AA: o texto de apoio
 * do item mais distante ainda é legível, só é mais quieto.
 */
const TONES: Record<
  MilestoneStatus,
  { ring: string; core: string | null; pulse: boolean; status: string; title: string; body: string }
> = {
  done: {
    ring: "border-cyan-400",
    core: "bg-cyan-400",
    pulse: false,
    status: "text-cyan-400",
    title: "text-white-soft",
    body: "text-white-soft/65",
  },
  active: {
    ring: "border-violet-300/80",
    core: "bg-violet-300",
    pulse: true,
    status: "text-violet-300",
    title: "text-white-soft",
    body: "text-white-soft/65",
  },
  planned: {
    ring: "border-white/25",
    core: null,
    pulse: false,
    status: "text-white-soft/62",
    title: "text-white-soft/86",
    body: "text-white-soft/58",
  },
  exploratory: {
    ring: "border-white/18",
    core: null,
    pulse: false,
    status: "text-white-soft/58",
    title: "text-white-soft/75",
    body: "text-white-soft/55",
  },
};

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-titulo"
      className="px-5 pt-[88px] wide:px-[46px] wide:pt-[110px]"
    >
      <Reveal>
        <SectionHeading id="roadmap-titulo" index="04 — Linha do tempo" tight>
          Roadmap público
        </SectionHeading>
      </Reveal>

      <Reveal className="relative mt-14">
        {/* Régua da linha do tempo: só desenhada quando os marcos estão em
            linha; empilhados, ela não representaria nada. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-2 hidden h-px bg-[linear-gradient(90deg,rgba(127,227,232,.5),rgba(182,156,240,.35),rgba(255,255,255,.06))] wide:block"
        />

        <ol className="m-0 grid list-none grid-cols-1 gap-x-7 gap-y-11 p-0 sm:grid-cols-2 wide:grid-cols-4">
          {roadmap.map((milestone) => {
            const tone = TONES[milestone.status];
            return (
              <li key={milestone.id} className="relative">
                <span
                  aria-hidden="true"
                  className={`relative block size-[17px] rounded-full border bg-space-black-2 ${tone.ring}`}
                >
                  {tone.core ? (
                    <span
                      className={`absolute inset-[5px] rounded-full ${tone.core} ${
                        tone.pulse ? "anim-blinkdot" : ""
                      }`}
                      style={
                        tone.pulse
                          ? ({ ["--blink-duration" as string]: "2.8s" } as React.CSSProperties)
                          : undefined
                      }
                    />
                  ) : null}
                </span>

                <p
                  className={`m-0 mt-6 font-mono text-[11px] uppercase leading-none tracking-[.16em] ${tone.status}`}
                >
                  {milestone.statusLabel}
                </p>
                <h3
                  className={`m-0 mt-3.5 font-display text-[26px] font-normal leading-[1.22] ${tone.title}`}
                >
                  {milestone.title}
                </h3>
                <p
                  className={`mt-2.5 font-sans text-[14.5px] font-light leading-[1.66] ${tone.body}`}
                >
                  {milestone.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
