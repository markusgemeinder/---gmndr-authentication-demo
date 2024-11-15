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
  background-color: ${({ isSnapshotLimitReached }) => (isSnapshotLimitReached ? '#fd9696' : '#5a5a5a')};
  width: 60px;
  height: 48px;
  padding: 0.6rem;

  &:hover {
    background-color: ${({ isSnapshotLimitReached }) =>
      isSnapshotLimitReached
        ? '#ff7070'
        : '#3a3a3a'}; /* Ändere die Hover-Farbe auf ein helleres Rot, wenn Limit erreicht */
  }

  @media (min-width: 768px) {
    padding: 0.8rem;
    width: 72px;
    height: 56px;
  }

  svg {
    font-size: 1.8rem;
    color: white;
  }
`;

export const UndoButton = styled(SnapshotButton)`
  background-color: #c0c0c0;
  &:hover {
    background-color: #a0a0a0;
  }
`;

export const RedoButton = styled(SnapshotButton)`
  background-color: #c0c0c0;
  &:hover {
    background-color: #a0a0a0;
  }
`;

export const DeleteButton = styled.button`
  background-color: #c0c0c0;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 60px;
  height: 48px;
  padding: 0.6rem;

  &:hover {
    background-color: #a0a0a0;
  }

  svg {
    font-size: 1.2rem;
    color: white;
  }

  @media (min-width: 768px) and (min-height: 768px) {
    padding: 0.8rem;
    width: 72px;
    height: 56px;
    svg {
      font-size: 1.8rem;
      color: white;
    }
  }
`;

export const ButtonText = styled.span`
  color: white;
  font-size: 0.8rem;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1111;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeader = styled.h3`
  margin-bottom: 1rem;
`;

export const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled(ModalButton)`
  background-color: #e0e0e0;
  &:hover {
    background-color: #b3b3b3;
  }
`;
