import type { Metadata } from "next";
import Link from "next/link";

import { ChecksumLine } from "@/components/home/ChecksumLine";
import { DownloadButton, StoreButton } from "@/components/home/DownloadButton";
import { PageHeader, PageSection } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { vinculo } from "@/content/site";
import { pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Downloads",
  description:
    "Baixe o Vínculo Tutoria para Windows: versão atual, tamanho do instalador, requisitos de sistema e checksum SHA-256 para conferência.",
  path: "/downloads",
});

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Vínculo Tutoria para Windows"
        description="Gratuito para professores. Sem conta, sem nuvem, sem letra miúda — os dados ficam na sua máquina."
      />

      <PageSection>
        <div className="max-w-[760px] rounded-[14px] border border-violet-300/25 bg-[linear-gradient(160deg,rgba(122,80,215,.14),rgba(255,255,255,.012))] p-6 wide:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <StatusBadge status="shipped" pulse>
              Disponível · v{vinculo.version}
            </StatusBadge>
            <span className="font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-white-soft/60">
              {vinculo.fileSize}
            </span>
          </div>

          <h2 className="m-0 mt-6 font-display text-[32px] font-normal leading-tight text-white-hi">
            Instalador para Windows
          </h2>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[.16em] text-white-soft/60">
                Versão
              </dt>
              <dd className="m-0 mt-1.5 font-sans text-[15px] text-white-soft">
                {vinculo.version}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[.16em] text-white-soft/60">
                Tamanho
              </dt>
              <dd className="m-0 mt-1.5 font-sans text-[15px] text-white-soft">
                {vinculo.fileSize}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-mono text-[10.5px] uppercase tracking-[.16em] text-white-soft/60">
                Plataforma
              </dt>
              <dd className="m-0 mt-1.5 font-sans text-[15px] text-white-soft">
                {vinculo.platform}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <DownloadButton
              label="Download direto"
              variant="solid"
              size="lg"
              showVersionMeta
            />
            <StoreButton size="lg" />
          </div>

          <div className="mt-8">
            <ChecksumLine />
          </div>
        </div>
      </PageSection>

      <PageSection id="requisitos" title="Requisitos de sistema">
        <ul className="m-0 flex max-w-[720px] list-none flex-col gap-3 p-0">
          {vinculo.requirements.map((requirement) => (
            <li
              key={requirement}
              className="grid grid-cols-[auto_1fr] items-baseline gap-3 font-sans text-[15.5px] font-light leading-[1.6] text-white-soft/80"
            >
              <span aria-hidden="true" className="text-cyan-400">
                ·
              </span>
              {requirement}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="instalacao" title="Como instalar">
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

        <p className="mt-8 font-sans text-[15px] font-light text-white-soft/70">
          Algo não saiu como esperado?{" "}
          <Link
            href="/suporte"
            className="text-violet-200 underline underline-offset-4 hover:text-white"
          >
            Veja a página de suporte
          </Link>{" "}
          ou{" "}
          <Link
            href="/contato"
            className="text-violet-200 underline underline-offset-4 hover:text-white"
          >
            fale com a gente
          </Link>
          .
        </p>
      </PageSection>

      <JsonLd data={softwareApplicationJsonLd()} />
    </>
  );
}
