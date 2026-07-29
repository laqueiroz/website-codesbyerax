"use client";

import Link from "next/link";

import { DownloadButton } from "@/components/home/DownloadButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Product } from "@/content/products";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: Product;
  /**
   * Chamado quando um produto ainda não lançado é acionado. O modal cuida
   * sozinho de devolver o foco a quem o abriu.
   */
  onWaitlist: (product: Product) => void;
}

/**
 * Card de produto — a estrela da constelação.
 *
 * Lançado: título, descrição, etiquetas e ações reais.
 * Não lançado: velado por nébula, com o painel "Em breve" surgindo no hover e
 * no foco. O painel é decorativo (`aria-hidden`, `pointer-events: none`); a
 * ação de verdade é o botão "Entrar na lista de espera", que existe sempre no
 * DOM, é alcançável por teclado e cobre o card inteiro para o clique.
 */
export function ProductCard({ product, onWaitlist }: ProductCardProps) {
  if (!product.waitlist) return <ShippedCard product={product} />;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[10px] border border-white/10",
        "bg-white/[0.014] p-8 transition-[border-color,transform] duration-[400ms]",
        "hover:-translate-y-1 hover:border-violet-300/35",
        "focus-within:-translate-y-1 focus-within:border-violet-300/35",
      )}
    >
      {product.nebula ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[30%] transition-opacity duration-500 group-hover:opacity-35 group-focus-within:opacity-35"
          style={{
            background: product.nebula.background,
            opacity: product.nebula.opacity,
            filter: "blur(22px)",
          }}
        />
      ) : null}

      {/* Painel "Em breve": reforço visual do hover, nunca a única pista. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[2] hidden flex-col items-center justify-center gap-3",
          "bg-ink-800/50 opacity-0 backdrop-blur-[3px] transition-opacity duration-[450ms]",
          "group-hover:opacity-100 group-focus-within:opacity-100 wide:flex",
        )}
      >
        <span className="size-[9px] rounded-full bg-cyan-400 shadow-[0_0_16px_#7fe3e8]" />
        <span className="font-mono text-[13px] uppercase leading-none tracking-[.36em] text-white-soft">
          Em breve
        </span>
        <span className="font-sans text-[12.5px] font-light text-white-soft/70">
          Entrar na lista de espera
        </span>
      </div>

      <div className="relative flex flex-1 flex-col">
        <StatusBadge status={product.status} tone="violet">
          {product.statusLabel}
        </StatusBadge>

        <h3 className="m-0 mt-6 font-display text-[28px] font-normal leading-[1.16] text-white-soft">
          {product.name}
        </h3>

        <p className="mt-3 font-sans text-[14.5px] font-light leading-[1.66] text-white-soft/65">
          {product.description}
        </p>

        {product.eta ? (
          <p className="m-0 mt-7 flex justify-between gap-4 font-mono text-[11px] uppercase leading-none tracking-[.12em] text-white-soft/55">
            <span>{product.etaLabel}</span>
            <span>{product.eta}</span>
          </p>
        ) : null}

        <div className="mt-7 pt-1">
          <button
            type="button"
            onClick={() => onWaitlist(product)}
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-full border border-white-soft/25 px-5",
              "font-sans text-[13px] text-white-soft/90 transition-colors",
              "hover:border-cyan-400/55 hover:text-white",
              // Estende a área de clique para o card inteiro sem aninhar
              // elementos interativos.
              "after:absolute after:inset-0 after:z-[3] after:content-['']",
            )}
          >
            Entrar na lista de espera
            <span className="sr-only"> de {product.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

/** Card do produto publicado — maior, iluminado, com download real. */
function ShippedCard({ product }: { product: Product }) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[10px] border border-violet-300/25 p-8 wide:p-9",
        "bg-[linear-gradient(160deg,rgba(122,80,215,.15),rgba(255,255,255,.014))]",
        "transition-[border-color,transform] duration-[400ms]",
        "hover:-translate-y-1 hover:border-cyan-400/45 focus-within:border-cyan-400/45",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_92%_6%,rgba(127,227,232,.11),transparent_70%)]"
      />

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <StatusBadge status={product.status} pulse>
          {product.statusLabel}
          {product.version ? ` · v${product.version}` : null}
        </StatusBadge>
        {product.platform ? (
          <span className="font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-white-soft/60">
            {product.platform}
          </span>
        ) : null}
      </div>

      <h3 className="relative m-0 mt-7 font-display text-[clamp(30px,4vw,40px)] font-normal leading-[1.1] text-white-hi">
        {product.name}
      </h3>

      <p className="relative mt-3.5 max-w-[520px] font-sans text-[15.5px] font-light leading-[1.68] text-white-soft/70">
        {product.description}
      </p>

      {product.tags ? (
        <ul className="relative m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] leading-normal text-white-soft/70"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="relative mt-9 flex flex-wrap gap-3">
        <DownloadButton label="Download" variant="solid" size="sm" />
        <Link
          href="/#app"
          className="inline-flex min-h-[44px] items-center rounded-full border border-white-soft/25 px-[22px] font-sans text-[13px] text-white-soft/90 transition-colors hover:border-cyan-400/55 hover:text-white"
        >
          Ver a página do app
        </Link>
      </div>
    </article>
  );
}
