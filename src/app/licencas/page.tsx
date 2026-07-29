import type { Metadata } from "next";
import Link from "next/link";

import { LegalNotice } from "@/components/layout/LegalNotice";
import { PageHeader, PageSection, Prose } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Licenças",
  description:
    "Software de terceiros e fontes utilizados no site e nos produtos da Codes by Erax.",
  path: "/licencas",
});

/**
 * Atribuições que podem ser afirmadas com certeza: as dependências deste site.
 * As bibliotecas do aplicativo desktop não foram informadas no handoff e por
 * isso não são listadas — ver docs/pendencias.md.
 */
const SITE_DEPENDENCIES = [
  { name: "Next.js", license: "MIT", holder: "Vercel, Inc." },
  { name: "React", license: "MIT", holder: "Meta Platforms, Inc. e colaboradores" },
  { name: "Tailwind CSS", license: "MIT", holder: "Tailwind Labs, Inc." },
  { name: "Framer Motion", license: "MIT", holder: "Framer B.V." },
  { name: "Resend (SDK)", license: "MIT", holder: "Resend, Inc." },
];

const FONTS = [
  {
    name: "Cormorant Garamond",
    license: "SIL Open Font License 1.1",
    holder: "Christian Thalmann / Catharsis Fonts",
  },
  {
    name: "IBM Plex Sans",
    license: "SIL Open Font License 1.1",
    holder: "IBM Corp.",
  },
  {
    name: "IBM Plex Mono",
    license: "SIL Open Font License 1.1",
    holder: "IBM Corp.",
  },
];

export default function LicencasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Licenças e atribuições"
        description="Software livre e fontes tipográficas usados para construir este site."
      />

      <PageSection>
        <LegalNotice updatedAt="julho de 2026" />

        <Prose>
          <p>
            Este site é construído sobre software livre. Abaixo estão as
            dependências principais e suas licenças. A lista completa, incluindo
            dependências transitivas, pode ser gerada a qualquer momento com{" "}
            <code>npm ls --all</code> no repositório do projeto.
          </p>
        </Prose>

        <LicenseTable title="Bibliotecas do site" items={SITE_DEPENDENCIES} />
        <LicenseTable title="Fontes tipográficas" items={FONTS} />

        <div className="mt-10">
          <Prose>
            <h3>Aplicativo Vínculo Tutoria</h3>
            <p>
              As atribuições de terceiros do aplicativo desktop ainda não foram
              consolidadas nesta página. Enquanto isso, elas podem ser solicitadas
              pela <Link href="/contato">página de contato</Link>.
            </p>

            <h3>Marca e identidade visual</h3>
            <p>
              O nome <strong>Codes by Erax</strong>, o nome{" "}
              <strong>Vínculo Tutoria</strong> e os arquivos de logotipo são de
              titularidade da Codes by Erax e não estão cobertos pelas licenças de
              software acima.
            </p>
          </Prose>
        </div>
      </PageSection>
    </>
  );
}

function LicenseTable({
  title,
  items,
}: {
  title: string;
  items: readonly { name: string; license: string; holder: string }[];
}) {
  return (
    <div className="mt-10 max-w-[820px]">
      <h2 className="m-0 mb-4 font-display text-[26px] font-normal leading-tight text-white-soft">
        {title}
      </h2>
      <ul className="m-0 flex list-none flex-col p-0">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-white/10 py-4 last:border-b"
          >
            <span className="font-sans text-[15.5px] text-white-soft">{item.name}</span>
            <span className="font-sans text-[14px] font-light text-white-soft/65">
              {item.holder}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[.14em] text-cyan-400">
              {item.license}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
