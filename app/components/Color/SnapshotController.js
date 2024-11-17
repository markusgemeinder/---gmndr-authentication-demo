// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaTrash, FaTimes, FaCheck, FaUndo, FaRedo } from 'react-icons/fa';
import {
  saveFormDataToLocalStorage,
  loadSnapshotsFromLocalStorage,
  saveSnapshotsToLocalStorage,
  saveLastUsedSnapshotToLocalStorage,
  loadLastUsedSnapshotFromLocalStorage,
  loadLastUsedSnapshotIndexFromLocalStorage,
  deleteLastUsedSnapshotFromLocalStorage,
  saveLastUsedSnapshotIndexToLocalStorage,
} from './utils/localStorageUtils';
import SnapshotControllerModalPopup from './SnapshotControllerModalPopup';
import {
  SnapshotContainer,
  SnapshotButton,
  DeleteButton,
  UndoButton,
  RedoButton,
  ButtonText,
} from './SnapshotControllerStyles';

const SNAPSHOT_LIMIT = 10;

export default function SnapshotController({ state, onApplySnapshot }) {
  const { snapshots: initialSnapshots } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [isSnapshotLimitReached, setIsSnapshotLimitReached] = useState(snapshots.length >= SNAPSHOT_LIMIT);
  const [currentSnapshotPosition, setCurrentSnapshotPosition] = useState(snapshots.length ? snapshots.length - 1 : 0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [infoModalMessage, setInfoModalMessage] = useState('');
  const [snapshotInProgress, setSnapshotInProgress] = useState(false);
  const [lastUsedRestored, setLastUsedRestored] = useState(false);
  const [resetToLastSnapshot, setResetToLastSnapshot] = useState(false);
  const [pendingDirection, setPendingDirection] = useState(null);
  const [undoSteps, setUndoSteps] = useState(0);
  const [redoSteps, setRedoSteps] = useState(0);

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

  const lastUsedSnapshot = loadLastUsedSnapshotFromLocalStorage();
  const lastUsedSnapshotIndex = loadLastUsedSnapshotIndexFromLocalStorage();
  const hasFormDataChanged = JSON.stringify(formData) !== JSON.stringify(lastUsedSnapshot);

  useEffect(() => {
    setIsSnapshotLimitReached(snapshots.length >= SNAPSHOT_LIMIT);
    saveSnapshotsToLocalStorage(snapshots);
    saveFormDataToLocalStorage(state);

    if (snapshots.length === 0) {
      deleteLastUsedSnapshotFromLocalStorage();
      saveLastUsedSnapshotIndexToLocalStorage(0);
      setCurrentSnapshotPosition(0);
    }

    updateUndoRedoSteps();
  }, [snapshots, state, currentSnapshotPosition]);

  const isSnapshotDuplicate = (snapshots, formData) => {
    return snapshots.some((snapshot) => JSON.stringify(snapshot) === JSON.stringify(formData));
  };

  const findLastUsedSnapshotIndex = (snapshots, lastUsedSnapshot) => {
    return snapshots.findIndex((snapshot) => JSON.stringify(snapshot) === JSON.stringify(lastUsedSnapshot));
  };

  const handleSnapshot = () => {
    if (snapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Maximum erreicht, kein weiterer Snapshot möglich.');
      setModalType('info');
      return setShowModal(true);
    }

    if (isSnapshotDuplicate(snapshots, formData) || !hasFormDataChanged) {
      setInfoModalMessage('Snapshot existiert bereits, kein neuer Snapshot möglich.');
      setModalType('info');
      return setShowModal(true);
    }

    const lastUsedSnapshotIndex = findLastUsedSnapshotIndex(snapshots, lastUsedSnapshot);
    const newSnapshots = [
      ...snapshots.slice(0, lastUsedSnapshotIndex + 1),
      formData,
      ...snapshots.slice(lastUsedSnapshotIndex + 1),
    ];

    setSnapshots(newSnapshots);
    setCurrentSnapshotPosition(lastUsedSnapshotIndex + 1);
    saveLastUsedSnapshotToLocalStorage(formData);
    saveLastUsedSnapshotIndexToLocalStorage(lastUsedSnapshotIndex + 1);

    if (newSnapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Snapshot gespeichert. (Maximum erreicht, kein weiterer Snapshot möglich.)');
      setModalType('info');
      setShowModal(true);
    }
  };

  const updateUndoRedoSteps = () => {
    const undoSteps = currentSnapshotPosition > 0 ? currentSnapshotPosition : 0;
    const redoSteps =
      currentSnapshotPosition < snapshots.length - 1 ? snapshots.length - currentSnapshotPosition - 1 : 0;

    setUndoSteps(undoSteps);
    setRedoSteps(redoSteps);
  };

  const handleDeleteCurrent = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Kein Snapshot zum Löschen vorhanden.');
      setModalType('info');
      return setShowModal(true);
    }

    if (hasFormDataChanged) {
      setInfoModalMessage('Die Formulardaten wurden verändert. Auf letzten Snapshot zurücksetzen?');
      setModalType('decision-undo-redo');
      setResetToLastSnapshot(true);
      setShowModal(true);
      return;
    }

    setInfoModalMessage('Aktuellen Snapshot löschen?');
    setModalType('decision-delete-current');
    setResetToLastSnapshot(false);
    setShowModal(true);
  };

  const confirmResetFormToLastSnapshot = () => {
    onApplySnapshot(lastUsedSnapshot);
    setSnapshots([lastUsedSnapshot]);
    saveSnapshotsToLocalStorage([lastUsedSnapshot]);
    setCurrentSnapshotPosition(0);
    saveLastUsedSnapshotToLocalStorage(lastUsedSnapshot);
    saveLastUsedSnapshotIndexToLocalStorage(0);
    setShowModal(false);
  };

  const handleDeleteAll = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Keine Snapshots zum Löschen vorhanden.');
      setModalType('info');
      return setShowModal(true);
    }

    setInfoModalMessage('Alle Snapshots löschen?');
    setModalType('decision-delete-all');
    setShowModal(true);
  };

  const confirmDeleteCurrentSnapshot = () => {
    const newSnapshots = snapshots.filter((_, index) => index !== currentSnapshotPosition);
    setSnapshots(newSnapshots);

    const newPosition = Math.max(currentSnapshotPosition - 1, 0);
    setCurrentSnapshotPosition(newPosition);

    if (newSnapshots.length > 0) {
      saveLastUsedSnapshotToLocalStorage(newSnapshots[newPosition]);
      saveLastUsedSnapshotIndexToLocalStorage(newPosition);
      onApplySnapshot(newSnapshots[newPosition]);
    } else {
      deleteLastUsedSnapshotFromLocalStorage();
      saveLastUsedSnapshotIndexToLocalStorage(0);
    }

    setShowModal(false);
  };

  const confirmDeleteAllSnapshots = () => {
    setSnapshots([]);
    setShowModal(false);
    setInfoModalMessage('');
    setCurrentSnapshotPosition(0);
    saveLastUsedSnapshotIndexToLocalStorage(0);
    deleteLastUsedSnapshotFromLocalStorage();
  };

  const handleUndoRedo = (direction) => {
    if (hasFormDataChanged && snapshots.length < SNAPSHOT_LIMIT) {
      setInfoModalMessage('Einstellungen noch nicht gespeichert. Snapshot erstellen?');
      setModalType('decision-undo-redo');
      setShowModal(true);
      setPendingDirection(direction); // Richtung speichern (undo oder redo)
      return; // Abbrechen, bis der Benutzer das Modal bestätigt
    }

    performUndoRedo(direction); // Direkte Ausführung, wenn keine Modal erforderlich
  };

  const performUndoRedo = (direction) => {
    let newPosition;

    if (!lastUsedRestored && hasFormDataChanged) {
      // Falls Formulardaten geändert wurden und noch nicht gespeichert sind,
      // Snapshot erstellen, bevor der Undo/Redo ausgeführt wird.
      handleSnapshot(); // Snapshot erstellen
      setLastUsedRestored(true); // Status setzen, dass der Snapshot wiederhergestellt wurde
      newPosition = lastUsedSnapshotIndex;
    } else {
      if (direction === 'undo') {
        newPosition = Math.max(currentSnapshotPosition - 1, 0);
      } else {
        newPosition = Math.min(currentSnapshotPosition + 1, snapshots.length - 1);
      }

      onApplySnapshot(snapshots[newPosition]); // Die angewendeten Änderungen
    }

    setCurrentSnapshotPosition(newPosition);
    updateUndoRedoSteps(); // Update der Undo/Redo-Schritte
  };

  const createSnapshotFromModal = () => {
    handleSnapshot(); // Snapshot erstellen
    if (pendingDirection) {
      performUndoRedo(pendingDirection); // Undo/Redo ausführen, auch bei Ja
      setPendingDirection(null); // Richtung zurücksetzen
    }
    setShowModal(false);
    setInfoModalMessage('');
    setResetToLastSnapshot(false);
    setModalType(null);
  };

  const closeModal = () => {
    if (pendingDirection) {
      performUndoRedo(pendingDirection); // Undo/Redo ausführen, auch bei Nein
      setPendingDirection(null); // Richtung zurücksetzen
    }
    setShowModal(false);
    setInfoModalMessage('');
    setResetToLastSnapshot(false);
    setModalType(null);
  };

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
        <DeleteButton onClick={handleDeleteCurrent}>
          <FaTimes />
        </DeleteButton>
        <DeleteButton onClick={handleDeleteAll}>
          <FaTrash />
        </DeleteButton>
      </SnapshotContainer>

      <SnapshotControllerModalPopup
        showModal={showModal}
        modalType={modalType}
        infoModalMessage={infoModalMessage}
        onConfirm={
          resetToLastSnapshot
            ? confirmResetFormToLastSnapshot
            : modalType === 'decision-undo-redo'
            ? createSnapshotFromModal
            : modalType === 'decision-delete-current'
            ? confirmDeleteCurrentSnapshot
            : confirmDeleteAllSnapshots
        }
        onCancel={closeModal}
      />
    </>
  );
}
