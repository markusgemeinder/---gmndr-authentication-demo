// /components/Common/StarRating.js

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const StarContainer = styled.div`
  display: inline-block;
  font-size: 30px;
  color: ${(props) => (props.filled ? 'var(--star-color)' : 'var(--star-empty-color)')};
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  margin-right: 0.25rem;

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) and (min-height: 768px) {
    font-size: 24px;
  }
`;

const StarRatingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.2rem 0;

  &:focus-within ${StarContainer} {
    color: var(--star-focus-color); /* All stars highlighted when focused */
  }
`;

export default function StarRating({ rating, setRating = null }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (index) => {
    if (setRating) setRating(index);
  };

  const handleMouseEnter = (index) => {
    if (setRating) setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (setRating) setHoverRating(0);
  };

  const handleKeyDown = (event, index) => {
    if (!setRating) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        setRating(index);
        break;
      case 'ArrowRight':
        if (rating < 5) setRating(rating + 1);
        break;
      case 'ArrowLeft':
        if (rating > 0) setRating(rating - 1);
        break;
      default:
        break;
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = (hoverRating || rating) >= i;
      const isHalf = (hoverRating || rating) > i - 1 && (hoverRating || rating) < i;

      stars.push(
        <StarContainer
          key={i}
          filled={isFilled}
          clickable={!!setRating}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          tabIndex={0}
          role='radio'
          aria-checked={rating === i}
          onKeyDown={(event) => handleKeyDown(event, i)}>
          {isFilled ? <FaStar /> : isHalf ? <FaStarHalfAlt /> : <FaRegStar />}
        </StarContainer>
      );
    }
    return stars;
  };

  return (
    <StarRatingWrapper role='radiogroup' aria-label='Star rating'>
      {renderStars()}
    </StarRatingWrapper>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func,
};
