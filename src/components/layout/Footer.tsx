import Image from "next/image";
import Link from "next/link";

import { brandAssets, footerNav, siteConfig } from "@/content/site";
import { services, serviceStateLabels } from "@/content/status";

const TWINKLE_DOTS = [
  { size: 5, color: "#EDEAF6", duration: "5s" },
  { size: 4, color: "#b69cf0", duration: "7s" },
  { size: 5, color: "#7fe3e8", duration: "6s" },
];

/**
 * Rodapé do site.
 *
 * Todos os links apontam para rotas reais — nenhum `href="#"` sobreviveu do
 * protótipo. O selo de status espelha `content/status.ts` em vez de afirmar
 * "todos os serviços operacionais" de forma fixa.
 */
export function Footer() {
  const allOperational = services.every((service) => service.state === "operational");
  const statusLabel = allOperational
    ? "Todos os serviços operacionais"
    : `Status: ${serviceStateLabels[services.find((s) => s.state !== "operational")!.state]}`;

  return (
    <footer className="relative mt-[120px] border-t border-white/8 px-5 pb-11 pt-[70px] wide:px-[46px]">
      <div className="grid gap-11 wide:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src={brandAssets.word.src}
            alt={siteConfig.name}
            width={brandAssets.word.width}
            height={brandAssets.word.height}
            sizes="(max-width: 1180px) 120px, 100px"
            className="h-[34px] w-auto opacity-90"
          />
          <p className="mt-5 max-w-[320px] font-sans text-[14px] font-light leading-[1.7] text-white-soft/62">
            {siteConfig.shortDescription}
          </p>

          <Link
            href="/status"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2.5 font-mono text-[10.5px] uppercase leading-none tracking-[.14em] text-white-soft/62 transition-colors hover:text-white"
          >
            <span
              aria-hidden="true"
              className="size-[7px] shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_#7fe3e8]"
            />
            {statusLabel}
          </Link>
        </div>

        {footerNav.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="m-0 font-mono text-[10.5px] uppercase leading-none tracking-[.2em] text-white-soft/55">
              {column.heading}
            </h2>
            <ul className="m-0 mt-4 flex list-none flex-col gap-1 p-0">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[40px] items-center font-sans text-[14px] font-light text-white-soft/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-13 flex flex-wrap items-center justify-between gap-5 border-t border-white/8 pt-6 font-mono text-[10.5px] uppercase leading-relaxed tracking-[.14em] text-white-soft/55">
        <span>
          © {siteConfig.copyrightYear} {siteConfig.name}
        </span>

        <span className="flex items-center gap-2.5">
          {TWINKLE_DOTS.map((dot) => (
            <span
              key={dot.color}
              aria-hidden="true"
              className="anim-twinkle block rounded-full"
              style={{
                width: dot.size,
                height: dot.size,
                background: dot.color,
                ["--twinkle-duration" as string]: dot.duration,
              }}
            />
          ))}
          O gato está observando
        </span>
      </div>
    </footer>
  );
}
