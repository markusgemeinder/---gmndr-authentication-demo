'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-2xl font-bold blinking-text'>Loading...</p>
      </div>
    );
  }

  if (status === 'authenticated') {
    return children;
  }

  return null;
};

export default ProtectedRoute;
