import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = ['/login', '/auth/success', '/', '/api/auth/google', '/api/auth/me'];
  const isPublicPath = publicPaths.includes(path);


  if (path === '/auth/success') {
    return NextResponse.next();
  }

  if (!isPublicPath) {
    if (!token) {
     
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
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