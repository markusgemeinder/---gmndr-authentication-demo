import Link from 'next/link';

export default function Navigation() {
  return (
    <header className='bg-gray-800 text-white fixed top-0 left-0 w-full p-4 shadow-md z-10'>
      <nav className='container mx-auto flex justify-between items-center'>
        <div className='text-xl font-bold'>MyApp</div>
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
