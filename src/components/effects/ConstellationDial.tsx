import Image from "next/image";

import { brandAssets } from "@/content/site";

interface DialNode {
  label: string;
  /** Posicionamento absoluto dentro do disco. */
  position: React.CSSProperties;
  size: number;
  color: string;
  glow: string;
  twinkle: string;
  /** Etiqueta antes do ponto (nós à direita do disco). */
  labelFirst?: boolean;
  /** Alfa do texto. Piso .62 para atender AA em texto de 10.5px. */
  labelAlpha: number;
}

const NODES: readonly DialNode[] = [
  {
    label: "Vínculo Tutoria",
    position: { left: "4%", top: "13%" },
    size: 8,
    color: "#EDEAF6",
    glow: "0 0 14px #b69cf0",
    twinkle: "4s",
    labelAlpha: 0.78,
  },
  {
    label: "Plano de Aula IA",
    position: { right: 0, top: "47%" },
    size: 7,
    color: "#b69cf0",
    glow: "0 0 12px #b69cf0",
    twinkle: "5.5s",
    labelFirst: true,
    labelAlpha: 0.62,
  },
  {
    label: "Constelação",
    position: { left: "10%", bottom: "11%" },
    size: 7,
    color: "#7fe3e8",
    glow: "0 0 12px #7fe3e8",
    twinkle: "6.5s",
    labelAlpha: 0.62,
  },
];

/**
 * Disco de constelação do hero: três anéis concêntricos (dois em rotação lenta
 * e contrária), o emblema da marca ao centro e os três produtos como estrelas
 * nomeadas.
 *
 * Decorativo — os nomes dos produtos aparecem em texto real nas seções abaixo,
 * então o disco inteiro fica fora da árvore de acessibilidade.
 */
export function ConstellationDial() {
  return (
    <div aria-hidden="true" className="relative aspect-square w-full">
      <div className="absolute inset-0 rounded-full border border-violet-300/15" />
      <div className="anim-rotslow absolute inset-[13%] rounded-full border border-violet-300/10" />
      <div className="anim-rotrev absolute inset-[28%] rounded-full border border-dashed border-cyan-400/15" />

      <Image
        src={brandAssets.mark.src}
        alt=""
        width={brandAssets.mark.width}
        height={brandAssets.mark.height}
        priority
        sizes="(max-width: 1180px) 40vw, 300px"
        className="absolute left-1/2 top-1/2 w-[44%] -translate-x-1/2 -translate-y-1/2"
        style={{ height: "auto", filter: "drop-shadow(0 0 52px rgba(150,110,245,.5))" }}
      />

      {NODES.map((node) => (
        <div
          key={node.label}
          className="absolute flex items-center gap-2.5"
          style={node.position}
        >
          {node.labelFirst && <DialLabel node={node} />}
          <span
            className="anim-twinkle block shrink-0 rounded-full"
            style={{
              width: node.size,
              height: node.size,
              background: node.color,
              boxShadow: node.glow,
              ["--twinkle-duration" as string]: node.twinkle,
            }}
          />
          {!node.labelFirst && <DialLabel node={node} />}
        </div>
      ))}
    </div>
  );
}

function DialLabel({ node }: { node: DialNode }) {
  return (
    <span
      className="whitespace-nowrap font-mono text-[10.5px] uppercase leading-none tracking-[.16em]"
      style={{ color: `rgb(237 234 246 / ${node.labelAlpha})` }}
    >
      {node.label}
    </span>
  );
}
