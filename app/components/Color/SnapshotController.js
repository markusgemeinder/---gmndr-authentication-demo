// /app/components/Color/SnapshotController.js

'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCamera, FaCheck, FaUndo, FaRedo } from 'react-icons/fa';
import { loadSnapshotsFromLocalStorage, saveSnapshotsToLocalStorage } from './utils/localStorageUtils';

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

export default function SnapshotController({ state, onApplySnapshot }) {
  const { snapshots: initialSnapshots, snapshotIndex: initialSnapshotIndex } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [snapshotIndex, setSnapshotIndex] = useState(initialSnapshotIndex);
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  useEffect(() => {
    saveSnapshotsToLocalStorage(snapshots, snapshotIndex);
  }, [snapshots, snapshotIndex]);

  const handleSnapshot = () => {
    const snapshot = {
      hex: state.hex,
      prefix: state.prefix,
      suffix: state.suffix,
      sortOrder: state.sortOrder,
      checkedValues: state.checkedValues,
      selectedOption: state.selectedOption,
      darkLimit: state.darkLimit,
      brightLimit: state.brightLimit,
    };

    const lastSnapshot = snapshots[snapshotIndex];
    if (lastSnapshot && JSON.stringify(lastSnapshot) === JSON.stringify(snapshot)) {
      return; // Keine Änderung, also kein Snapshot speichern
    }

    const newSnapshots = [...snapshots.slice(0, snapshotIndex + 1), snapshot];
    if (newSnapshots.length > 20) newSnapshots.shift(); // Limitiere auf maximal 20 Snapshots

    setSnapshots(newSnapshots);
    setSnapshotIndex(newSnapshots.length - 1);
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 1000);
  };

  const handleUndo = () => {
    if (snapshotIndex > 0) {
      const prevSnapshot = snapshots[snapshotIndex - 1];
      onApplySnapshot(prevSnapshot);
      setSnapshotIndex(snapshotIndex - 1);
    }
  };

  const handleRedo = () => {
    if (snapshotIndex < snapshots.length - 1) {
      const nextSnapshot = snapshots[snapshotIndex + 1];
      onApplySnapshot(nextSnapshot);
      setSnapshotIndex(snapshotIndex + 1);
    }
  };

  return (
    <SnapshotContainer>
      <SnapshotButton onClick={handleSnapshot}>{snapshotTaken ? <FaCheck /> : <FaCamera />}</SnapshotButton>
      <UndoButton onClick={handleUndo}>
        <FaUndo />
      </UndoButton>
      <RedoButton onClick={handleRedo}>
        <FaRedo />
      </RedoButton>
    </SnapshotContainer>
  );
}
