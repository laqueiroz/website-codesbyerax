import type { Metadata } from "next";

import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { PageHeader } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Produtos",
  description:
    "O catálogo da Codes by Erax: Vínculo Tutoria disponível para Windows, além do Plano de Aula IA e do Constelação em desenvolvimento.",
  path: "/produtos",
});

export default function ProdutosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Produtos e futuros aplicativos"
        description="Uma constelação em formação: um aplicativo publicado e dois ainda velados. Entre na lista de espera para saber primeiro quando cada um chegar."
      />
      <ProductsCatalog />
    </>
  );
}
