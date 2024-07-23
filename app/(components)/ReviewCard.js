import { format } from 'date-fns';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Helper function to render stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className='text-yellow-500' />);
    } else if (rating > i - 1) {
      stars.push(<FaStarHalfAlt key={i} className='text-yellow-500' />);
    } else {
      stars.push(<FaRegStar key={i} className='text-gray-400' />);
    }
  }
  return stars;
};

export default function ReviewCard({ review }) {
  const { username, email, note, rating, createdAt, updatedAt } = review;

  return (
    <div className='bg-gray-50 shadow-md rounded-lg overflow-hidden p-4 mb-4'>
      <div className='text-lg font-bold mb-2'>{username}</div>
      <div className='text-sm text-gray-600 mb-2'>{email}</div>
      <div className='text-gray-800 mb-4'>{note}</div>
      <div className='flex items-center mb-2'>{renderStars(rating)}</div>
      <div className='text-xs text-gray-500'>
        Created: {format(new Date(createdAt), 'dd.MM.yyyy (HH:mm:ss)')} | Updated:{' '}
        {format(new Date(updatedAt), 'dd.MM.yyyy (HH:mm:ss)')}
      </div>
    </div>
  );
}
