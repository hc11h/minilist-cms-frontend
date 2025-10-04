import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = ['/login', '/auth/success', '/', '/api/auth/google', '/api/auth/me'];
  const isPublicPath = publicPaths.includes(path);

  // Debug logging
  console.log('Middleware:', { 
    path, 
    hasToken: !!token, 
    tokenPreview: token ? token.substring(0, 10) + '...' : 'none',
    isPublicPath 
  });

  // Always allow auth/success page
  if (path === '/auth/success') {
    return NextResponse.next();
  }

  // For protected routes, check if token exists
  if (!isPublicPath) {
    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
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