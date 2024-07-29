'use client';

import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import ReviewForm from '@/app/components/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';

export default function CreatePage() {
  const router = useRouter();

  const handleSave = () => {
    router.push('/reviews');
  };

  const handleCancel = () => {
    router.push('/reviews');
  };

  return (
    <ProtectedRoute>
      <main className='p-4'>
        <h1 className='text-2xl font-bold mb-1'>Review erstellen</h1>
        <SessionStatus />
        <ReviewForm onSave={handleSave} onCancel={handleCancel} />
      </main>
    </ProtectedRoute>
  );
}
