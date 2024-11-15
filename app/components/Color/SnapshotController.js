// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaCheck, FaUndo, FaRedo, FaTimes, FaTrash } from 'react-icons/fa';
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

const SNAPSHOT_LIMIT = 5;

export default function SnapshotController({ state, onApplySnapshot }) {
  // Load snapshots from localStorage
  const { snapshots: initialSnapshots } = loadSnapshotsFromLocalStorage();

  // State variables
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [snapshotIndexBookmark, setSnapshotIndexBookmark] = useState(null);
  const [isSnapshotLimitReached, setIsSnapshotLimitReached] = useState(snapshots.length >= SNAPSHOT_LIMIT);
  const [formDataIsSnapshot, setFormDataIsSnapshot] = useState(null); // Default to null initially
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState('');
  const [deleteType, setDeleteType] = useState(null);

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

  // Utility function to log state for debugging
  const logState = () => {
    console.log('=====');
    console.log('(1) isSnapshotLimitReached:', isSnapshotLimitReached);
    console.log('(2) formData:', formData);
    console.log('(3) snapshotDataAll:', snapshots);
    console.log('(4) formDataIsSnapshot:', formDataIsSnapshot);
    console.log('(5) snapshotIndexBookmark:', snapshotIndexBookmark);
  };

  // Update state variables and localStorage whenever snapshots or index changes
  useEffect(() => {
    setIsSnapshotLimitReached(snapshots.length >= SNAPSHOT_LIMIT);

    const currentSnapshot = snapshots[snapshotIndexBookmark ?? -1]; // Guard against null bookmark
    setFormDataIsSnapshot(
      snapshots.length > 0 && currentSnapshot && JSON.stringify(currentSnapshot) === JSON.stringify(formData)
    ); // Set to true if snapshot matches, else false

    saveSnapshotsToLocalStorage(snapshots);
    logState();
  }, [snapshots, snapshotIndexBookmark, formData]);

  // Handle Snapshot Button
  const handleSnapshot = () => {
    if (snapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Maximum erreicht – kein weiterer Snapshot möglich!');
      return setShowDeleteModal(true);
    }
    if (formDataIsSnapshot) {
      setInfoModalMessage('Keine Änderungen. Snapshot nicht gespeichert.');
      return setShowDeleteModal(true);
    }

    const newSnapshots = [...snapshots.slice(0, snapshotIndexBookmark + 1), formData];
    setSnapshots(newSnapshots);
    setSnapshotIndexBookmark(newSnapshots.length - 1);
  };

  // Handle Undo Button
  const handleUndo = () => {
    if (snapshotIndexBookmark === null || snapshotIndexBookmark === 0) {
      setInfoModalMessage('Kein weiterer Snapshot vorhanden.');
      return setShowDeleteModal(true);
    }

    const prevSnapshot = snapshots[snapshotIndexBookmark - 1];
    onApplySnapshot(prevSnapshot);
    setSnapshotIndexBookmark(snapshotIndexBookmark - 1);
  };

  // Handle Redo Button
  const handleRedo = () => {
    if (snapshotIndexBookmark === null || snapshotIndexBookmark >= snapshots.length - 1) {
      setInfoModalMessage('Kein weiterer Snapshot vorhanden.');
      return setShowDeleteModal(true);
    }

    const nextSnapshot = snapshots[snapshotIndexBookmark + 1];
    onApplySnapshot(nextSnapshot);
    setSnapshotIndexBookmark(snapshotIndexBookmark + 1);
  };

  // Handle Delete Current Snapshot
  const handleDeleteCurrent = () => {
    if (snapshotIndexBookmark === null || !formDataIsSnapshot) {
      setInfoModalMessage('Kein Snapshot zum Löschen vorhanden.');
      return setShowDeleteModal(true);
    }

    setDeleteType('current');
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (deleteType === 'current') {
      const newSnapshots = snapshots.filter((_, index) => index !== snapshotIndexBookmark);
      const newBookmark =
        snapshotIndexBookmark < newSnapshots.length ? snapshotIndexBookmark : snapshotIndexBookmark - 1;
      setSnapshots(newSnapshots);
      setSnapshotIndexBookmark(newSnapshots.length ? newBookmark : null);
    } else if (deleteType === 'all') {
      setSnapshots([]);
      setSnapshotIndexBookmark(null); // Set the bookmark to null when all snapshots are deleted
      setFormDataIsSnapshot(null); // Reset to null when all snapshots are deleted
    }
    setShowDeleteModal(false); // Close the modal after confirming delete
    setDeleteType(null); // Reset deleteType to avoid previous state issues
    setInfoModalMessage(''); // Clear any info modal message after closing
  };

  // Handle Delete All Snapshots
  const handleDeleteAll = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Kein Snapshot vorhanden.');
      return setShowDeleteModal(true);
    }

    setDeleteType('all');
    setShowDeleteModal(true);
  };

  // Handle Info Modal Closure
  const closeInfoModal = () => {
    setInfoModalMessage(''); // Clear any info modal message
    setShowDeleteModal(false); // Close modal after confirmation
  };

  return (
    <>
      <SnapshotContainer>
        <SnapshotButton onClick={handleSnapshot} isSnapshotLimitReached={isSnapshotLimitReached}>
          {snapshots.length >= SNAPSHOT_LIMIT ? <FaStackOverflow /> : formDataIsSnapshot ? <FaCheck /> : <FaCamera />}
          <ButtonText>{snapshots.length}</ButtonText>
        </SnapshotButton>

        <UndoButton onClick={handleUndo}>
          <FaUndo />
          <ButtonText>{snapshotIndexBookmark !== null ? snapshotIndexBookmark : 0}</ButtonText>
        </UndoButton>

        <RedoButton onClick={handleRedo}>
          <FaRedo />
          <ButtonText>{snapshots.length - (snapshotIndexBookmark + 1 || 0)}</ButtonText>
        </RedoButton>

        <DeleteButton onClick={handleDeleteCurrent}>
          <FaTimes />
        </DeleteButton>
        <DeleteButton onClick={handleDeleteAll}>
          <FaTrash />
        </DeleteButton>
      </SnapshotContainer>

      {showDeleteModal && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              {deleteType === 'current' ? 'Aktuellen Snapshot löschen?' : 'Alle Snapshots löschen?'}
            </ModalHeader>
            <div>
              <ModalButton onClick={confirmDelete}>OK</ModalButton>
              <CancelButton onClick={closeInfoModal}>Abbrechen</CancelButton>
            </div>
          </ModalContent>
        </ModalContainer>
      )}

      {infoModalMessage && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>{infoModalMessage}</ModalHeader>
            <div>
              <ModalButton onClick={closeInfoModal}>OK</ModalButton>
            </div>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}
