import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = await headers();
  const cookie = headersList.get("cookie");
  const authorization = headersList.get("authorization");
  

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.substring(7);
    if (token) {
      return NextResponse.json({ authenticated: true, token: token });
    }
  }
  

  if (cookie && cookie.includes("authToken")) {
    const authTokenMatch = cookie.match(/authToken=([^;]+)/);
    if (authTokenMatch && authTokenMatch[1]) {
      return NextResponse.json({ authenticated: true, token: authTokenMatch[1] });
    }
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}