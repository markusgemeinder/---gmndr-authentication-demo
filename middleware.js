// // middleware.js

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log('Middleware - Pathname:', pathname);
  console.log('Middleware - Token:', token);

  // Allow requests for:
  // 1. Next-auth session & provider fetching
  // 2. Authentication pages
  // 3. Password reset pages
  // 4. Paths with an existing token
  if (
    pathname.includes('/api/auth') ||
    pathname.includes('/api/users') ||
    pathname.startsWith('/(auth)/reset-password') ||
    pathname.startsWith('/(auth)/') ||
    token
  ) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated and not on auth pages
  if (!token && !pathname.startsWith('/(auth)/')) {
    return NextResponse.redirect(new URL('/(auth)/login', req.url));
  }
}

// Specify the paths to be protected
export const config = {
  matcher: [
    '/api/:path*',
    '/reviews/:path*',
    '/(auth)/forgot-password',
    '/(auth)/login',
    '/(auth)/reset-password/:token',
    '/(auth)/signup',
  ],
};

// // Specify the paths to be protected
// export const config = {
//   matcher: [
//     '/api/:path*',
//     '/reviews/:path*',
//     // Add other protected paths if needed
//   ],
