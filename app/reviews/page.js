import Link from 'next/link';

export default function Reviews() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-4'>Reviews</h1>
      <Link href='/' className='text-xl text-blue-500 hover:underline'>
        Go to Home
      </Link>
    </div>
  );
}
