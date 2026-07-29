import { locales } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Seletor de idioma.
 *
 * Só o português existe hoje. O botão EN é renderizado como `<button disabled>`
 * com `aria-disabled` e um texto de apoio ("Em breve") lido por leitores de
 * tela — nunca como um link que aparenta funcionar e não leva a lugar nenhum.
 *
 * Quando a rota `[locale]` entrar, basta marcar `enabled: true` em
 * `src/i18n/config.ts`: este componente passa a renderizar links de verdade.
 */
export function LocaleSwitch({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center overflow-hidden rounded-full border border-white/15",
        className,
      )}
      role="group"
      aria-label="Idioma do site"
    >
      {locales.map((locale) =>
        locale.enabled ? (
          <span
            key={locale.code}
            aria-current="true"
            className="bg-white-soft/92 px-2.5 py-2 font-mono text-[10.5px] font-medium leading-none text-ink-inverse"
          >
            <span className="sr-only">Idioma atual: {locale.nativeName}. </span>
            {locale.label}
          </span>
        ) : (
          <button
            key={locale.code}
            type="button"
            disabled
            aria-disabled="true"
            title={`${locale.nativeName} — em breve`}
            className="cursor-not-allowed px-2.5 py-2 font-mono text-[10.5px] font-medium leading-none text-white-soft/55"
          >
            {locale.label}
            <span className="sr-only"> — {locale.nativeName}, em breve</span>
          </button>
        ),
      )}
    </div>
  );
}
