// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaTrash, FaCheck, FaUndo, FaRedo } from 'react-icons/fa';
import {
  saveFormDataToLocalStorage,
  loadSnapshotsFromLocalStorage,
  saveSnapshotsToLocalStorage,
  saveLastUsedSnapshotToLocalStorage,
  loadLastUsedSnapshotFromLocalStorage,
  loadLastUsedSnapshotIndexFromLocalStorage, // Diese Funktion ist bereits da
  deleteLastUsedSnapshotFromLocalStorage,
  saveLastUsedSnapshotIndexToLocalStorage, // Diese Funktion ist ebenfalls da
} from './utils/localStorageUtils';
import {
  SnapshotContainer,
  SnapshotButton,
  DeleteButton,
  UndoButton,
  RedoButton,
  ButtonText,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalButtonContainer,
  ModalConfirmButton,
  ModalCancelButton,
} from './SnapshotControllerStyles';

const SNAPSHOT_LIMIT = 5;

export default function SnapshotController({ state, onApplySnapshot }) {
  const { snapshots: initialSnapshots } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [isSnapshotLimitReached, setIsSnapshotLimitReached] = useState(snapshots.length >= SNAPSHOT_LIMIT);
  const [currentSnapshotPosition, setCurrentSnapshotPosition] = useState(snapshots.length ? snapshots.length - 1 : -1); // Position im Array
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'info' oder 'decision'
  const [infoModalMessage, setInfoModalMessage] = useState('');
  const [snapshotInProgress, setSnapshotInProgress] = useState(false); // Zustand für Snapshot-Symbol
  const [lastUsedRestored, setLastUsedRestored] = useState(false); // Indikator für Wiederherstellung von lastUsedSnapshot

  const formData = {
    hex: state.hex,
    prefix: state.prefix,
    suffix: state.suffix,
    sortOrder: state.sortOrder,
    checkedValues: state.checkedValues,
    selectedOption: state.selectedOption,
    darkLimit: state.darkLimit,
    brightLimit: state.brightLimit,
  };

  // Laden des letzten verwendeten Snapshots und des Indexes
  const lastUsedSnapshot = loadLastUsedSnapshotFromLocalStorage();
  const lastUsedSnapshotIndex = loadLastUsedSnapshotIndexFromLocalStorage(); // Neuen Index laden

  // Überprüfen, ob sich die Formulardaten im Vergleich zum letzten Snapshot geändert haben
  const hasFormDataChanged = JSON.stringify(formData) !== JSON.stringify(lastUsedSnapshot);

  useEffect(() => {
    setIsSnapshotLimitReached(snapshots.length >= SNAPSHOT_LIMIT);
    saveSnapshotsToLocalStorage(snapshots);

    // Speichern der Formulardaten unabhängig vom Snapshot
    saveFormDataToLocalStorage(state);

    // Wenn keine Snapshots vorhanden sind, löschen wir auch lastUsedSnapshot und lastUsedSnapshotIndex
    if (snapshots.length === 0) {
      deleteLastUsedSnapshotFromLocalStorage();
      saveLastUsedSnapshotIndexToLocalStorage(-1); // Setze den Index auf -1, wenn keine Snapshots vorhanden sind
      setCurrentSnapshotPosition(-1); // Reset auf keinen Snapshot
    }
  }, [snapshots, state]);

  // Funktion zur Berechnung des Indexes des letzten verwendeten Snapshots
  const findLastUsedSnapshotIndex = (snapshots, lastUsedSnapshot) => {
    return snapshots.findIndex((snapshot) => JSON.stringify(snapshot) === JSON.stringify(lastUsedSnapshot));
  };

  // Funktion zum Hinzufügen eines neuen Snapshots rechts vom letzten verwendeten Snapshot
  const handleSnapshot = () => {
    if (snapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Maximum erreicht, kein weiterer Snapshot möglich.');
      setModalType('info');
      return setShowModal(true);
    }

    if (!hasFormDataChanged) {
      setInfoModalMessage('Formulardaten unverändert, kein neuer Snapshot möglich.');
      setModalType('info');
      return setShowModal(true);
    }

    // Finde den Index des letzten verwendeten Snapshots
    const lastUsedSnapshotIndex = findLastUsedSnapshotIndex(snapshots, lastUsedSnapshot);

    // Der neue Snapshot wird direkt nach dem letzten verwendeten Snapshot eingefügt
    const newSnapshots = [
      ...snapshots.slice(0, lastUsedSnapshotIndex + 1), // Snapshots vor dem lastUsedSnapshot
      formData, // Der neue Snapshot wird nach dem lastUsedSnapshot eingefügt
      ...snapshots.slice(lastUsedSnapshotIndex + 1), // Snapshots nach dem lastUsedSnapshot
    ];

    setSnapshots(newSnapshots);
    setCurrentSnapshotPosition(lastUsedSnapshotIndex + 1); // Setze die Position des neuen Snapshots

    // Snapshot-Prozess starten
    setSnapshotInProgress(true);
    saveLastUsedSnapshotToLocalStorage(formData);
    saveLastUsedSnapshotIndexToLocalStorage(lastUsedSnapshotIndex + 1); // Speichern des Indexes

    setTimeout(() => {
      setSnapshotInProgress(false);
    }, 1000); // 1000ms = 1 Sekunde
  };

  const handleDeleteAll = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Keine Snapshots gespeichert.');
      setModalType('info');
      return setShowModal(true);
    }

    setInfoModalMessage('Alle Snapshots löschen?');
    setModalType('decision');
    setShowModal(true);
  };

  const confirmDeleteAll = () => {
    setSnapshots([]);
    setShowModal(false);
    setInfoModalMessage('');
    setCurrentSnapshotPosition(-1);

    deleteLastUsedSnapshotFromLocalStorage();
    saveLastUsedSnapshotIndexToLocalStorage(-1); // Lösche den Index ebenfalls
  };

  const closeModal = () => {
    setShowModal(false);
    setInfoModalMessage('');
  };

  // Undo-/Redo-Logik
  const handleUndoRedo = (direction) => {
    if (!lastUsedRestored && hasFormDataChanged) {
      // Wiederherstellen des letzten verwendeten Snapshots beim ersten Undo/Redo
      onApplySnapshot(lastUsedSnapshot);
      setLastUsedRestored(true);
    } else {
      // Normale Undo-/Redo-Navigation
      const newPosition =
        direction === 'undo'
          ? Math.max(currentSnapshotPosition - 1, 0)
          : Math.min(currentSnapshotPosition + 1, snapshots.length - 1);

      onApplySnapshot(snapshots[newPosition]);
      setCurrentSnapshotPosition(newPosition);
    }
    console.log('CurrentSnapshotPosition:', currentSnapshotPosition);
    console.log('LastUsedRestored:', lastUsedRestored);
  };

  const undoSteps = currentSnapshotPosition >= 0 ? currentSnapshotPosition : 0;
  const redoSteps =
    snapshots.length > 0 && currentSnapshotPosition < snapshots.length - 1
      ? snapshots.length - currentSnapshotPosition - 1
      : 0;

  return (
    <>
      <SnapshotContainer>
        <SnapshotButton onClick={handleSnapshot} isSnapshotLimitReached={isSnapshotLimitReached}>
          {snapshotInProgress ? <FaCheck /> : snapshots.length >= SNAPSHOT_LIMIT ? <FaStackOverflow /> : <FaCamera />}
          <ButtonText>{snapshots.length}</ButtonText>
        </SnapshotButton>
        <UndoButton onClick={() => handleUndoRedo('undo')} disabled={undoSteps === 0}>
          <FaUndo />
          <ButtonText>{undoSteps}</ButtonText>
        </UndoButton>
        <RedoButton onClick={() => handleUndoRedo('redo')} disabled={redoSteps === 0}>
          <FaRedo />
          <ButtonText>{redoSteps}</ButtonText>
        </RedoButton>

        <DeleteButton onClick={handleDeleteAll}>
          <FaTrash />
        </DeleteButton>
      </SnapshotContainer>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{infoModalMessage}</ModalHeader>
            <ModalButtonContainer>
              {modalType === 'decision' ? (
                <>
                  <ModalConfirmButton onClick={confirmDeleteAll}>Ja</ModalConfirmButton>
                  <ModalCancelButton onClick={closeModal}>Nein</ModalCancelButton>
                </>
              ) : (
                <ModalConfirmButton onClick={closeModal}>OK</ModalConfirmButton>
              )}
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
