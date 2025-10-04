import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;

  // Skip authentication check for these paths
  const publicPaths = ['/login', '/auth/success', '/'];
  const isPublicPath = publicPaths.includes(path);

  // If we're on the success page and don't have a token yet,
  // allow access temporarily
  if (path === '/auth/success' && !token) {
    return NextResponse.next();
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor/:path*",
    "/blogs/:path*",
    "/authors/:path*",
    "/api-keys/:path*",
  ],
}