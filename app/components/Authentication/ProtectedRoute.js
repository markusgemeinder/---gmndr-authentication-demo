// /app/components/Authentication/ProtectedRoute.js

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingAnimation from '../Common/LoadingAnimation';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingAnimation />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
