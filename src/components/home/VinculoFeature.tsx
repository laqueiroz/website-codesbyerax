import Link from "next/link";

import {
  MouseParallaxLayer,
  MouseParallaxScope,
} from "@/components/effects/MouseParallax";
import { Reveal } from "@/components/effects/Reveal";
import { AppWindowMock } from "@/components/home/AppWindowMock";
import { DownloadButton } from "@/components/home/DownloadButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { vinculoFeatures } from "@/content/products";

const APP_NEBULA =
  "radial-gradient(30% 40% at 78% 30%, rgba(120,66,220,.22), transparent 70%)";

export function VinculoFeature() {
  return (
    <MouseParallaxScope
      as="section"
      id="app"
      aria-labelledby="app-titulo"
      className="relative mt-[120px] overflow-hidden border-y border-white/8 px-5 py-20 wide:px-[46px] wide:py-24"
    >
      <MouseParallaxLayer
        depth={14}
        className="pointer-events-none absolute -inset-10"
        style={{ background: APP_NEBULA, filter: "blur(14px)" }}
      />

      <div className="relative grid items-center gap-11 wide:grid-cols-[1fr_1.06fr] wide:gap-14">
        <Reveal>
          <StatusBadge tone="cyan" pulse className="tracking-[.26em]">
            Aplicativo em destaque · Windows
          </StatusBadge>

          <h2
            id="app-titulo"
            className="type-display m-0 mt-6 text-[clamp(32px,4.2vw,62px)] leading-[1.06]"
          >
            Toda tutoria registrada.
            <br />
            Nenhuma perdida.
          </h2>

          <p className="mt-6 max-w-[520px] font-sans text-[17px] font-light leading-[1.76] text-white-soft/70">
            O{" "}
            <strong className="font-medium text-white-soft">Vínculo Tutoria</strong>{" "}
            transforma o caderno de anotações do professor em histórico organizado, com
            relatórios que a coordenação entende de primeira.
          </p>

          <ol className="m-0 mt-9 grid max-w-[520px] list-none gap-4 p-0">
            {vinculoFeatures.map((feature, index) => (
              <li
                key={feature}
                className="grid grid-cols-[auto_1fr] items-baseline gap-4"
              >
                <span className="font-mono text-[11px] leading-[1.5] text-cyan-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[15.5px] font-light leading-[1.6] text-white-soft/80">
                  {feature}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <DownloadButton label="Baixar para Windows" variant="gradient" size="md" />
            <Link
              href="/suporte"
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/18 px-6 font-sans text-[13.5px] text-white-soft/90 transition-colors hover:border-cyan-400/55 hover:text-white"
            >
              Ver requisitos e suporte
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AppWindowMock />
        </Reveal>
      </div>
    </MouseParallaxScope>
  );
}
