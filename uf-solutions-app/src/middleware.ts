import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * src/middleware.ts
 *
 * IMPORTANT: this file must live at `src/middleware.ts` (a sibling of
 * `src/app/`), NOT inside `src/app/`. Next.js only recognizes middleware
 * at the project root or src root — a copy inside `app/` is silently
 * ignored and none of this runs.
 */

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const isStudio = request.nextUrl.pathname.startsWith("/studio");

  // Sanity Studio needs a meaningfully looser policy: it uses WebSockets
  // for real-time collaboration and its editor relies on patterns
  // (inline scripts/styles, eval-adjacent code) that the strict public
  // -site policy below would break. Keep the two policies separate
  // rather than trying to find one set of rules that satisfies both.
  const cspHeader = isStudio
    ? `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://cdn.sanity.io;
      connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io wss://*.sanity.io;
      font-src 'self' data:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
    `
        .replace(/\s{2,}/g, " ")
        .trim()
    : `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://cdn.sanity.io;
      connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io;
      font-src 'self' data:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `
        .replace(/\s{2,}/g, " ")
        .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", isStudio ? "SAMEORIGIN" : "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Isolates this page's window from other windows/tabs it opens (e.g. a
  // payment or OAuth popup), so those windows can't reach back into this
  // page via window.opener. "same-origin" is the strict option; use
  // "same-origin-allow-popups" instead if you rely on window.opener for
  // something like a same-site popup flow and this breaks it.
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  // NOTE on Trusted Types (require-trusted-types-for 'script'):
  // deliberately not enabled yet. It can break third-party scripts or
  // framework internals that assign to innerHTML/document.write outside
  // your control. If you want this, stage it first in report-only mode
  // via a separate `Content-Security-Policy-Report-Only` header with a
  // `report-uri`/`report-to` target, watch for violations in real
  // traffic for a while, define an explicit trustedTypes policy for any
  // legitimate sink usage, and only then move it into the enforced
  // Content-Security-Policy header above.

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (.svg, .png, etc.)
     */
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};