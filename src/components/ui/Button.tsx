import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "solid" | "gradient" | "outline" | "subtle";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex min-h-[44px] items-center justify-center gap-3 rounded-full text-center " +
  "font-sans transition-[background-color,border-color,color,box-shadow,filter] duration-300 " +
  "disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

const VARIANTS: Record<ButtonVariant, string> = {
  solid:
    "bg-white-soft text-ink-inverse font-medium hover:bg-white hover:shadow-[0_0_42px_rgba(182,156,240,.45)]",
  gradient:
    "bg-[linear-gradient(120deg,#8b5cf0,#6d3fd6)] text-white font-medium " +
    "shadow-[0_12px_42px_-16px_rgba(139,92,240,.9)] hover:brightness-110",
  outline:
    "border border-white-soft/25 text-white-soft/90 hover:border-cyan-400/55 hover:text-white",
  subtle:
    "border border-white/15 bg-white-soft/8 text-white-soft hover:border-cyan-400/50 hover:bg-white-soft/16",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-[22px] py-[13px] text-[13px] leading-none",
  md: "px-[26px] py-[15px] text-[13.5px] leading-none",
  lg: "px-[30px] py-4 text-[14px] leading-none",
};

/** Aparência de indisponível: some o brilho e reduz o contraste, sem sumir. */
const DISABLED =
  "border border-white/12 bg-white/[0.03] text-white-soft/45 shadow-none hover:bg-white/[0.03] " +
  "hover:shadow-none hover:brightness-100 hover:border-white/12 hover:text-white-soft/45";

interface CommonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Segundo rótulo em mono, ex. "WIN · 24 MB". */
  meta?: ReactNode;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  /** Abre em nova aba com rel de segurança. */
  external?: boolean;
  /** Sugere ao navegador salvar em vez de navegar. */
  download?: boolean;
  disabled?: never;
  type?: never;
  onClick?: never;
}

interface NativeButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
  external?: never;
  download?: never;
}

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/**
 * Botão único do sistema, em quatro variantes.
 *
 * Regra de ouro do projeto: um botão ou navega/executa, ou está explicitamente
 * desabilitado. Nunca existe um `href="#"` decorativo. Quando um destino não
 * está configurado, quem chama passa `disabled` e um rótulo próprio
 * ("Disponível em breve") — ver `DownloadButtons`.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "solid",
    size = "md",
    className,
    meta,
    ...rest
  } = props;

  const content = (
    <>
      <span>{children}</span>
      {meta ? (
        <span className="font-mono text-[11px] leading-none opacity-70">{meta}</span>
      ) : null}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, download } = rest;
    const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(download ? { download: "" } : {})}
        >
          {content}
        </a>
      );
    }

    // Downloads apontam para um arquivo, não para uma rota do app: `<a>` puro
    // evita que o router do Next tente interceptar a navegação.
    if (download) {
      return (
        <a href={href} download="" rel="noopener" className={classes}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { disabled, type = "button", ...buttonRest } = rest as NativeButtonProps;

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        BASE,
        disabled ? DISABLED : VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
