import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");
  const protectedRoutes = ["/user/register", "/user/profile"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/register", "/user/profile"],
};
