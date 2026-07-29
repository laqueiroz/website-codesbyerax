import type { Metadata } from "next";

import { PageHeader, PageSection, Prose } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { principles } from "@/content/principles";
import { techStack } from "@/content/tech";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sobre",
  description:
    "A Codes by Erax é um estúdio pequeno que constrói software de educação com padrão de produto grande — offline-first, alinhado à LGPD e feito por quem dá aula.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre"
        title="Um estúdio pequeno, com padrão de produto grande"
        description="Software, inteligência artificial e educação. Cada aplicativo nasce de um problema real de sala de aula — não de um briefing genérico."
      />

      <PageSection title="O que fazemos" id="o-que-fazemos">
        <Prose>
          <p>
            A Codes by Erax constrói aplicativos, ferramentas e inteligência
            artificial para quem ensina. O primeiro produto publicado é o{" "}
            <strong>Vínculo Tutoria</strong>, um aplicativo de Windows para
            professores registrarem atendimentos de tutoria: sessões, evolução do
            aluno e relatórios prontos para a coordenação.
          </p>
          <p>
            A escolha técnica acompanha a escolha editorial. O aplicativo funciona
            offline, guarda os dados na máquina do professor e não exige a criação
            de conta — decisões tomadas antes de qualquer tela ser desenhada.
          </p>
        </Prose>
      </PageSection>

      <PageSection title="Como trabalhamos" id="principios">
        <ul className="m-0 grid max-w-[960px] list-none gap-6 p-0 sm:grid-cols-2">
          {principles.map((principle) => (
            <li
              key={principle.index}
              className="rounded-[10px] border border-white/10 bg-white/[0.016] p-6"
            >
              <p className="m-0 font-mono text-[11px] leading-none text-cyan-400/90">
                {principle.index}
              </p>
              <h3 className="m-0 mt-4 font-display text-[24px] font-normal leading-[1.22] text-white-soft">
                {principle.title}
              </h3>
              <p className="mt-3 font-sans text-[14.5px] font-light leading-[1.68] text-white-soft/70">
                {principle.description}
              </p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection title="Com o que construímos" id="stack">
        <ul className="m-0 flex max-w-[720px] list-none flex-wrap gap-x-8 gap-y-3 p-0 font-mono text-[14px] text-white-soft/70">
          {techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <div className="flex max-w-[820px] flex-col items-start gap-5 rounded-[14px] border border-violet-300/25 bg-[linear-gradient(160deg,rgba(122,80,215,.14),rgba(255,255,255,.012))] p-7 wide:p-9">
          <h2 className="m-0 font-display text-[28px] font-light leading-tight text-white-hi">
            Quer conversar sobre uso na sua escola?
          </h2>
          <Button href="/contato" variant="solid" size="md">
            Entrar em contato
          </Button>
        </div>
      </PageSection>
    </>
  );
}
