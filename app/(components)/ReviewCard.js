// 'use client';

// import { format } from 'date-fns';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// // Helper function to render stars
// const renderStars = (rating) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (rating >= i) {
//       stars.push(<FaStar key={i} className='text-yellow-500' />);
//     } else if (rating > i - 1) {
//       stars.push(<FaStarHalfAlt key={i} className='text-yellow-500' />);
//     } else {
//       stars.push(<FaRegStar key={i} className='text-gray-400' />);
//     }
//   }
//   return stars;
// };

// export default function ReviewCard({ review }) {
//   const { _id, username, note, rating, createdAt, updatedAt } = review;
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const router = useRouter();

//   const handleDelete = async () => {
//     if (inputValue === _id.slice(-4)) {
//       // Proceed with delete request
//       await fetch(`/api/reviews/${_id}`, { method: 'DELETE' });
//       setConfirmDelete(false); // Close the modal
//       router.push('/reviews'); // Redirect to the reviews page
//     } else {
//       alert('The last 4 digits do not match. Please try again.');
//     }
//   };

//   return (
//     <div className='bg-gray-50 shadow-md rounded-lg overflow-hidden p-4 mb-4 relative'>
//       {/* Object ID in the top-right corner */}
//       <div className='absolute top-2 right-2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded'>ID: {_id}</div>

//       <div className='text-lg font-bold mb-2'>{username}</div>
//       <div className='text-gray-800 mb-2'>{note}</div>
//       <div className='flex items-center mb-4'>{renderStars(rating)}</div>
//       <div className='text-xs text-gray-400'>
//         Created: {format(new Date(createdAt), 'dd.MM.yyyy (HH:mm:ss)')} | Updated:{' '}
//         {format(new Date(updatedAt), 'dd.MM.yyyy (HH:mm:ss)')}
//       </div>

//       <div className='flex gap-2 mt-6'>
//         {/* Edit button */}
//         <a href={`/reviews/${_id}`} className='bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'>
//           Edit
//         </a>

//         {/* Delete button */}
//         <button
//           onClick={() => setConfirmDelete(true)}
//           className='bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600'>
//           Delete
//         </button>
//       </div>

//       {/* Delete confirmation modal */}
//       {confirmDelete && (
//         <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50'>
//           <div className='bg-white p-6 rounded shadow-lg'>
//             <h2 className='text-lg font-bold mb-4'>Confirm Deletion Object ID {_id}</h2>
//             <p className='mb-4'>
//               Are you sure you want to delete? Please enter the last 4 digits of the ID to confirm.
//             </p>
//             <input
//               type='text'
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className='border border-gray-300 p-2 rounded mb-4 w-full'
//               placeholder='Last 4 digits'
//               maxLength={4}
//             />
//             <div className='flex gap-4'>
//               <button
//                 onClick={handleDelete}
//                 className='bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600'>
//                 Confirm
//               </button>
//               <button
//                 onClick={() => setConfirmDelete(false)}
//                 className='bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400'>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { format } from 'date-fns';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export default function ReviewCard({ review, onDelete }) {
  const { _id, username, note, rating, createdAt, updatedAt } = review;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    if (inputValue === _id.slice(-4)) {
      try {
        await fetch(`/api/reviews/${_id}`, { method: 'DELETE' });
        if (onDelete) onDelete(); // Call the onDelete callback after deletion
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    } else {
      alert('The last 4 digits do not match. Please try again.');
    }
  };

  return (
    <div className='bg-gray-50 shadow-md rounded-lg overflow-hidden p-4 mb-4 relative'>
      <div className='absolute top-2 right-2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded'>ID: {_id}</div>

      <div className='text-lg font-bold mb-2'>{username}</div>
      <div className='text-gray-800 mb-4'>{note}</div>
      <div className='flex items-center mb-4'>{renderStars(rating)}</div>
      <div className='text-xs text-gray-400'>
        Created: {format(new Date(createdAt), 'dd.MM.yyyy (HH:mm:ss)')} | Updated:{' '}
        {format(new Date(updatedAt), 'dd.MM.yyyy (HH:mm:ss)')}
      </div>

      <div className='flex gap-2 mt-4'>
        <a href={`/reviews/${_id}`} className='bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'>
          Edit
        </a>

        <button
          onClick={() => setConfirmDelete(true)}
          className='bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600'>
          Delete
        </button>
      </div>

      {confirmDelete && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h2 className='text-lg font-bold mb-4'>Confirm Deletion Object ID {_id}</h2>
            <p className='mb-4'>
              Are you sure you want to delete? Please enter the last 4 digits of the ID to confirm.
            </p>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='border border-gray-300 p-2 rounded mb-4 w-full'
              placeholder='Last 4 digits'
              maxLength={4}
            />
            <div className='flex gap-4'>
              <button
                onClick={handleDelete}
                className='bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600'>
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className='bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
