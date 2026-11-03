import { NextRequest, NextResponse } from "next/server";

// Mesmo mapa usado por scripts/static-redirects.mjs para gerar os redirecionamentos do export estático.
import redirectMap from "@/content/redirects.json";

const publicFile = /\.[^/]+$/;
const redirects: Record<string, string> = redirectMap;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || publicFile.test(pathname)) return NextResponse.next();
  if (pathname === "/") return NextResponse.redirect(new URL("/pt", request.url));
  if (redirects[pathname]) return NextResponse.redirect(new URL(redirects[pathname], request.url));
  const locale = pathname.split("/")[1];
  if (locale !== "pt" && locale !== "en") return NextResponse.redirect(new URL(`/pt${pathname}`, request.url));
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
