// /app/components/Color/SnapshotController.js

import styled from 'styled-components';
import { FaCamera, FaCheck, FaUndo, FaRedo } from 'react-icons/fa';

const SnapshotContainer = styled.div`
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

const SnapshotButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.6rem;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-color: #5a5a5a;
  &:hover {
    background-color: #3a3a3a;
  }

  svg {
    font-size: 1.8rem;
    color: white;
  }
`;

const UndoButton = styled(SnapshotButton)`
  background-color: #c0c0c0;
  &:hover {
    background-color: #a0a0a0;
  }
`;

const RedoButton = styled(SnapshotButton)`
  background-color: #c0c0c0;
  &:hover {
    background-color: #a0a0a0;
  }
`;

export default function SnapshotController({ handleSnapshotClick, snapshotTaken, handleUndo, handleRedo }) {
  return (
    <SnapshotContainer>
      <SnapshotButton onClick={handleSnapshotClick}>{snapshotTaken ? <FaCheck /> : <FaCamera />}</SnapshotButton>
      <UndoButton onClick={handleUndo}>
        <FaUndo />
      </UndoButton>
      <RedoButton onClick={handleRedo}>
        <FaRedo />
      </RedoButton>
    </SnapshotContainer>
  );
}
