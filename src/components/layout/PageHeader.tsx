import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Rótulo em mono acima do título, ex. "Suporte". */
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Cabeçalho padrão das páginas internas. Mantém a hierarquia h1 → h2 → h3. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="px-5 pb-12 pt-16 wide:px-[46px] wide:pb-16 wide:pt-24">
      <p className="type-eyebrow m-0">{eyebrow}</p>
      <h1 className="type-display m-0 mt-5 max-w-[900px] text-[clamp(38px,5.4vw,72px)] tracking-[-0.02em] text-white-hi-2">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-[620px] font-sans text-[17px] font-light leading-[1.76] text-white-soft/70">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </header>
  );
}

/** Bloco de conteúdo comum das páginas internas. */
export function PageSection({
  title,
  id,
  children,
  className,
}: {
  title?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={title && id ? `${id}-titulo` : undefined}
      className={`px-5 pb-16 wide:px-[46px] ${className ?? ""}`}
    >
      {title ? (
        <h2
          id={id ? `${id}-titulo` : undefined}
          className="type-display m-0 mb-7 text-[clamp(26px,3vw,38px)] text-white-soft"
        >
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

/** Texto corrido legível para páginas legais e institucionais. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-[720px] flex-col gap-5 font-sans text-[16px] font-light leading-[1.8] text-white-soft/75 [&_a]:text-violet-200 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-white [&_h3]:mb-0 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-[24px] [&_h3]:font-normal [&_h3]:leading-tight [&_h3]:text-white-soft [&_li]:leading-[1.7] [&_strong]:font-medium [&_strong]:text-white-soft [&_ul]:m-0 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
      {children}
    </div>
  );
}
