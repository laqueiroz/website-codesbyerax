import type { Metadata } from "next";
import Link from "next/link";

import { LegalNotice } from "@/components/layout/LegalNotice";
import { PageHeader, PageSection, Prose } from "@/components/layout/PageHeader";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacidade (LGPD)",
  description:
    "Como a Codes by Erax trata dados: o Vínculo Tutoria guarda tudo na máquina do professor, sem conta e sem nuvem.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacidade"
        description="Resumo em uma frase: o Vínculo Tutoria não envia os dados dos seus alunos para lugar nenhum."
      />

      <PageSection>
        <LegalNotice updatedAt="julho de 2026" />

        <Prose>
          <h3>Dados no aplicativo</h3>
          <p>
            O Vínculo Tutoria é <strong>offline-first</strong>. Os registros de
            atendimento, os dados dos alunos e os relatórios gerados ficam
            armazenados apenas no computador onde o aplicativo foi instalado. Não
            há criação de conta obrigatória, não há sincronização com servidores da
            Codes by Erax e o backup automático também é local.
          </p>
          <p>
            Como consequência prática: a Codes by Erax não tem acesso aos dados dos
            seus alunos e não consegue recuperá-los caso o computador seja perdido
            ou formatado. A cópia de segurança é responsabilidade de quem usa.
          </p>

          <h3>Papéis no tratamento de dados</h3>
          <p>
            Os dados de alunos tratados dentro do aplicativo pertencem ao contexto
            escolar. A instituição de ensino e o professor permanecem responsáveis
            por esse tratamento perante a LGPD (Lei nº 13.709/2018). A Codes by
            Erax fornece a ferramenta e não atua como operadora desses dados, já
            que não os recebe.
          </p>

          <h3>Dados no site</h3>
          <p>
            Este site coleta apenas o que você digita voluntariamente nos
            formulários:
          </p>
          <ul>
            <li>
              <strong>Contato:</strong> nome, e-mail, assunto e mensagem — usados
              exclusivamente para responder você.
            </li>
            <li>
              <strong>Lista de espera:</strong> nome, e-mail, mensagem opcional e o
              produto escolhido — usados para avisar sobre o lançamento daquele
              produto, mediante o consentimento que você marca no formulário.
            </li>
          </ul>
          <p>
            Esses envios são processados por um serviço de e-mail transacional
            contratado para essa finalidade. Não há venda, aluguel ou
            compartilhamento comercial desses dados.
          </p>

          <h3>Cookies e medição</h3>
          <p>
            O site não usa cookies de publicidade nem ferramentas de rastreamento
            de terceiros. Não há perfilamento de visitantes.
          </p>

          <h3>Seus direitos</h3>
          <p>
            Você pode solicitar acesso, correção ou exclusão dos dados que enviou
            pelos formulários deste site, e pode retirar o consentimento da lista de
            espera a qualquer momento. Para isso, use a{" "}
            <Link href="/contato">página de contato</Link>
            {siteConfig.supportEmail ? ` ou escreva para ${siteConfig.supportEmail}` : ""}.
          </p>
        </Prose>
      </PageSection>
    </>
  );
}
