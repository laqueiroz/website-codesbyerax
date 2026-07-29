import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * Favicon gerado a partir do emblema real da marca.
 *
 * O PNG entregue é retangular (539×491) e claro demais para virar ícone
 * diretamente; aqui ele é centralizado sobre o preto espacial em um quadrado,
 * que é o formato que navegadores esperam. Substitua por um `favicon.ico`
 * estático em /public assim que o arquivo vetorial chegar.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const mark = await readFile(join(process.cwd(), "public/assets/logo-mark.png"));
  const src = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 40%, #160f2c 0%, #040309 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={48} height={44} />
      </div>
    ),
    size,
  );
}
