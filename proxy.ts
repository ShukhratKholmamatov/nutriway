import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/site";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Next's generated metadata routes live at the root and have no file
 * extension, so they must be exempted explicitly — otherwise they get
 * locale-prefixed into a 404 (a broken favicon, manifest, etc.).
 */
const METADATA_ROUTE =
  /^\/(icon|apple-icon|opengraph-image|twitter-image|manifest)(\b|$)/;

/**
 * Sends locale-less traffic to a locale prefix. Prefers the visitor's
 * Accept-Language header, falling back to Uzbek.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    METADATA_ROUTE.test(pathname) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const preferred = accept.startsWith("ru") ? "ru" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
