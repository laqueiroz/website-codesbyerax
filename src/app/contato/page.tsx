import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader, PageSection } from "@/components/layout/PageHeader";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com a Codes by Erax: dúvidas sobre o Vínculo Tutoria, problemas técnicos, sugestões ou uso na sua escola.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Fale com a gente"
        description="Sua mensagem chega direto para quem constrói os aplicativos. Respondemos no e-mail informado."
      />

      <PageSection>
        <div className="grid gap-12 wide:grid-cols-[minmax(0,560px)_1fr]">
          <ContactForm />

          <aside className="flex max-w-[420px] flex-col gap-6">
            <div className="rounded-[10px] border border-white/10 bg-white/[0.016] p-6">
              <h2 className="m-0 font-mono text-[10.5px] uppercase tracking-[.18em] text-white-soft/60">
                Antes de escrever
              </h2>
              <p className="mt-3 font-sans text-[14.5px] font-light leading-[1.7] text-white-soft/75">
                Muitas dúvidas já estão respondidas na página de suporte —
                instalação, requisitos, relatórios e onde ficam os dados.
              </p>
              <Link
                href="/suporte"
                className="mt-4 inline-flex min-h-[44px] items-center font-sans text-[14px] text-violet-200 underline underline-offset-4 hover:text-white"
              >
                Ver perguntas frequentes
              </Link>
            </div>

            {siteConfig.supportEmail ? (
              <div className="rounded-[10px] border border-white/10 bg-white/[0.016] p-6">
                <h2 className="m-0 font-mono text-[10.5px] uppercase tracking-[.18em] text-white-soft/60">
                  E-mail direto
                </h2>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="mt-3 inline-flex min-h-[44px] items-center font-sans text-[15px] text-violet-200 underline underline-offset-4 hover:text-white"
                >
                  {siteConfig.supportEmail}
                </a>
              </div>
            ) : null}

            <div className="rounded-[10px] border border-white/10 bg-white/[0.016] p-6">
              <h2 className="m-0 font-mono text-[10.5px] uppercase tracking-[.18em] text-white-soft/60">
                Privacidade
              </h2>
              <p className="mt-3 font-sans text-[14.5px] font-light leading-[1.7] text-white-soft/75">
                Os dados enviados neste formulário são usados apenas para
                responder à sua mensagem.{" "}
                <Link
                  href="/privacidade"
                  className="text-violet-200 underline underline-offset-4 hover:text-white"
                >
                  Política de privacidade
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </PageSection>
    </>
  );
}
