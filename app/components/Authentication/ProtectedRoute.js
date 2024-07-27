'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-2xl font-bold'>Loading...</p>
      </div>
    );
  }

  return session ? children : null;
};

export default ProtectedRoute;
