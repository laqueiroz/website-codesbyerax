import type { Metadata } from "next";

import { PageHeader, PageSection } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { showBlogPosts } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog / Novidades",
  description:
    "Notas de desenvolvimento e novidades da Codes by Erax. A publicação começa em breve.",
  path: "/blog",
  // Sem artigos publicados, indexar a página só geraria um resultado vazio na
  // busca. Basta remover quando o primeiro texto for ao ar.
  noIndex: !showBlogPosts,
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog / Novidades"
        title="Ainda não há nada publicado aqui"
        description="Esta seção vai reunir notas de desenvolvimento, decisões de produto e novidades das versões. Enquanto o primeiro texto não sai, o changelog já registra tudo o que muda no aplicativo."
      />

      <PageSection>
        <div className="flex max-w-[720px] flex-col items-start gap-6 rounded-[14px] border border-white/12 bg-white/[0.02] p-7 wide:p-9">
          <p className="m-0 font-mono text-[10.5px] uppercase tracking-[.2em] text-cyan-400">
            Em construção
          </p>
          <p className="m-0 font-sans text-[15.5px] font-light leading-[1.7] text-white-soft/75">
            Preferimos deixar a página honesta e vazia a preenchê-la com texto de
            enfeite. Por enquanto, estes são os lugares onde há informação de
            verdade:
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/changelog" variant="solid" size="sm">
              Ver o changelog
            </Button>
            <Button href="/#roadmap" variant="outline" size="sm">
              Ver o roadmap
            </Button>
          </div>
        </div>
      </PageSection>
    </>
  );
}
