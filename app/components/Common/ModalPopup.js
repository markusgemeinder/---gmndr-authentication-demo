// /app/components/Common/ModalPopup.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';

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
  font-size: 1rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color-input-border);
  width: 100%;
  text-align: center;
  color: var(--color-input-text);
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
