import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Simple password gate for the admin dashboard.
 * Checks for an "admin-auth" cookie. If missing, redirects to /login.
 *
 * In Phase 9 this will be replaced with proper Firebase Auth verification
 * to confirm the user has an admin role in Firestore.
 */
export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/login";
  const authCookie = request.cookies.get("admin-auth");

  if (!authCookie && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
