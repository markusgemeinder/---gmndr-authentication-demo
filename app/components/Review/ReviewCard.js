'use client';

import { format } from 'date-fns';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';

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

const Username = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Note = styled.div`
  color: #1f2937;
  margin-bottom: 1rem;
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

const ModalParagraph = styled.p`
  margin-bottom: 1rem;
`;

const ModalInput = styled.input`
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} style={{ color: '#fbbf24' }} />);
    } else if (rating > i - 1) {
      stars.push(<FaStarHalfAlt key={i} style={{ color: '#fbbf24' }} />);
    } else {
      stars.push(<FaRegStar key={i} style={{ color: '#d1d5db' }} />);
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
        if (_id.startsWith('demo-')) {
          const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
          const updatedReviews = storedReviews.filter((r) => r._id !== _id);
          sessionStorage.setItem('reviews', JSON.stringify(updatedReviews));
          if (onDelete) onDelete();
        } else {
          await fetch(`/api/reviews/${_id}`, { method: 'DELETE' });
          if (onDelete) onDelete();
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    } else {
      alert('The last 4 digits do not match. Please try again.');
    }
  };

  return (
    <CardContainer>
      <IDLabel>ID: {_id}</IDLabel>
      <Username>{username}</Username>
      <Note>{note}</Note>
      <StarsContainer>{renderStars(rating)}</StarsContainer>
      <CreatedUpdated>
        Created: {format(new Date(createdAt), 'dd.MM.yyyy (HH:mm:ss)')} | Updated:{' '}
        {format(new Date(updatedAt), 'dd.MM.yyyy (HH:mm:ss)')}
      </CreatedUpdated>
      <ButtonContainer>
        <Button
          onClick={() => router.push(`/reviews/${_id}`)}
          bgColor='var(--color-button-edit)'
          hoverColor='var(--color-button-edit-hover)'
          color='var(--color-button-text)'>
          Edit
        </Button>
        <Button
          onClick={() => setConfirmDelete(true)}
          bgColor='var(--color-button-delete)'
          hoverColor='var(--color-button-delete-hover)'
          color='var(--color-button-text)'>
          Delete
        </Button>
      </ButtonContainer>
      {confirmDelete && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Confirm Deletion Object ID {_id}</ModalHeader>
            <ModalParagraph>
              Are you sure you want to delete? Please enter the last 4 digits of the ID to confirm.
            </ModalParagraph>
            <ModalInput
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Last 4 digits'
              maxLength={4}
            />
            <ModalButtonContainer>
              <Button
                onClick={handleDelete}
                bgColor='var(--color-button-delete)'
                hoverColor='var(--color-button-delete-hover)'
                color='var(--color-button-text)'>
                Confirm
              </Button>
              <Button
                onClick={() => setConfirmDelete(false)}
                bgColor='var(--color-button)'
                hoverColor='var(--color-button-hover)'
                color='var(--color-button-text)'>
                Cancel
              </Button>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </CardContainer>
  );
}
