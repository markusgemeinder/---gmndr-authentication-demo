// /app/components/Common/ModalPopup.js

import styled, { keyframes } from 'styled-components';
import Button, { ButtonContainerHorizontal } from '@/app/components/Common/Button';

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
`;

export const ModalContent = styled.div`
  background-color: var(--color-modal-background);
  padding: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;

  @media (min-width: 768px) and (min-height: 768px) {
    width: 80%;
    max-width: 30rem;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-modal-header);
`;

export const ModalParagraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-modal-paragraph);
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  color: var(--color-text-medium);
`;

const ModalPopup = ({ message, onOkClick, showOkButton }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>{message}</ModalHeader>
        <ButtonContainerHorizontal>
          {showOkButton && (
            <Button
              onClick={onOkClick}
              bgColor='var(--color-button-ok)'
              hoverColor='var(--color-button-ok-hover)'
              color='var(--color-button-text)'>
              OK
            </Button>
          )}
        </ButtonContainerHorizontal>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalPopup;
