'use client';

import ReviewForm from '@/app/(components)/ReviewForm';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();

  const handleSave = () => {
    router.push('/reviews');
  };

  const handleCancel = () => {
    router.push('/reviews');
  };

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Create Review</h1>
      <ReviewForm onSave={handleSave} onCancel={handleCancel} />
    </main>
  );
}
