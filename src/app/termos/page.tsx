import type { Metadata } from "next";
import Link from "next/link";

import { LegalNotice } from "@/components/layout/LegalNotice";
import { PageHeader, PageSection, Prose } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Termos de uso",
  description:
    "Condições de uso do Vínculo Tutoria e do site da Codes by Erax.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Termos de uso"
        description="As condições sob as quais o Vínculo Tutoria e este site são oferecidos."
      />

      <PageSection>
        <LegalNotice updatedAt="julho de 2026" />

        <Prose>
          <h3>Do que se trata</h3>
          <p>
            Estes termos se aplicam ao uso do site da Codes by Erax e do aplicativo{" "}
            <strong>Vínculo Tutoria</strong>. Ao instalar ou usar o aplicativo, você
            concorda com o que está descrito aqui.
          </p>

          <h3>Licença de uso</h3>
          <p>
            O Vínculo Tutoria é oferecido gratuitamente a professores, para uso
            pessoal e profissional na atividade docente. A licença é de uso, não de
            propriedade: o código e a marca continuam pertencendo à Codes by Erax.
          </p>
          <p>Não é permitido:</p>
          <ul>
            <li>revender, sublicenciar ou cobrar pelo acesso ao aplicativo;</li>
            <li>
              redistribuir o instalador modificado ou apresentá-lo como produto
              próprio;
            </li>
            <li>
              tentar contornar limitações técnicas com o objetivo de descaracterizar
              o produto.
            </li>
          </ul>

          <h3>Responsabilidade sobre os dados</h3>
          <p>
            O aplicativo grava tudo localmente. Manter cópias de segurança do
            computador onde ele está instalado é responsabilidade de quem usa. A
            Codes by Erax não tem acesso a esses dados e, portanto, não consegue
            recuperá-los.
          </p>

          <h3>Disponibilidade e alterações</h3>
          <p>
            O aplicativo é fornecido &quot;no estado em que se encontra&quot;. As
            versões, os prazos do roadmap e os recursos anunciados podem mudar — é
            justamente por isso que o{" "}
            <Link href="/changelog">changelog é público</Link>.
          </p>

          <h3>Contato</h3>
          <p>
            Dúvidas sobre estes termos podem ser enviadas pela{" "}
            <Link href="/contato">página de contato</Link>.
          </p>
        </Prose>
      </PageSection>
    </>
  );
}
