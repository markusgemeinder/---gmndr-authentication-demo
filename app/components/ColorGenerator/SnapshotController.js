/* eslint-disable react-hooks/exhaustive-deps */
// /app/components/ColorGenerator/SnapshotController.js

import { useState, useEffect, useContext } from 'react';
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
} from '@/utils/localStorageUtils';
import SnapshotControllerModalPopup from './SnapshotControllerModalPopup';
import {
  SnapshotContainer,
  SnapshotButton,
  DeleteButton,
  UndoButton,
  RedoButton,
  ButtonText,
} from './SnapshotControllerStyles';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const SNAPSHOT_LIMIT = 8;

export default function SnapshotController({ state, onApplySnapshot, resetForm }) {
  // ===== State Management
  const { language } = useContext(LanguageContext);
  const { snapshots: initialSnapshots } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [currentSnapshotPosition, setCurrentSnapshotPosition] = useState(snapshots.length ? snapshots.length - 1 : 0);
  const [isSnapshotLimitReached, setIsSnapshotLimitReached] = useState(snapshots.length >= SNAPSHOT_LIMIT);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalUndoRedoDirection, setModalUndoRedoDirection] = useState(null);
  const [infoModalMessage, setInfoModalMessage] = useState('');
  const [snapshotInProgress, setSnapshotInProgress] = useState(false);
  const [lastUsedRestored, setLastUsedRestored] = useState(false);
  const [resetToLastSnapshot, setResetToLastSnapshot] = useState(false);
  const [undoSteps, setUndoSteps] = useState(0);
  const [redoSteps, setRedoSteps] = useState(0);

  // ===== Sprachtext-Abfrage
  const getLanguageText = (key) => {
    return getText('snapshotController', key, language);
  };

  // ===== Derived Variables
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
  const [hasFormDataChanged, setHasFormDataChanged] = useState(
    JSON.stringify(formData) !== JSON.stringify(lastUsedSnapshot)
  );

  // ===== Effects
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

  useEffect(() => {
    setHasFormDataChanged(JSON.stringify(formData) !== JSON.stringify(lastUsedSnapshot));
  }, [formData, lastUsedSnapshot]);

  useEffect(() => {
    const { undoSteps, redoSteps } = calculateUndoRedoSteps(snapshots, currentSnapshotPosition);
    setUndoSteps(undoSteps);
    setRedoSteps(redoSteps);
  }, [snapshots, currentSnapshotPosition]);

  // ===== Helper Functions
  const isSnapshotDuplicate = (snapshots, formData) =>
    snapshots.some((snapshot) => JSON.stringify(snapshot) === JSON.stringify(formData));

  const findLastUsedSnapshotIndex = (snapshots, lastUsedSnapshot) =>
    snapshots.findIndex((snapshot) => JSON.stringify(snapshot) === JSON.stringify(lastUsedSnapshot));

  const calculateUndoRedoSteps = (snapshots, currentSnapshotPosition) => {
    if (!snapshots || snapshots.length <= 1) {
      // Weniger als 2 Snapshots bedeutet keine Undo- oder Redo-Schritte möglich.
      return { undoSteps: 0, redoSteps: 0 };
    }

    // Sicherstellen, dass die Position innerhalb des gültigen Bereichs liegt
    const validCurrentPosition = Math.max(0, Math.min(currentSnapshotPosition, snapshots.length - 1));

    // Berechnung der Undo- und Redo-Schritte
    const undoSteps = validCurrentPosition; // Schritte zurück von der aktuellen Position
    const redoSteps = snapshots.length - 1 - validCurrentPosition; // Schritte vorwärts von der aktuellen Position

    return { undoSteps, redoSteps };
  };

  // ===== Snapshot Management
  const handleSnapshot = () => {
    if (isSnapshotLimitReached) {
      setInfoModalMessage(getLanguageText('snapshotLimitReached'));
      setModalType('info');
      return setShowModal(true);
    }

    if (isSnapshotDuplicate(snapshots, formData) || !hasFormDataChanged) {
      setInfoModalMessage(getLanguageText('snapshotAlreadyExists'));
      setModalType('info');
      return setShowModal(true);
    }

    const lastUsedSnapshotIndex = findLastUsedSnapshotIndex(snapshots, lastUsedSnapshot);
    const newSnapshots = [
      ...snapshots.slice(0, currentSnapshotPosition + 1),
      formData,
      ...snapshots.slice(currentSnapshotPosition + 1),
    ];

    setSnapshots(newSnapshots);
    setCurrentSnapshotPosition(currentSnapshotPosition + 1);
    saveLastUsedSnapshotToLocalStorage(formData);
    saveLastUsedSnapshotIndexToLocalStorage(lastUsedSnapshotIndex + 1);

    if (newSnapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage(getLanguageText('snapshotSavedMaxReached'));
      setModalType('info');
      setShowModal(true);
    }

    setSnapshotInProgress(true);
    setTimeout(() => {
      setSnapshotInProgress(false);
    }, 1000);
  };

  const handleDeleteCurrent = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage(getLanguageText('noSnapshotToDelete'));
      setModalType('info');
      return setShowModal(true);
    }

    if (hasFormDataChanged) {
      setInfoModalMessage(getLanguageText('formDataChangedReset'));
      setModalType('decision-delete-current');
      setResetToLastSnapshot(true);
      return setShowModal(true);
    }

    setInfoModalMessage(getLanguageText('deleteCurrentSnapshot'));
    setModalType('decision-delete-current');
    setResetToLastSnapshot(false);
    setShowModal(true);
  };

  const confirmDeleteCurrentSnapshot = () => {
    const newSnapshots = snapshots.filter((_, index) => index !== currentSnapshotPosition);
    const newPosition = Math.max(currentSnapshotPosition - 1, 0);
    setSnapshots(newSnapshots);
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
      setInfoModalMessage(getLanguageText('noSnapshotsToDelete'));
      setModalType('info');
      return setShowModal(true);
    }

    setInfoModalMessage(getLanguageText('deleteAllSnapshots'));
    setModalType('decision-delete-all');
    setShowModal(true);
  };

  const confirmDeleteAllSnapshots = () => {
    setSnapshots([]);
    setCurrentSnapshotPosition(0);
    resetForm();
    deleteLastUsedSnapshotFromLocalStorage();
    saveLastUsedSnapshotIndexToLocalStorage(0);
    setShowModal(false);
  };

  // ===== Undo/Redo Logic
  const handleUndoRedo = (direction) => {
    if (hasFormDataChanged) {
      undoRedoModal(direction);
    } else {
      performUndoRedo(direction);
    }
  };

  const performUndoRedo = (direction) => {
    const newPosition =
      direction === 'undo'
        ? Math.max(currentSnapshotPosition - 1, 0)
        : Math.min(currentSnapshotPosition + 1, snapshots.length - 1);

    onApplySnapshot(snapshots[newPosition]);
    setCurrentSnapshotPosition(newPosition);

    saveLastUsedSnapshotToLocalStorage(snapshots[newPosition]);
    saveLastUsedSnapshotIndexToLocalStorage(newPosition);

    setHasFormDataChanged(JSON.stringify(formData) !== JSON.stringify(snapshots[newPosition]));
  };

  const undoRedoModal = (direction) => {
    setInfoModalMessage(getLanguageText('formDataNotSaved'));
    setModalType('decision-undo-redo');
    setModalUndoRedoDirection(direction);
    setShowModal(true);
  };

  // ===== Modal Control
  const closeModal = () => {
    setShowModal(false);
    setInfoModalMessage('');
    setModalUndoRedoDirection(null);
    setLastUsedRestored(false);
  };

  // ===== Render
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
        onConfirm={() => {
          if (modalType === 'decision-undo-redo') {
            handleSnapshot();
            // performUndoRedo(modalUndoRedoDirection);
            setModalUndoRedoDirection(null);
          } else if (resetToLastSnapshot) {
            confirmResetFormToLastSnapshot();
          } else if (modalType === 'decision-delete-current') {
            confirmDeleteCurrentSnapshot();
          } else {
            confirmDeleteAllSnapshots();
          }
          setShowModal(false);
        }}
        onCancel={
          modalType === 'decision-undo-redo'
            ? () => {
                closeModal();
                performUndoRedo(modalUndoRedoDirection);
                setModalUndoRedoDirection(null);
              }
            : closeModal
        }
      />
    </>
  );
}
