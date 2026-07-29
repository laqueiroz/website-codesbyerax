import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader, PageSection } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { faqs, troubleshooting } from "@/content/faqs";
import { siteConfig, vinculo } from "@/content/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Suporte",
  description:
    "Perguntas frequentes, requisitos de sistema, instruções de instalação e solução de problemas do Vínculo Tutoria.",
  path: "/suporte",
});

export default function SuportePage() {
  return (
    <>
      <PageHeader
        eyebrow="Suporte"
        title="Como podemos ajudar"
        description="Respostas para as dúvidas mais comuns sobre o Vínculo Tutoria. Se a sua não estiver aqui, escreva — a resposta vem de quem construiu o aplicativo."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contato" variant="solid" size="md">
            Falar com o suporte
          </Button>
          <StatusBadge status="shipped" pulse>
            Versão atual · v{vinculo.version}
          </StatusBadge>
        </div>
      </PageHeader>

      <PageSection id="versao" title="Versão e requisitos">
        <div className="grid max-w-[860px] gap-6 sm:grid-cols-2">
          <div className="rounded-[10px] border border-white/10 bg-white/[0.016] p-6">
            <h3 className="m-0 font-mono text-[10.5px] uppercase tracking-[.18em] text-white-soft/60">
              Versão atual
            </h3>
            <p className="m-0 mt-3 font-display text-[32px] font-light leading-none text-white-hi">
              {vinculo.version}
            </p>
            <p className="mt-3 font-sans text-[14px] font-light text-white-soft/70">
              Instalador de {vinculo.fileSize} · {vinculo.platform}
            </p>
            <Link
              href="/changelog"
              className="mt-4 inline-flex min-h-[44px] items-center font-sans text-[14px] text-violet-200 underline underline-offset-4 hover:text-white"
            >
              Ver o changelog
            </Link>
          </div>

          <div className="rounded-[10px] border border-white/10 bg-white/[0.016] p-6">
            <h3 className="m-0 font-mono text-[10.5px] uppercase tracking-[.18em] text-white-soft/60">
              Requisitos de sistema
            </h3>
            <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
              {vinculo.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="font-sans text-[14.5px] font-light leading-[1.6] text-white-soft/80"
                >
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="instalacao" title="Instalação passo a passo">
        <ol className="m-0 flex max-w-[720px] list-none flex-col gap-4 p-0">
          {vinculo.installSteps.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[auto_1fr] items-baseline gap-4 font-sans text-[15.5px] font-light leading-[1.65] text-white-soft/80"
            >
              <span className="font-mono text-[11px] text-cyan-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="faq" title="Perguntas frequentes">
        <dl className="m-0 flex max-w-[820px] flex-col">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-t border-white/10 py-7 last:border-b">
              <dt className="m-0 font-display text-[22px] font-normal leading-[1.3] text-white-soft">
                {faq.question}
              </dt>
              <dd className="m-0 mt-3 font-sans text-[15.5px] font-light leading-[1.7] text-white-soft/75">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="problemas" title="Solução de problemas comuns">
        <ul className="m-0 grid max-w-[900px] list-none gap-4 p-0 sm:grid-cols-2">
          {troubleshooting.map((item) => (
            <li
              key={item.id}
              className="rounded-[10px] border border-white/10 bg-white/[0.016] p-6"
            >
              <h3 className="m-0 font-sans text-[15.5px] font-medium leading-[1.45] text-white-soft">
                {item.problem}
              </h3>
              <p className="mt-3 font-sans text-[14.5px] font-light leading-[1.65] text-white-soft/75">
                {item.solution}
              </p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="contato">
        <div className="flex max-w-[820px] flex-col items-start gap-5 rounded-[14px] border border-violet-300/25 bg-[linear-gradient(160deg,rgba(122,80,215,.14),rgba(255,255,255,.012))] p-7 wide:p-9">
          <h2 className="m-0 font-display text-[28px] font-light leading-tight text-white-hi">
            Não encontrou a resposta?
          </h2>
          <p className="m-0 max-w-[520px] font-sans text-[15.5px] font-light leading-[1.7] text-white-soft/75">
            Descreva o que aconteceu e responderemos no e-mail informado.
            {siteConfig.supportEmail
              ? ` Se preferir, escreva direto para ${siteConfig.supportEmail}.`
              : null}
          </p>
          <Button href="/contato" variant="solid" size="md">
            Entrar em contato
          </Button>
        </div>
      </PageSection>

      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
