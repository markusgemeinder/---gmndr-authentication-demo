import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Authentication Demo</h1>
      <Link href='/reviews' className='text-xl text-blue-500 hover:underline'>
        Go to Reviews
      </Link>
    </div>
  );
}
