/**
 * Content Security Policy compartilhada.
 *
 * Usada em dois lugares:
 * - `next.config.ts` → cabeçalho HTTP, em hospedagens com servidor (Vercel etc.);
 * - `app/layout.tsx` → `<meta http-equiv>`, porque o GitHub Pages serve o export
 *   estático sem permitir cabeçalhos personalizados. Sem a meta tag, o site
 *   publicado ficaria sem CSP nenhuma.
 *
 * `frame-ancestors` não funciona em meta tag (o navegador ignora), por isso só
 * entra na versão de cabeçalho. No Pages, a proteção contra clickjacking fica
 * a cargo do script de frame-busting no layout.
 */

const isDev = process.env.NODE_ENV === "development";

const baseDirectives = [
  "default-src 'self'",
  // 'unsafe-inline' é exigido pelos estilos que React/Framer Motion injetam.
  "style-src 'self' 'unsafe-inline'",
  // O Next injeta um script inline de bootstrap; 'unsafe-eval' só em dev (HMR).
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // Formulários de orçamento e feedback enviam direto ao Web3Forms.
  isDev
    ? "connect-src 'self' https://api.web3forms.com ws:"
    : "connect-src 'self' https://api.web3forms.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
];

/** Versão para cabeçalho HTTP (inclui frame-ancestors). */
export const cspHeader = [...baseDirectives, "frame-ancestors 'none'"].join("; ");

/** Versão para `<meta http-equiv>` (sem diretivas que a meta tag ignora). */
export const cspMeta = baseDirectives.join("; ");
