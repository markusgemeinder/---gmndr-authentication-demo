// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;

//   // Allow the request if:
//   // 1. It's a request for next-auth session & provider fetching
//   // 2. It's a request for auth pages (login, signup, forgot-password, reset-password)
//   // 3. the token exists
//   if (
//     pathname.includes('/api/auth') ||
//     pathname.includes('/api/users') ||
//     pathname.startsWith('/(authentication)') ||
//     token
//   ) {
//     return NextResponse.next();
//   }

//   // Redirect them to login if they don't have a token and are not accessing auth pages
//   if (!token && !pathname.startsWith('/auth')) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }
// }

// // Specify the paths to be protected
// export const config = {
//   matcher: [
//     '/api/:path*',
//     '/reviews/:path*', // Example path for other protected routes
//     // Add other protected paths here
//   ],
// };

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow requests for:
  // 1. Next-auth session & provider fetching
  // 2. Authentication pages
  // 3. Paths with an existing token
  if (pathname.includes('/api/auth') || pathname.includes('/api/users') || pathname.startsWith('/(auth)/') || token) {
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
    // Add other protected paths if needed
  ],
};
