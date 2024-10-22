// /components/Common/StarRating.js

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StarContainer = styled.div`
  display: inline-block;
  font-size: 30px;
  color: ${(props) => (props.filled ? 'var(--star-color)' : 'var(--star-empty-color)')};
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  margin-right: 0.25rem;

  @media (min-width: 768px) and (min-height: 768px) {
    font-size: 24px;
  }
`;

const StarRatingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
`;

export default function StarRating({ rating, setRating = null }) {
  const handleStarClick = (index) => {
    if (setRating) setRating(index);
  };

  const handleMouseEnter = (index) => {
    if (setRating) setRating(index);
  };

  const handleMouseLeave = () => {
    if (setRating) setRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = rating >= i;
      const isHalf = rating > i - 1 && rating < i;

      stars.push(
        <StarContainer
          key={i}
          filled={isFilled}
          clickable={!!setRating}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}>
          {isFilled ? <FaStar /> : isHalf ? <FaStarHalfAlt /> : <FaRegStar />}
        </StarContainer>
      );
    }
    return stars;
  };

  return <StarRatingWrapper>{renderStars()}</StarRatingWrapper>;
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func,
};
