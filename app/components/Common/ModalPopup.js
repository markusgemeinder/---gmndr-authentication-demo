// /app/components/Common/ModalPopup.js

import styled, { keyframes } from 'styled-components';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export const BlinkingText = styled.p`
  animation: ${blinkAnimation} 1s infinite;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--color-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  padding: 1rem;

  /* Für kleinere Geräte: Setze ein wenig Abstand vom Rand */
  @media (max-width: 767px) {
    padding: 2rem;
  }
`;

export const ModalContent = styled.div`
  background-color: var(--color-background-light);
  padding: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 90%;
  max-width: 600px;

  @media (min-width: 768px) {
    width: 80%;
    max-width: 30rem;
  }

  /* Für kleine Bildschirme - breitere Viewports */
  @media (min-width: 600px) and (max-width: 1024px) {
    width: 85%;
    max-width: 26rem;
  }

  /* Für sehr kleine Bildschirme */
  @media (max-width: 600px) {
    padding: 1rem;
    width: 95%;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0.6rem;
  text-align: center;
  color: var(--color-modal-header);

  /* Anpassung für kleinere Bildschirme */
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

export const ModalParagraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-modal-paragraph);

  /* Anpassung für kleinere Bildschirme */
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  color: var(--color-modal-text);

  /* Anpassung für kleinere Bildschirme */
  @media (max-width: 767px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`;

const ModalPopup = ({ message, onOkClick, showOkButton }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>{message}</ModalHeader>
        {showOkButton && (
          <ButtonContainerHorizontal>
            <Button
              onClick={onOkClick}
              bgColor='var(--color-button-confirmation)'
              hoverColor='var(--color-button-confirmation-hover)'
              color='var(--color-button-text)'>
              OK
            </Button>
          </ButtonContainerHorizontal>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalPopup;
