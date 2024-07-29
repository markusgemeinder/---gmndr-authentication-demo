'use client';

import { useSession, signIn } from 'next-auth/react';

const SessionStatus = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <p className='text-s text-gray-500'>
          Welcome, {session.user.name}. You are logged in as {session.user.role}.
        </p>
      ) : (
        <p className='text-s text-gray-500'>
          Welcome, unknown user.{' '}
          <a href='#' onClick={() => signIn()} className='text-blue-500 hover:underline'>
            Please login.
          </a>
        </p>
      )}
    </div>
  );
};

export default SessionStatus;
