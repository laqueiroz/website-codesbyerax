import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Fontes auto-hospedadas por `next/font` — sem requisição ao Google Fonts em
 * runtime, sem FOUT e sem layout shift (o fallback é ajustado por métrica).
 */

export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const fontVariables = `${cormorant.variable} ${plexSans.variable} ${plexMono.variable}`;
