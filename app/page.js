import SessionStatus from './components/SessionStatus';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-top min-h-screen py-2 mt-20'>
      <h1 className='text-4xl font-bold mb-4'>#GMNDR Authentication Demo</h1>
      <SessionStatus />
    </div>
  );
}
