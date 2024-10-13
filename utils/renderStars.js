// /utils/renderStars.js

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function renderStars(rating, setRating = null) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = rating >= i;
    const isHalf = rating > i - 1 && rating < i;

    stars.push(
      <div
        key={i}
        style={{
          cursor: setRating ? 'pointer' : 'default',
          color: isFilled ? 'var(--star-color)' : 'var(--star-empty-color)',
          display: 'inline-block',
        }}
        onClick={setRating ? () => setRating(i) : null}
        onMouseEnter={setRating ? () => setRating(i) : null}
        onMouseLeave={setRating ? () => setRating(rating) : null}>
        {isFilled ? <FaStar /> : isHalf ? <FaStarHalfAlt /> : <FaRegStar />}
      </div>
    );
  }
  return stars;
}
