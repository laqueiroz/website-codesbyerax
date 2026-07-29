import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/content/principles";

export function PrinciplesSection() {
  return (
    <section
      id="porque"
      aria-labelledby="porque-titulo"
      className="px-5 pt-[88px] wide:px-[46px] wide:pt-[110px]"
    >
      <Reveal>
        <SectionHeading id="porque-titulo" index="02 — Princípios">
          Por que a Codes by Erax
        </SectionHeading>
      </Reveal>

      <Reveal>
        <ul className="m-0 mt-13 grid list-none grid-cols-1 gap-y-2 border-t border-white/12 p-0 sm:grid-cols-2 wide:grid-cols-4">
          {principles.map((principle, index) => (
            <li
              key={principle.index}
              className={[
                "px-0 py-[34px] sm:px-[30px]",
                // As divisórias verticais só existem quando as colunas estão
                // lado a lado; empilhado, o espaçamento já separa.
                "wide:border-r wide:border-white/8 wide:last:border-r-0",
                index === 0 ? "sm:pl-0" : "",
                index === principles.length - 1 ? "sm:pr-0" : "",
              ].join(" ")}
            >
              <p className="m-0 font-mono text-[11px] leading-none text-cyan-400/90">
                {principle.index}
              </p>
              <h3 className="m-0 mt-5 font-display text-[26px] font-normal leading-[1.22] text-white-soft">
                {principle.title}
              </h3>
              <p className="mt-3 font-sans text-[14.5px] font-light leading-[1.68] text-white-soft/65">
                {principle.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
