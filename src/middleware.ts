import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {

  // run next-intl middleware
  const response = intlMiddleware(request);

  const pathname = request.nextUrl.pathname.replace(/^\/(en|bn)/, "");
  const accessToken = request.cookies.get("accessToken")?.value;

  const privateRoutes = ["/profile", "/user", "/vendor", "/post"];
  const isPrivate = privateRoutes.some(route => pathname.startsWith(route));

  if (isPrivate && !accessToken) {
    const loginUrl = new URL(`/auth/login?next=${pathname}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken) {
    try {
      const { role } = jwtDecode<{ role: "User" | "Vendor" }>(accessToken);

      if (pathname.startsWith("/vendor") && role !== "Vendor") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      if (pathname.startsWith("/user") && role !== "User") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      if (pathname === "/profile") {
        return NextResponse.redirect(
          new URL(role === "User" ? "/user" : "/vendor", request.url)
        );
      }

    } catch {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // IMPORTANT: return intl response so translations work
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};