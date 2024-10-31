// // /app/api/auth|[...nextauth]/route.js

// import NextAuth from 'next-auth';
// import { options } from '@/app/api/auth/[...nextauth]/options';

// const handler = NextAuth(options);
// export { handler as GET, handler as POST };

// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import { createOptions } from '@/app/api/auth/[...nextauth]/options';

export default async function handler(req, res) {
  const language = req.headers['accept-language'] || 'EN';

  return NextAuth(req, res, createOptions(language));
}
