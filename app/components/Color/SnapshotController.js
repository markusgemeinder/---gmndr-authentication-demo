// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaTrash, FaCheck, FaUndo, FaRedo } from 'react-icons/fa';
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
  const [currentSnapshotPosition, setCurrentSnapshotPosition] = useState(snapshots.length ? snapshots.length - 1 : -1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [infoModalMessage, setInfoModalMessage] = useState('');
  const [snapshotInProgress, setSnapshotInProgress] = useState(false);
  const [lastUsedRestored, setLastUsedRestored] = useState(false);

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
      saveLastUsedSnapshotIndexToLocalStorage(-1);
      setCurrentSnapshotPosition(-1);
    }
  }, [snapshots, state]);

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
      setInfoModalMessage('Snapshot gespeichert. (Bitte beachten: Maximum erreicht, kein weiterer Snapshot möglich.)');
      setModalType('info');
      setShowModal(true);
    }
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
    saveLastUsedSnapshotIndexToLocalStorage(-1);
  };

  const closeModal = () => {
    setShowModal(false);
    setInfoModalMessage('');
  };

  const handleUndoRedo = (direction) => {
    let newPosition;

    if (!lastUsedRestored && hasFormDataChanged) {
      onApplySnapshot(lastUsedSnapshot);
      setLastUsedRestored(true);
      newPosition = lastUsedSnapshotIndex;
    } else {
      newPosition =
        direction === 'undo'
          ? Math.max(currentSnapshotPosition - 1, 0)
          : Math.min(currentSnapshotPosition + 1, snapshots.length - 1);

      onApplySnapshot(snapshots[newPosition]);
    }

    setCurrentSnapshotPosition(newPosition);

    saveLastUsedSnapshotToLocalStorage(snapshots[newPosition]);
    saveLastUsedSnapshotIndexToLocalStorage(newPosition);
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
