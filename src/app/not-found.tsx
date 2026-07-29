import type { Metadata } from "next";

import { ConstellationCat } from "@/components/effects/ConstellationCat";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço acessado não existe neste site.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="erro-404"
      className="mx-auto flex min-h-[70vh] max-w-[820px] flex-col items-center justify-center px-5 py-24 text-center wide:px-[46px]"
    >
      <ConstellationCat className="w-[min(72vw,300px)]" />

      <p className="type-eyebrow m-0 mt-10">Erro 404</p>

      <h1
        id="erro-404"
        className="type-display m-0 mt-5 text-[clamp(34px,5.4vw,62px)] text-white-hi-2"
      >
        Esta estrela não está na carta.
      </h1>

      <p className="mt-6 max-w-[520px] font-sans text-[17px] font-light leading-[1.76] text-white-soft/70">
        O endereço que você abriu não existe — ou deixou de existir. O gato viu
        você chegar; a página, não.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="solid" size="md">
          Voltar ao início
        </Button>
        <Button href="/downloads" variant="outline" size="md">
          Downloads
        </Button>
        <Button href="/suporte" variant="outline" size="md">
          Suporte
        </Button>
      </div>
    </section>
  );
}
