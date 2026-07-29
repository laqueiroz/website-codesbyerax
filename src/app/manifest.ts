import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#040309",
    theme_color: "#040309",
    lang: "pt-BR",
    icons: [
      {
        src: "/assets/logo-mark.png",
        sizes: "539x491",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
