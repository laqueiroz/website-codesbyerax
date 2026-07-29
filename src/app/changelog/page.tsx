import type { Metadata } from "next";

import { PageHeader, PageSection } from "@/components/layout/PageHeader";
import { changelog, changelogNotice } from "@/content/changelog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Changelog",
  description:
    "Registro público das versões do Vínculo Tutoria: o que mudou em cada entrega.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="O que mudou, versão a versão"
        description="Changelog público é um dos princípios da casa: versões documentadas, nada de mudança silenciosa."
      />

      <PageSection>
        <p className="mb-10 max-w-[720px] rounded-lg border border-violet-300/35 bg-violet-300/8 px-5 py-4 font-sans text-[14.5px] font-light leading-[1.7] text-violet-200">
          {changelogNotice}
        </p>

        <ol className="m-0 flex max-w-[820px] list-none flex-col p-0">
          {changelog.map((entry) => (
            <li key={entry.version} className="border-t border-white/10 py-8 last:border-b">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <h2 className="m-0 font-display text-[32px] font-normal leading-none text-white-hi">
                  {entry.version}
                </h2>
                <time
                  dateTime={entry.date}
                  className="font-mono text-[10.5px] uppercase tracking-[.16em] text-cyan-400"
                >
                  {entry.period}
                </time>
              </div>

              <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-3 font-sans text-[15.5px] font-light leading-[1.65] text-white-soft/80"
                  >
                    <span aria-hidden="true" className="text-cyan-400">
                      ·
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </PageSection>
    </>
  );
}
