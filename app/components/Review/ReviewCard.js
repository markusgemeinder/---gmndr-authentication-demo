// /app/components/Review/ReviewCard.js

'use client';

import { format } from 'date-fns';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';
import { useSession } from 'next-auth/react';

// Styled components
const CardContainer = styled.div`
  background-color: #f9fafb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const IDLabel = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const Email = styled.div`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const Note = styled.div`
  color: #1f2937;
  margin-bottom: 1rem;
  white-space: pre-wrap; /* Ensure whitespace and newlines are preserved */
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const CreatedUpdated = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(31, 41, 55, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ModalMessage = styled.p`
  margin-bottom: 1.5rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = rating >= i;
    const isHalf = rating > i - 1 && rating < i;
    stars.push(
      <div key={i} style={{ color: isFilled ? '#fbbf24' : '#e5e7eb' }}>
        {isFilled ? <FaStar /> : isHalf ? <FaStarHalfAlt /> : <FaRegStar />}
      </div>
    );
  }
  return stars;
};

export default function ReviewCard({ review, onEdit }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`/api/reviews/${review._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.refresh();
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const isUserReview = session?.user.email === review.email; // Vergleiche email

  return (
    <CardContainer>
      <IDLabel>ID: {review._id}</IDLabel>
      <Email>Email: {review.email}</Email> {/* Username entfernt */}
      <StarsContainer>{renderStars(review.rating)}</StarsContainer>
      <Note>{review.note}</Note>
      <CreatedUpdated>
        Created: {format(new Date(review.createdAt), 'PPP p')}
        {review.createdAt !== review.updatedAt && (
          <>
            <br />
            Updated: {format(new Date(review.updatedAt), 'PPP p')}
          </>
        )}
      </CreatedUpdated>
      {isUserReview && (
        <ButtonContainer>
          <Button
            onClick={() => onEdit(review)}
            bgColor='var(--color-button-edit)'
            hoverColor='var(--color-button-edit-hover)'>
            Edit
          </Button>
          <Button
            onClick={handleDeleteClick}
            bgColor='var(--color-button-delete)'
            hoverColor='var(--color-button-delete-hover)'>
            Delete
          </Button>
        </ButtonContainer>
      )}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalMessage>Are you sure you want to delete this review?</ModalMessage>
            <ModalActions>
              <Button
                onClick={handleDelete}
                bgColor='var(--color-button-delete)'
                hoverColor='var(--color-button-delete-hover)'>
                Yes, delete it
              </Button>
              <Button
                onClick={handleCancel}
                bgColor='var(--color-button-cancel)'
                hoverColor='var(--color-button-cancel-hover)'>
                Cancel
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </CardContainer>
  );
}
