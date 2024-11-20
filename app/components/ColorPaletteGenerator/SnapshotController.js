// /app/components/ColorPaletteGenerator/SnapshotController.js

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
  }, [formData]);

  // ===== Helper Functions
  const isSnapshotDuplicate = (snapshots, formData) =>
    snapshots.some((snapshot) => JSON.stringify(snapshot) === JSON.stringify(formData));


  const findLastUsedSnapshotIndex = (snapshots, lastUsedSnapshot) =>
    snapshots.findIndex((snapshot) => JSON.stringify(snapshot) === JSON.stringify(lastUsedSnapshot));

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
    setSnapshots([lastUsedSnapshot]); // Setzt die Snapshots zurück
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
    setShowModal(false);
    setInfoModalMessage('');
    setCurrentSnapshotPosition(0);
    saveLastUsedSnapshotIndexToLocalStorage(0);
    deleteLastUsedSnapshotFromLocalStorage();
    resetForm();
    setShowModal(false);
  };

  // ===== Undo/Redo Logic
  const handleUndoRedo = (direction) => {
    if (hasFormDataChanged && !lastUsedRestored) {
      // Änderungen vorhanden – Modal öffnen
      undoRedoModal(direction);
    } else {
      // Keine Änderungen – direkt Undo/Redo ausführen
      performUndoRedo(direction);
      setLastUsedRestored(false);
      setHasFormDataChanged(JSON.stringify(formData) !== JSON.stringify(lastUsedSnapshot));
    }
  };

  const undoSteps = snapshots.length > 1 && currentSnapshotPosition > 0 ? currentSnapshotPosition : 0;
  const redoSteps =
    snapshots.length > 0 && currentSnapshotPosition < snapshots.length - 1
      ? snapshots.length - currentSnapshotPosition - 1
      : 0;

  const undoRedoModal = (direction) => {
    setInfoModalMessage(getLanguageText('formDataNotSaved'));
    setModalType('decision-undo-redo');
    setShowModal(true);

    // Speichert die Richtung, die verarbeitet werden soll
    setModalUndoRedoDirection(direction);
  };

  const performUndoRedo = (direction) => {
    let newPosition;

    if (!lastUsedRestored && hasFormDataChanged) {
      // Letzten Snapshot wiederherstellen
      onApplySnapshot(lastUsedSnapshot);
      setLastUsedRestored(true);
      newPosition = lastUsedSnapshotIndex;
    } else {
      const newPosition =
        direction === 'undo'
          ? Math.max(currentSnapshotPosition - 1, 0)
          : Math.min(currentSnapshotPosition + 1, snapshots.length - 1);

      onApplySnapshot(snapshots[newPosition]);
      setCurrentSnapshotPosition(newPosition);
      saveLastUsedSnapshotToLocalStorage(snapshots[newPosition]);
      saveLastUsedSnapshotIndexToLocalStorage(newPosition);
    }

    // Zustände nach Undo/Redo zurücksetzen
    setHasFormDataChanged(JSON.stringify(formData) !== JSON.stringify(lastUsedSnapshot)); // Neu prüfen
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
            handleSnapshot(); // Snapshot speichern
            performUndoRedo(modalUndoRedoDirection);
            setModalUndoRedoDirection(null);
          } else if (resetToLastSnapshot) {
            confirmResetFormToLastSnapshot();
          } else if (modalType === 'decision-delete-current') {
            confirmDeleteCurrentSnapshot();
          } else {
            confirmDeleteAllSnapshots();
          }
          setShowModal(false); // Modal schließen
        }}
        onCancel={
          modalType === 'decision-undo-redo'
            ? () => {
                closeModal(); // Modal schließen
                performUndoRedo(modalUndoRedoDirection);
                setModalUndoRedoDirection(null);
              }
            : closeModal
        }
      />
    </>
  );
}
