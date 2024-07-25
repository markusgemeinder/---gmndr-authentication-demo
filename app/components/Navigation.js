'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <header className='bg-gray-800 text-white fixed top-0 left-0 w-full p-4 shadow-md z-10'>
      <nav className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <div className='text-xl font-bold'>MyApp</div>
          <div>
            {session ? (
              <button onClick={() => signOut()} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'>
                Logout
              </button>
            ) : (
              <button onClick={() => signIn()} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'>
                Login
              </button>
            )}
          </div>
        </div>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/' className='hover:underline'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/reviews' className='hover:underline'>
              Reviews
            </Link>
          </li>
          <li>
            <Link href='/api/reviews' className='hover:underline'>
              API
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
