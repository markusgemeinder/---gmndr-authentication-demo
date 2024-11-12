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

export const SnapshotButton = styled.button`
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.4rem;
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  background-color: #5a5a5a;
  width: 60px;
  height: 48px;
  padding: 0.6rem;
  &:hover {
    background-color: #3a3a3a;
  }
  svg {
    font-size: 1.4rem;
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

  &:hover {
    background-color: #3a3a3a;
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

  &:disabled {
    background-color: #e0e0e0;
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
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const ModalContent = styled.div`
  background-color: #f4f4f9;
  padding: 1rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const ModalHeader = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f44336;
  margin: 0.5rem;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const CancelButton = styled(ModalButton)`
  background-color: #9e9e9e;

  &:hover {
    background-color: #757575;
  }
`;
