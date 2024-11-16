// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaTrash, FaCheck, FaUndo, FaRedo } from 'react-icons/fa';
import {
  saveFormDataToLocalStorage,
  loadSnapshotsFromLocalStorage,
  saveSnapshotsToLocalStorage,
  saveLastUsedSnapshotToLocalStorage,
  loadLastUsedSnapshotFromLocalStorage,
  deleteLastUsedSnapshotFromLocalStorage,
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

export default function SnapshotController({ state }) {
  const { snapshots: initialSnapshots } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [isSnapshotLimitReached, setIsSnapshotLimitReached] = useState(snapshots.length >= SNAPSHOT_LIMIT);
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(snapshots.length ? snapshots.length - 1 : -1); // Der Index des aktuellen Snapshots
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'info' oder 'decision'
  const [infoModalMessage, setInfoModalMessage] = useState('');
  const [snapshotInProgress, setSnapshotInProgress] = useState(false); // Zustand für Snapshot-Symbol

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

  // Laden des letzten verwendeten Snapshots
  const lastUsedSnapshot = loadLastUsedSnapshotFromLocalStorage();

  // Überprüfen, ob sich die Formulardaten im Vergleich zum letzten Snapshot geändert haben
  const hasFormDataChanged = JSON.stringify(formData) !== JSON.stringify(lastUsedSnapshot);

  useEffect(() => {
    setIsSnapshotLimitReached(snapshots.length >= SNAPSHOT_LIMIT);
    saveSnapshotsToLocalStorage(snapshots);

    // Speichern der Formulardaten unabhängig vom Snapshot
    saveFormDataToLocalStorage(state);

    // Wenn keine Snapshots vorhanden sind, löschen wir auch lastUsedSnapshot
    if (snapshots.length === 0) {
      deleteLastUsedSnapshotFromLocalStorage();
      setCurrentSnapshotIndex(-1); // Reset auf keinen Snapshot
    }
  }, [snapshots, state]);

  const handleSnapshot = () => {
    if (snapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Maximum erreicht, kein weiterer Snapshot möglich.');
      setModalType('info');
      return setShowModal(true);
    }

    // Nur ein Snapshot erstellen, wenn sich die Formulardaten geändert haben
    if (!hasFormDataChanged) {
      setInfoModalMessage('Formulardaten unverändert, kein neuer Snapshot möglich.');
      setModalType('info');
      return setShowModal(true);
    }

    // Wenn das Limit kurz davor ist, einen Snapshot zu speichern
    if (snapshots.length === SNAPSHOT_LIMIT - 1) {
      setInfoModalMessage('Snapshot gespeichert. Bitte beachten: Maximum erreicht, kein weiterer Snapshot möglich.');
      setSnapshots([...snapshots, formData]);
      setModalType('info');
      return setShowModal(true);
    }

    const newSnapshots = [...snapshots, formData];
    setSnapshots(newSnapshots);
    setCurrentSnapshotIndex(newSnapshots.length - 1); // Gehe zum neuesten Snapshot

    // Snapshot-Prozess starten
    setSnapshotInProgress(true);
    saveLastUsedSnapshotToLocalStorage(formData);

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
    setCurrentSnapshotIndex(-1);

    deleteLastUsedSnapshotFromLocalStorage();
  };

  const closeModal = () => {
    setShowModal(false);
    setInfoModalMessage('');
  };

  // Undo- und Redo-Logik
  const handleUndo = () => {
    if (currentSnapshotIndex === 0) {
      setInfoModalMessage('Keine weiteren Snapshots für Undo verfügbar.');
      setModalType('info');
      return setShowModal(true);
    }

    setCurrentSnapshotIndex(currentSnapshotIndex - 1);
  };

  const handleRedo = () => {
    if (currentSnapshotIndex === snapshots.length - 1) {
      setInfoModalMessage('Keine weiteren Snapshots für Redo verfügbar.');
      setModalType('info');
      return setShowModal(true);
    }

    setCurrentSnapshotIndex(currentSnapshotIndex + 1);
  };

  const undoSteps = currentSnapshotIndex >= 0 ? currentSnapshotIndex : 0;
  const redoSteps =
    snapshots.length > 0 && currentSnapshotIndex < snapshots.length - 1
      ? snapshots.length - currentSnapshotIndex - 1
      : 0;

  return (
    <>
      <SnapshotContainer>
        <SnapshotButton onClick={handleSnapshot} isSnapshotLimitReached={isSnapshotLimitReached}>
          {snapshotInProgress ? <FaCheck /> : snapshots.length >= SNAPSHOT_LIMIT ? <FaStackOverflow /> : <FaCamera />}
          <ButtonText>{snapshots.length}</ButtonText>
        </SnapshotButton>
        <UndoButton onClick={handleUndo}>
          <FaUndo />
          <ButtonText>{undoSteps}</ButtonText>
        </UndoButton>
        <RedoButton onClick={handleRedo}>
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
