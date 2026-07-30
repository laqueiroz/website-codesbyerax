/**
 * Preparação para i18n baseada em rotas.
 *
 * Estado atual: apenas pt-BR existe. Nenhuma tradução automática é gerada e o
 * seletor EN da navbar aparece desabilitado, com explicação acessível — nunca
 * como se estivesse funcionando.
 *
 * Para adicionar inglês depois:
 *   1. marque `enabled: true` no locale `en` abaixo;
 *   2. mova `src/app/(site)` para `src/app/[locale]` e leia `params.locale`;
 *   3. adicione um `middleware.ts` que redirecione `/` para `/${defaultLocale}`;
 *   4. duplique `src/content/*` por locale (ou troque por um CMS/MDX);
 *   5. inclua `alternates.languages` no metadata de cada rota.
 *
 * Nada além deste arquivo precisa mudar para o seletor voltar a funcionar: o
 * componente `LocaleSwitch` já lê `locales` daqui.
 */

export interface LocaleDefinition {
  code: string;
  /** Código para o atributo `lang` do HTML. */
  htmlLang: string;
  label: string;
  /** Nome do idioma no próprio idioma, para leitores de tela. */
  nativeName: string;
  enabled: boolean;
}

export const locales: readonly LocaleDefinition[] = [
  {
    code: "pt",
    htmlLang: "pt-BR",
    label: "PT",
    nativeName: "Português (Brasil)",
    enabled: true,
  },
  {
    code: "en",
    htmlLang: "en",
    label: "EN",
    nativeName: "English",
    enabled: true,
  },
];

export const defaultLocale = "pt";

export const enabledLocales = locales.filter((l) => l.enabled);
