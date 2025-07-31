import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard",'/operationTvk','/operationTvk/dashboard','/payments','/payment-usage','/campaign','/teamManagement',];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname === "/" ||
    pathname.startsWith("nextApi/api/auth") ||
    pathname.includes(".") ||
    !protectedPrefixes.some(prefix => pathname.startsWith(prefix))
  ) {
    return NextResponse.next();
  }

  // 2. Get JWT token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 3. Authorization for protected routes
  const section = pathname.split("/")[1].toLowerCase();
  const accessList = (token.pageAccess as string[]).map(p => p.toLowerCase());
  if (!accessList.includes(section)) {
    return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedPrefixes.map(prefix => `${prefix}/:path*`),
};

