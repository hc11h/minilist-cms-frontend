import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;


  const publicPaths = ['/login', '/auth/success', '/', '/api/auth/google', '/api/auth/me'];
  const isPublicPath = publicPaths.includes(path);


  if (path === '/auth/success') {
   
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    
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