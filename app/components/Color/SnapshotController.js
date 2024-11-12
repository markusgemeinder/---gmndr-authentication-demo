// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaCheck, FaUndo, FaRedo, FaTimes, FaTrash } from 'react-icons/fa';
import { loadSnapshotsFromLocalStorage, saveSnapshotsToLocalStorage } from './utils/localStorageUtils';
import {
  SnapshotContainer,
  SnapshotButton,
  UndoButton,
  RedoButton,
  DeleteButton,
  ButtonText,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalButton,
  CancelButton,
} from './SnapshotControllerStyles';

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

    const newSnapshots = [...snapshots.slice(0, snapshotIndex + 1), snapshot, ...snapshots.slice(snapshotIndex + 1)];

    if (newSnapshots.length > 20) {
      newSnapshots.shift(); // Löscht den ältesten Snapshot, wenn mehr als 20 existieren
    }

    setSnapshots(newSnapshots);
    setSnapshotIndex(snapshotIndex + 1);
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
          {snapshotTaken ? <FaCheck /> : <FaCamera />}
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
        {/* <DeleteButton onClick={() => openDeleteModal('current')} disabled={snapshots.length === 0}>
          <FaTimes />
        </DeleteButton> */}
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
