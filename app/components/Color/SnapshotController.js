// /app/components/Color/SnapshotController.js

'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCamera, FaCheck, FaUndo, FaRedo, FaTimes, FaTrash } from 'react-icons/fa';
import { loadSnapshotsFromLocalStorage, saveSnapshotsToLocalStorage } from './utils/localStorageUtils';

// Styled Components
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

const DeleteButton = styled.button`
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

const ButtonText = styled.span`
  color: white;
  font-size: 0.8rem;
`;

const ModalContainer = styled.div`
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

const ModalContent = styled.div`
  background-color: #f4f4f9;
  padding: 1rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ModalHeader = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const ModalButton = styled.button`
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

const CancelButton = styled(ModalButton)`
  background-color: #9e9e9e;

  &:hover {
    background-color: #757575;
  }
`;

export default function SnapshotController({ state, onApplySnapshot }) {
  const { snapshots: initialSnapshots, snapshotIndex: initialSnapshotIndex } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [snapshotIndex, setSnapshotIndex] = useState(initialSnapshotIndex);
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState(null); // "current" or "all"

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

  const handleDeleteCurrent = () => {
    const newSnapshots = snapshots.filter((_, index) => index !== snapshotIndex);
    setSnapshots(newSnapshots);
    setSnapshotIndex(newSnapshots.length - 1);
    setShowDeleteModal(false);
  };

  const handleDeleteAll = () => {
    setSnapshots([]);
    setSnapshotIndex(0);
    setShowDeleteModal(false);
  };

  const openDeleteModal = (type) => {
    if (snapshots.length > 0) {
      setDeleteType(type);
      setShowDeleteModal(true);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <SnapshotContainer>
        <SnapshotButton onClick={handleSnapshot}>
          {snapshotTaken ? <FaCheck /> : <FaCamera />} {/* Verwende FaCamera für Snapshot */}
          <ButtonText>{snapshots.length}</ButtonText>
        </SnapshotButton>

        <UndoButton onClick={handleUndo} disabled={snapshotIndex === 0}>
          <FaUndo />
          <ButtonText>{snapshotIndex > 0 ? snapshotIndex : 0}</ButtonText>
        </UndoButton>

        <RedoButton onClick={handleRedo} disabled={snapshotIndex >= snapshots.length - 1}>
          <FaRedo />
          <ButtonText>{snapshotIndex < snapshots.length - 1 ? snapshots.length - snapshotIndex - 1 : 0}</ButtonText>
        </RedoButton>

        {/* Löschen-Buttons mit Icons, nur aktiv wenn Snapshots vorhanden sind */}
        <DeleteButton onClick={() => openDeleteModal('current')} disabled={snapshots.length === 0}>
          <FaTimes />
        </DeleteButton>
        <DeleteButton onClick={() => openDeleteModal('all')} disabled={snapshots.length === 0}>
          <FaTrash />
        </DeleteButton>
      </SnapshotContainer>

      {/* Modal für Löschbestätigung */}
      {showDeleteModal && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              {deleteType === 'current' ? 'Aktuell angezeigten Snapshot löschen?' : 'Alle Snapshots löschen?'}
            </ModalHeader>
            <div>
              <ModalButton onClick={deleteType === 'current' ? handleDeleteCurrent : handleDeleteAll}>OK</ModalButton>
              <CancelButton onClick={closeDeleteModal}>Abbrechen</CancelButton>
            </div>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}
