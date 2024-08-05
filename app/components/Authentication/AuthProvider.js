// /app/components/Authentication/AuthProvider.js

'use client';

import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
