/**
 * O gato em constelação.
 *
 * Aparição rara e deliberada da mascote da marca — aqui, na página 404. É um
 * traçado de estrelas ligadas por linhas finas, lido como carta celeste: o
 * contorno só se resolve quando o olho completa as linhas. Nada de desenho
 * fofo ou infantil; a leitura é de mapa estelar, não de ilustração.
 *
 * Puramente decorativo (`aria-hidden`): a página comunica tudo em texto.
 */

/** Vértices do contorno, em coordenadas do viewBox 200×200. */
const STARS: readonly { x: number; y: number; r: number; hue: string; twinkle: string }[] = [
  { x: 62, y: 46, r: 2.6, hue: "#EDEAF6", twinkle: "5s" }, // orelha esquerda
  { x: 78, y: 26, r: 1.9, hue: "#b69cf0", twinkle: "6.5s" }, // ponta esquerda
  { x: 92, y: 48, r: 2.2, hue: "#EDEAF6", twinkle: "4.5s" }, // entre orelhas
  { x: 108, y: 26, r: 1.9, hue: "#b69cf0", twinkle: "7s" }, // ponta direita
  { x: 124, y: 48, r: 2.6, hue: "#EDEAF6", twinkle: "5.5s" }, // orelha direita
  { x: 132, y: 74, r: 2.1, hue: "#7fe3e8", twinkle: "6s" }, // face direita
  { x: 118, y: 96, r: 2.4, hue: "#EDEAF6", twinkle: "4s" }, // queixo direito
  { x: 92, y: 100, r: 2.4, hue: "#EDEAF6", twinkle: "5s" }, // queixo esquerdo
  { x: 62, y: 74, r: 2.1, hue: "#7fe3e8", twinkle: "6.5s" }, // face esquerda
  { x: 128, y: 132, r: 2.2, hue: "#b69cf0", twinkle: "5.5s" }, // dorso
  { x: 146, y: 158, r: 2.6, hue: "#EDEAF6", twinkle: "4.5s" }, // cauda erguida
  { x: 160, y: 128, r: 1.9, hue: "#7fe3e8", twinkle: "7s" }, // ponta da cauda
  { x: 96, y: 152, r: 2.2, hue: "#b69cf0", twinkle: "6s" }, // corpo
  { x: 74, y: 132, r: 2.1, hue: "#EDEAF6", twinkle: "5s" }, // peito
];

/** Índices de STARS ligados em sequência, formando o contorno. */
const LINES: readonly (readonly number[])[] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 0], // cabeça
  [6, 9, 10, 11], // dorso e cauda
  [9, 12, 13, 7], // corpo
];

/** Olhos — os dois pontos mais brilhantes, o "gato observando". */
const EYES = [
  { x: 82, y: 68 },
  { x: 106, y: 68 },
];

export function ConstellationCat({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      role="presentation"
    >
      {LINES.map((line, lineIndex) => (
        <polyline
          key={lineIndex}
          points={line
            .map((index) => {
              const star = STARS[index]!;
              return `${star.x},${star.y}`;
            })
            .join(" ")}
          stroke="rgba(160,132,224,.28)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {STARS.map((star, index) => (
        <circle
          key={index}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill={star.hue}
          className="anim-twinkle"
          style={{ ["--twinkle-duration" as string]: star.twinkle }}
        />
      ))}

      {EYES.map((eye, index) => (
        <circle
          key={index}
          cx={eye.x}
          cy={eye.y}
          r={2.2}
          fill="#7fe3e8"
          className="anim-blinkdot"
          style={{
            ["--blink-duration" as string]: index === 0 ? "3.4s" : "3.8s",
            filter: "drop-shadow(0 0 6px #7fe3e8)",
          }}
        />
      ))}
    </svg>
  );
}
