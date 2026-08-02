import { NextRequest, NextResponse } from "next/server";

const publicFile = /\.[^/]+$/;
const legacy: Record<string, string> = {
  "/vinculo-tutoria": "/pt/vinculo-tutoria", "/blog": "/pt/blog",
  "/privacidade": "/pt/privacidade", "/termos": "/pt/termos",
  "/licencas": "/pt/licencas", "/changelog": "/pt/changelog",
  "/sobre": "/pt#sobre", "/suporte": "/pt/vinculo-tutoria#faq",
  "/downloads": "/pt/vinculo-tutoria#download", "/contato": "/pt/orcamento",
  "/produtos": "/pt#projetos", "/status": "/pt/status",
  "/lgpd": "/pt/privacidade",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || publicFile.test(pathname)) return NextResponse.next();
  if (pathname === "/") return NextResponse.redirect(new URL("/pt", request.url));
  if (legacy[pathname]) return NextResponse.redirect(new URL(legacy[pathname], request.url));
  if (pathname === "/pt/lgpd") return NextResponse.redirect(new URL("/pt/privacidade", request.url));
  if (pathname === "/en/lgpd" || pathname === "/en/privacidade") return NextResponse.redirect(new URL("/en/privacy", request.url));
  if (pathname === "/pt/privacy") return NextResponse.redirect(new URL("/pt/privacidade", request.url));
  if (pathname === "/pt/terms") return NextResponse.redirect(new URL("/pt/termos", request.url));
  if (pathname === "/pt/licenses") return NextResponse.redirect(new URL("/pt/licencas", request.url));
  if (pathname === "/en/termos") return NextResponse.redirect(new URL("/en/terms", request.url));
  if (pathname === "/en/licencas") return NextResponse.redirect(new URL("/en/licenses", request.url));
  if (pathname === "/pt/suporte") return NextResponse.redirect(new URL("/pt/status", request.url));
  if (pathname === "/en/support") return NextResponse.redirect(new URL("/en/status", request.url));
  const locale = pathname.split("/")[1];
  if (locale !== "pt" && locale !== "en") return NextResponse.redirect(new URL(`/pt${pathname}`, request.url));
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
