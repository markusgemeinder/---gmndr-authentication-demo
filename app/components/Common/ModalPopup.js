// /app/components/Common/ModalPopup.js

import styled, { keyframes } from 'styled-components';

// Keyframes for blinking animation
const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Styled component for blinking text
export const BlinkingText = styled.p`
  animation: ${blinkAnimation} 1s infinite;
`;

// Styled component for modal overlay
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-modal); /* Use color variable from globals.css */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* Ensure it is above other content */
`;

// Styled component for modal content
export const ModalContent = styled.div`
  background-color: var(--color-modal-background); /* Use color variable from globals.css */
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
  color: var(--color-header); /* Use color variable from globals.css */
`;

// Styled component for modal paragraph
export const ModalParagraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--color-text); /* Use color variable from globals.css */
  text-align: center;
`;

// Styled component for modal input
export const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-input-border); /* Use color variable from globals.css */
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--color-text); /* Use color variable from globals.css */
  background-color: var(--color-input-background); /* Use color variable from globals.css */
`;

// Styled component for modal button container
export const ModalButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
