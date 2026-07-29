import Link from "next/link";

import { ConstellationDial } from "@/components/effects/ConstellationDial";
import {
  MouseParallaxLayer,
  MouseParallaxScope,
} from "@/components/effects/MouseParallax";
import { DownloadButton } from "@/components/home/DownloadButton";
import { heroStats } from "@/content/products";

const HERO_NEBULA = [
  "radial-gradient(26% 32% at 20% 78%, rgba(30,72,180,.30), transparent 70%)",
  "radial-gradient(28% 30% at 74% 22%, rgba(120,66,220,.28), transparent 70%)",
].join(",");

/**
 * Hero da home.
 *
 * Componente de servidor: nada aqui precisa de estado. Só o `MouseParallaxScope`
 * (que é client) roda JavaScript, e a entrada escalonada é CSS — ver
 * `.hero-enter` em globals.css, que explica por que a animação não usa Framer
 * Motion neste caso específico.
 */
export function Hero() {
  return (
    <MouseParallaxScope
      as="section"
      id="top"
      aria-labelledby="hero-titulo"
      className="relative grid items-center gap-10 overflow-hidden px-5 pb-24 pt-[72px] wide:min-h-[840px] wide:grid-cols-[1.02fr_.98fr] wide:px-[46px] wide:pb-[120px] wide:pt-[100px]"
    >
      <MouseParallaxLayer
        depth={22}
        className="pointer-events-none absolute -inset-[60px]"
        style={{ background: HERO_NEBULA, filter: "blur(14px)" }}
      />

      <div className="hero-enter relative">
        <p className="type-eyebrow m-0">Carta de produtos · 2026</p>

        <h1
          id="hero-titulo"
          className="type-display m-0 mt-6 text-[clamp(44px,7.2vw,92px)] leading-none tracking-[-0.022em] text-white-hi-2"
        >
          Tecnologia
          <br />
          que <em className="italic text-violet-200">observa</em>
          <br />a sala de aula.
        </h1>

        <p className="mt-[30px] max-w-[520px] font-sans text-[17px] font-light leading-[1.78] text-white-soft/70 wide:text-[18px]">
          Um estúdio pequeno construindo software de educação com padrão de produto
          grande. Aplicativos, ferramentas e inteligência artificial para quem ensina —
          cada um nascido de um problema real.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <DownloadButton
            size="lg"
            variant="solid"
            label="Baixar Vínculo Tutoria"
            showPlatformMeta
          />
          <Link
            href="/#produtos"
            className="group inline-flex min-h-[44px] items-center font-sans text-[13.5px] text-white-soft/80 transition-colors hover:text-cyan-400"
          >
            {/* A sublinha fica num span interno para acompanhar o texto, e não a
                caixa de 44px que garante a área de toque. */}
            <span className="border-b border-white-soft/30 pb-1 transition-colors group-hover:border-cyan-400">
              Explorar a constelação
            </span>
          </Link>
        </div>

        <ul className="m-0 mt-14 flex list-none flex-wrap gap-x-9 gap-y-3 p-0 font-mono text-[11px] uppercase leading-relaxed tracking-[.14em] text-white-soft/60">
          {heroStats.map((stat) => (
            <li key={stat}>{stat}</li>
          ))}
        </ul>
      </div>

      <div className="hero-enter hero-enter-dial relative mt-10 w-full max-w-[520px] justify-self-center wide:mt-0 wide:max-w-[660px]">
        <MouseParallaxLayer depth={16}>
          <ConstellationDial />
        </MouseParallaxLayer>
      </div>

      <div
        aria-hidden="true"
        className="hero-enter hero-enter-hint pointer-events-none absolute bottom-11 left-5 hidden items-center gap-3.5 wide:left-[46px] wide:flex"
      >
        <span className="block h-px w-[52px] bg-[linear-gradient(90deg,rgba(237,234,246,.4),transparent)]" />
        <span className="font-mono text-[9.5px] uppercase leading-none tracking-[.26em] text-white-soft/55">
          Role para explorar
        </span>
      </div>
    </MouseParallaxScope>
  );
}
