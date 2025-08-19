import { NextRequest, NextResponse } from "next/server";
import { UNPROTECTED_PATHS } from "./utils/unprotectedpaths.util";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // ✅ allow only exact "/" match, others can use prefix matching
  const isUnprotected = UNPROTECTED_PATHS.some(
    (path) => path === pathname || (path !== "/" && pathname.startsWith(path))
  );

  if (isUnprotected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken");
  if (!token) {
    const loginURL = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config: { matcher: string[] } = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.well-known).*)",
  ],
};