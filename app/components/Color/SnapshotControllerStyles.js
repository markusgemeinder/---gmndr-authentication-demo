// /app/components/Color/SnapshotControllerStyles.js

import styled from 'styled-components';

// Styled Components
export const SnapshotContainer = styled.div`
  position: fixed;
  top: 4.7rem;
  right: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  z-index: 4;

  @media (min-width: 768px) and (min-height: 768px) {
    top: 7rem;
    right: 2rem;
  }
`;

export const SnapshotButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isSnapshotLimitReached'].includes(prop),
})`
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.4rem;
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  background-color: ${({ isSnapshotLimitReached }) =>
    isSnapshotLimitReached ? 'var(--color-red-400)' : 'var(--color-secondary-550)'};
  width: 60px;
  height: 48px;
  padding: 0.6rem;

  &:hover {
    background-color: ${({ isSnapshotLimitReached }) =>
      isSnapshotLimitReached ? 'var(--color-red-500)' : 'var(--color-secondary-700)'};
  }

  @media (min-width: 768px) {
    padding: 0.8rem;
    width: 72px;
    height: 56px;
  }

  svg {
    font-size: 1.8rem;
    color: var(--color-white);
  }
`;

export const UndoButton = styled(SnapshotButton)`
  background-color: var(--color-secondary-250);

  &:hover {
    background-color: var(--color-secondary-350);
  }
`;

export const RedoButton = styled(SnapshotButton)`
  background-color: var(--color-secondary-250);

  &:hover {
    background-color: var(--color-secondary-350);
  }
`;

export const DeleteButton = styled.button`
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 60px;
  height: 48px;
  padding: 0.6rem;
  background-color: var(--color-secondary-250);

  &:hover {
    background-color: var(--color-secondary-350);
  }

  svg {
    font-size: 1.2rem;
    color: var(--color-white);
  }

  @media (min-width: 768px) and (min-height: 768px) {
    padding: 0.8rem;
    width: 72px;
    height: 56px;
    svg {
      font-size: 1.8rem;
      color: var(--color-white);
    }
  }
`;

export const ButtonText = styled.span`
  color: var(--color-white);
  font-size: 0.8rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* top: 0;
  left: 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

export const ModalContent = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 90%;

  @media (min-width: 768px) and (min-height: 768px) {
    width: 80%;
    max-width: 30rem;
  }
`;

export const ModalHeader = styled.h3`
  margin-bottom: 0.6rem;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;

export const ModalButton = styled.button`
  color: var(--color-white);
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  height: 48px;
  max-width: 120px;
  background-color: var(--color-primary-500);
  &:hover {
    background-color: var(--color-primary-600);
  }

  @media (min-width: 768px) and (min-height: 768px) {
    width: 100%;
    max-width: 120px;
  }
`;

export const ModalConfirmButton = styled(ModalButton)`
  /* background-color: var(--color-primary-500);
  &:hover {
    background-color: var(--color-primary-600);
  } */
`;

export const ModalCancelButton = styled(ModalButton)`
  background-color: var(--color-secondary-300);
  &:hover {
    background-color: var(--color-secondary-500);
  }
`;
