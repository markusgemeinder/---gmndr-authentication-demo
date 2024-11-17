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
  }, [snapshots, state]);

  const isSnapshotDuplicate = (snapshots, formData) => {
    return snapshots.some((snapshot) => JSON.stringify(snapshot) === JSON.stringify(formData));
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

    let newSnapshots;
    if (snapshots.length === 1) {
      newSnapshots = [...snapshots, formData];
    } else if (lastUsedSnapshotIndex === 0) {
      const pg_snapshots_a = snapshots.slice(0, 1);
      const pg_snapshots_b = snapshots.slice(1);
      newSnapshots = [...pg_snapshots_a, formData, ...pg_snapshots_b];
    } else {
      const pg_snapshots_a = snapshots.slice(0, lastUsedSnapshotIndex + 1);
      const pg_snapshots_b = snapshots.slice(lastUsedSnapshotIndex + 1);
      newSnapshots = [...pg_snapshots_a, formData, ...pg_snapshots_b];
    }

    const newSnapshotIndex = newSnapshots.indexOf(formData);

    setSnapshots(newSnapshots);
    setCurrentSnapshotPosition(newSnapshotIndex);
    saveSnapshotsToLocalStorage(newSnapshots);
    saveLastUsedSnapshotToLocalStorage(formData);
    saveLastUsedSnapshotIndexToLocalStorage(newSnapshotIndex);

    if (newSnapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Snapshot gespeichert. (Bitte beachten: Maximum erreicht, kein weiterer Snapshot möglich.)');
      setModalType('info');
      setShowModal(true);
    }
  };

  const handleDeleteCurrent = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Kein Snapshot zum Löschen vorhanden.');
      setModalType('info');
      return setShowModal(true);
    }

    setInfoModalMessage('Aktuellen Snapshot löschen?');
    setModalType('decision');
    setShowModal(true);
  };

  const confirmDeleteCurrent = () => {
    const newSnapshots = snapshots.filter((_, index) => index !== currentSnapshotPosition);
    setSnapshots(newSnapshots);
    setShowModal(false);

    const newPosition = Math.max(currentSnapshotPosition - 1, 0);
    setCurrentSnapshotPosition(newPosition);

    if (newSnapshots.length > 0) {
      saveLastUsedSnapshotToLocalStorage(newSnapshots[newPosition]);
      saveLastUsedSnapshotIndexToLocalStorage(newPosition);
    } else {
      deleteLastUsedSnapshotFromLocalStorage();
      saveLastUsedSnapshotIndexToLocalStorage(0);
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
    setCurrentSnapshotPosition(0);
    saveLastUsedSnapshotIndexToLocalStorage(0);
    deleteLastUsedSnapshotFromLocalStorage();
  };

  const closeModal = () => {
    setShowModal(false);
    setInfoModalMessage('');
  };

  const undoSteps = snapshots.length > 1 && currentSnapshotPosition > 0 ? currentSnapshotPosition : 0;
  const redoSteps =
    snapshots.length > 0 && currentSnapshotPosition < snapshots.length - 1
      ? snapshots.length - currentSnapshotPosition - 1
      : 0;

  const handleUndoRedo = (direction) => {
    let newPosition;

    if (!lastUsedRestored && hasFormDataChanged) {
      onApplySnapshot(lastUsedSnapshot);
      setLastUsedRestored(true);
      newPosition = lastUsedSnapshotIndex;
    } else {
      if (direction === 'undo') {
        newPosition = Math.max(currentSnapshotPosition - 1, 0);
      } else {
        newPosition = Math.min(currentSnapshotPosition + 1, snapshots.length - 1);
      }

      onApplySnapshot(snapshots[newPosition]);
    }

    setCurrentSnapshotPosition(newPosition);
    saveLastUsedSnapshotToLocalStorage(snapshots[newPosition]);
    saveLastUsedSnapshotIndexToLocalStorage(newPosition);
  };

  const renderModalButtons = () => {
    if (modalType === 'decision') {
      return (
        <>
          <ModalConfirmButton
            onClick={infoModalMessage.includes('Aktuellen') ? confirmDeleteCurrent : confirmDeleteAll}>
            Ja
          </ModalConfirmButton>
          <ModalCancelButton onClick={closeModal}>Nein</ModalCancelButton>
        </>
      );
    }
    return <ModalConfirmButton onClick={closeModal}>OK</ModalConfirmButton>;
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

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{infoModalMessage}</ModalHeader>
            <ModalButtonContainer>{renderModalButtons()}</ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
