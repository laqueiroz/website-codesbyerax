import type { MetadataRoute } from "next";

import { showBlogPosts, siteConfig } from "@/content/site";

/**
 * Rotas públicas indexáveis.
 * `/blog` só entra quando houver artigos — ver `showBlogPosts`.
 */
const ROUTES: readonly { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/produtos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/downloads", priority: 0.9, changeFrequency: "weekly" },
  { path: "/suporte", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contato", priority: 0.6, changeFrequency: "yearly" },
  { path: "/changelog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/status", priority: 0.4, changeFrequency: "weekly" },
  { path: "/sobre", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacidade", priority: 0.3, changeFrequency: "yearly" },
  { path: "/termos", priority: 0.3, changeFrequency: "yearly" },
  { path: "/licencas", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = showBlogPosts
    ? [...ROUTES, { path: "/blog", priority: 0.5, changeFrequency: "weekly" as const }]
    : ROUTES;

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
