import Image from "next/image";

import {
  MouseParallaxLayer,
  MouseParallaxScope,
} from "@/components/effects/MouseParallax";
import { Reveal } from "@/components/effects/Reveal";
import { ChecksumLine } from "@/components/home/ChecksumLine";
import { DownloadButton, StoreButton } from "@/components/home/DownloadButton";
import { brandAssets, vinculo } from "@/content/site";

const CTA_NEBULA =
  "radial-gradient(30% 40% at 50% 30%, rgba(120,66,220,.26), transparent 70%)";

export function DownloadSection() {
  return (
    <MouseParallaxScope
      as="section"
      id="download"
      aria-labelledby="download-titulo"
      className="relative mt-20 overflow-hidden rounded-[16px] border border-violet-300/25 bg-[linear-gradient(160deg,rgba(122,80,215,.16),rgba(255,255,255,.012))] px-6 py-[72px] text-center wide:mx-[46px] wide:mt-[120px] wide:px-[46px] wide:py-[110px] mx-5"
    >
      <MouseParallaxLayer
        depth={18}
        className="pointer-events-none absolute -inset-10"
        style={{ background: CTA_NEBULA, filter: "blur(16px)" }}
      />

      <Reveal className="relative flex flex-col items-center">
        <Image
          src={brandAssets.mark.src}
          alt=""
          width={brandAssets.mark.width}
          height={brandAssets.mark.height}
          sizes="96px"
          loading="lazy"
          className="anim-floaty w-24"
          style={{ height: "auto", filter: "drop-shadow(0 0 34px rgba(146,104,240,.5))" }}
        />

        <h2
          id="download-titulo"
          className="type-display m-0 mt-9 max-w-[840px] text-[clamp(32px,4.2vw,62px)]"
        >
          Comece pelo primeiro ponto da constelação.
        </h2>

        <p className="mt-6 max-w-[560px] font-sans text-[17px] font-light leading-[1.74] text-white-soft/70">
          Gratuito para professores. Sem conta, sem nuvem, sem letra miúda.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <DownloadButton
            label="Download direto"
            variant="solid"
            size="lg"
            showVersionMeta
          />
          <StoreButton size="lg" />
        </div>

        <p className="mt-7 font-mono text-[10.5px] uppercase leading-[1.6] tracking-[.16em] text-white-soft/60">
          {vinculo.platform}
        </p>

        <div className="mt-4 flex w-full max-w-[560px] justify-center">
          <ChecksumLine compact />
        </div>
      </Reveal>
    </MouseParallaxScope>
  );
}
