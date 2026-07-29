/**
 * Primeiro elemento focável da página. Fica fora da tela até receber foco,
 * quando desce para o canto superior esquerdo.
 */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-full focus:border focus:border-cyan-400/60 focus:bg-space-black focus:px-5 focus:py-3 focus:font-sans focus:text-[14px] focus:text-white-soft"
    >
      Pular para o conteúdo principal
    </a>
  );
}
