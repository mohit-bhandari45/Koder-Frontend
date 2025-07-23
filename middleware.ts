import { NextRequest, NextResponse } from "next/server";

const UNPROTECTED_PATHS = ["/", "/auth/login", "/auth/signup", "code-editor"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (UNPROTECTED_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const token = request.cookies.get("accessToken");

    if (!token) {
        const loginURL = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginURL);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.well-known).*)',
    ],
};