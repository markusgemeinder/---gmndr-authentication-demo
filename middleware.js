import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow the request if:
  // 1. It's a request for next-auth session & provider fetching
  // 2. It's a request for register
  // 3. the token exists
  if (pathname.includes('/api/auth') || pathname.includes('/api/users') || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have a token
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Specify the paths to be protected
export const config = {
  matcher: ['/api/:path*'],
};
