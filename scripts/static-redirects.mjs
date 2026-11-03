/**
 * O GitHub Pages não executa o middleware, então no export estático cada
 * endereço antigo vira uma página HTML que redireciona na hora (meta refresh).
 * Rotas com o idioma trocado (ex.: /en/privacidade) também são geradas pelo
 * Next como cópias completas; aqui elas são sobrescritas pelo redirecionamento.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.env.STATIC_EXPORT !== "1") process.exit(0);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://codesbyerax.com.br").replace(/\/+$/, "");
const redirects = JSON.parse(fs.readFileSync(path.join(root, "src/content/redirects.json"), "utf8"));

if (!fs.existsSync(outDir)) {
  console.error("static-redirects: pasta out/ não encontrada — rode o build com STATIC_EXPORT=1.");
  process.exit(1);
}

// O export usa trailingSlash, então "/pt#sobre" vira "/pt/#sobre".
function withSlash(target) {
  const [pathname, hash] = target.split("#");
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

const escape = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const [from, to] of Object.entries(redirects)) {
  const target = escape(withSlash(to));
  const canonical = escape(`${siteUrl}${withSlash(to).split("#")[0]}`);
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=${target}">
<link rel="canonical" href="${canonical}">
<title>Redirecionando… · Codes by Erax</title>
</head>
<body style="background:#040309;color:#edeaf6;font-family:system-ui,sans-serif;padding:48px 16px">
<p>Esta página mudou de endereço. <a href="${target}" style="color:#b69cf0">Continuar</a></p>
</body>
</html>
`;
  const dir = path.join(outDir, from.replace(/^\/+/, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  // Remove o payload RSC da cópia duplicada, se o Next tiver gerado um.
  fs.rmSync(path.join(dir, "index.txt"), { force: true });
}

console.log(`static-redirects: ${Object.keys(redirects).length} redirecionamentos gerados em out/.`);
