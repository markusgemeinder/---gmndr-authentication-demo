// /app/components/Review/ReviewCard.js

'use client';

import { format } from 'date-fns';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import StarRating from '@/app/components/Common/StarRating';
import {
  CardContainer,
  IDLabel,
  Email,
  Note,
  CreatedUpdated,
  CardElementsWrapper,
} from '@/app/components/Review/ReviewStyles';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalInput,
  ModalParagraph,
} from '@/app/components/Common/ModalPopup';
import { maskEmail } from '@/utils/maskEmail';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function ReviewCard({ review, onDelete }) {
  const { _id, note, rating, createdAt, updatedAt, email } = review;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { data: session } = useSession();
  const { language } = useContext(LanguageContext);

  const isOwner = session && session.user.email === email;
  const isAdmin = session && session.user.role.includes('Admin');

  const showEmail = isOwner || isAdmin ? email : maskEmail(email);
  const showButtons = isOwner || isAdmin || _id.startsWith('demo-');

  async function handleDelete() {
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
        console.error(getText('review_card', 'error_deleting_review', language), error);
      }
    } else {
      alert(getText('review_card', 'alert_last_digits_mismatch', language));
    }
  }

  return (
    <>
      <CardContainer>
        <IDLabel>
          {getText('review_card', 'label_id', language)}: {_id}
        </IDLabel>
        <CardElementsWrapper>
          <Email>{showEmail}</Email>
          <Note>{note}</Note>
          <StarRating rating={rating} />
          <CreatedUpdated>
            {getText('review_card', 'label_created', language)}: {format(new Date(createdAt), 'dd.MM.yyyy (HH:mm:ss)')}
            <br />
            {getText('review_card', 'label_updated', language)}: {format(new Date(updatedAt), 'dd.MM.yyyy (HH:mm:ss)')}
          </CreatedUpdated>
          {showButtons && (
            <ButtonContainerHorizontal>
              <Button
                onClick={() => router.push(`/reviews/${_id}`)}
                bgColor='var(--color-button-blue)'
                hoverColor='var(--color-button-blue-hover)'
                color='var(--color-button-text)'>
                {getText('review_card', 'button_edit', language)}
              </Button>
              <Button
                onClick={() => setConfirmDelete(true)}
                bgColor='var(--color-button-red)'
                hoverColor='var(--color-button-red-hover)'
                color='var(--color-button-text)'>
                {getText('review_card', 'button_delete', language)}
              </Button>
            </ButtonContainerHorizontal>
          )}
        </CardElementsWrapper>
      </CardContainer>

      {confirmDelete && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              {getText('review_card', 'modal_confirm_delete', language)} – ID: {_id}
            </ModalHeader>
            <ModalParagraph>{getText('review_card', 'modal_delete_warning', language)}</ModalParagraph>
            <ModalInput
              type='text'
              placeholder={getText('review_card', 'placeholder_enter_last_digits', language)}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ButtonContainerHorizontal>
              <Button
                onClick={handleDelete}
                bgColor='var(--color-button-red)'
                hoverColor='var(--color-button-red-hover)'>
                {getText('review_card', 'button_confirm', language)}
              </Button>
              <Button
                onClick={() => setConfirmDelete(false)}
                bgColor='var(--color-button-grey)'
                hoverColor='var(--color-button-grey-hover)'>
                {getText('review_card', 'button_cancel', language)}
              </Button>
            </ButtonContainerHorizontal>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
