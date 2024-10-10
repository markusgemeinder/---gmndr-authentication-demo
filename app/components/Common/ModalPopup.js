// /app/components/Common/ModalPopup.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button'; // Import des Button-Components

// Keyframes for blinking animation (if needed in future)
const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Styled component for blinking text (if needed)
export const BlinkingText = styled.p`
  animation: ${blinkAnimation} 1s infinite;
`;

// Styled component for modal overlay
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--color-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* Ensure it is above other content */
`;

// Styled component for modal content
export const ModalContent = styled.div`
  background-color: var(--color-modal-background);
  padding: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Styled component for modal header
export const ModalHeader = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-modal-header);
`;

// Styled component for modal button container
export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// ModalPopup component with message, button and dynamic states
const ModalPopup = ({ message, onOkClick, isSending }) => (
  <ModalOverlay>
    <ModalContent>
      <ModalHeader>{message}</ModalHeader>
      <ModalButtonContainer>
        {!isSending && (
          <Button
            onClick={onOkClick}
            bgColor='var(--color-button-ok)'
            hoverColor='var(--color-button-ok-hover)'
            color='var(--color-button-text)'>
            OK
          </Button>
        )}
      </ModalButtonContainer>
    </ModalContent>
  </ModalOverlay>
);

export default ModalPopup;
