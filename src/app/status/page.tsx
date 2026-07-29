import type { Metadata } from "next";

import { PageHeader, PageSection } from "@/components/layout/PageHeader";
import { services, serviceStateLabels, statusNotice } from "@/content/status";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Status",
  description:
    "Situação atual dos serviços da Codes by Erax: site, distribuição de downloads e aplicativo.",
  path: "/status",
});

const STATE_STYLES = {
  operational: { dot: "bg-cyan-400 shadow-[0_0_10px_#7fe3e8]", text: "text-cyan-400" },
  degraded: { dot: "bg-violet-300", text: "text-violet-300" },
  down: { dot: "bg-[#ff9d9d]", text: "text-[#ffb4b4]" },
  maintenance: { dot: "bg-white-soft/70", text: "text-white-soft/75" },
} as const;

export default function StatusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Status"
        title="Situação dos serviços"
        description="O Vínculo Tutoria funciona offline: mesmo que algo aqui esteja indisponível, o aplicativo instalado continua trabalhando normalmente."
      />

      <PageSection>
        <p className="mb-9 max-w-[720px] rounded-lg border border-white/12 bg-white/[0.02] px-5 py-4 font-sans text-[14.5px] font-light leading-[1.7] text-white-soft/75">
          {statusNotice}
        </p>

        <ul className="m-0 flex max-w-[820px] list-none flex-col p-0">
          {services.map((service) => {
            const styles = STATE_STYLES[service.state];
            return (
              <li
                key={service.id}
                className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-t border-white/10 py-6 last:border-b"
              >
                <div className="max-w-[520px]">
                  <h2 className="m-0 font-sans text-[16px] font-medium leading-tight text-white-soft">
                    {service.name}
                  </h2>
                  <p className="mt-2 font-sans text-[14.5px] font-light leading-[1.65] text-white-soft/70">
                    {service.description}
                  </p>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-2.5 font-mono text-[10.5px] uppercase leading-none tracking-[.18em] ${styles.text}`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-[7px] rounded-full ${styles.dot}`}
                  />
                  {serviceStateLabels[service.state]}
                </span>
              </li>
            );
          })}
        </ul>
      </PageSection>
    </>
  );
}
