import { Reveal } from "@/components/effects/Reveal";
import { techStack } from "@/content/tech";

export function TechStackStrip() {
  return (
    <section aria-labelledby="stack-titulo" className="px-5 pt-20 wide:px-[46px] wide:pt-[100px]">
      <Reveal>
        <div className="grid items-center gap-5 border-y border-white/8 py-10 wide:grid-cols-[auto_1fr] wide:gap-14">
          <h2
            id="stack-titulo"
            className="type-label m-0 shrink-0 text-white-soft/60"
          >
            03 — Construído com
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-x-[34px] gap-y-3.5 p-0 font-mono text-[14px] leading-none text-white-soft/65">
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
