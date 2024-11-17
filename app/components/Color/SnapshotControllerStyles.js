// /app/components/Color/SnapshotControllerStyles.js

import styled from 'styled-components';

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

  svg {
    font-size: 1.4rem;
    color: var(--color-white);
  }

  @media (min-width: 768px) {
    padding: 0.8rem;
    width: 72px;
    height: 56px;

    svg {
      font-size: 1.8rem;
      color: var(--color-white);
    }
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
    font-size: 1.4rem;
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
  font-weight: bold;
`;
