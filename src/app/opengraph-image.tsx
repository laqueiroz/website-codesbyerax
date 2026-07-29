import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

/**
 * Imagem de Open Graph / Twitter Card, gerada a partir dos assets reais da
 * marca — nada de identidade visual inventada.
 *
 * Se a cliente entregar um `og-image.png` finalizado, basta colocá-lo em
 * /public e apontar `openGraph.images` no layout para ele; este arquivo pode
 * então ser removido.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const wordmark = await readFile(join(process.cwd(), "public/assets/logo-word.png"));
  const src = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background:
            "radial-gradient(90% 70% at 70% 8%, #160f2c 0%, #0a0718 42%, #040309 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={260} height={90} style={{ opacity: 0.92 }} />

        <div
          style={{
            marginTop: 48,
            display: "flex",
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#F5F2FC",
            maxWidth: 900,
          }}
        >
          Tecnologia que observa a sala de aula.
        </div>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            fontSize: 26,
            lineHeight: 1.5,
            color: "rgba(237,234,246,.66)",
            maxWidth: 820,
          }}
        >
          Software, inteligência artificial e educação para quem ensina.
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#7fe3e8",
          }}
        >
          Vínculo Tutoria · Windows
        </div>
      </div>
    ),
    size,
  );
}
