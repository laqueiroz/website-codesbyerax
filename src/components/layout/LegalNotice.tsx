/**
 * Aviso obrigatório no topo das páginas legais.
 *
 * O material recebido não inclui texto jurídico revisado. O conteúdo aqui é um
 * ponto de partida honesto sobre como o produto funciona — não substitui
 * revisão jurídica, e nenhuma certificação, selo ou garantia foi inventada.
 */
export function LegalNotice({ updatedAt }: { updatedAt: string }) {
  return (
    <div className="mb-10 max-w-[720px] rounded-lg border border-violet-300/35 bg-violet-300/8 px-5 py-4">
      <p className="m-0 font-mono text-[10.5px] uppercase tracking-[.18em] text-violet-200">
        Conteúdo inicial · sujeito a revisão
      </p>
      <p className="m-0 mt-3 font-sans text-[14.5px] font-light leading-[1.7] text-white-soft/80">
        Esta é uma redação preliminar, escrita a partir de como o produto de fato
        funciona. Ela ainda precisa de revisão jurídica antes de valer como
        documento definitivo. Última atualização: {updatedAt}.
      </p>
    </div>
  );
}
