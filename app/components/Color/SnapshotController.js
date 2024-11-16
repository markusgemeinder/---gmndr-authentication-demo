// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaTrash } from 'react-icons/fa';
import { loadSnapshotsFromLocalStorage, saveSnapshotsToLocalStorage } from './utils/localStorageUtils';
import {
  SnapshotContainer,
  SnapshotButton,
  DeleteButton,
  ButtonText,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalButton,
  CancelButton,
  OKModalButton,
  ModalButtonContainer, // Container für die Buttons
} from './SnapshotControllerStyles';

const SNAPSHOT_LIMIT = 5;

export default function SnapshotController({ state }) {
  const { snapshots: initialSnapshots } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [isSnapshotLimitReached, setIsSnapshotLimitReached] = useState(snapshots.length >= SNAPSHOT_LIMIT);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState('');

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

  useEffect(() => {
    setIsSnapshotLimitReached(snapshots.length >= SNAPSHOT_LIMIT);
    saveSnapshotsToLocalStorage(snapshots);
  }, [snapshots]);

  const handleSnapshot = () => {
    if (snapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Maximum erreicht – kein weiterer Snapshot möglich!');
      return setShowDeleteModal(true);
    }

    if (snapshots.length === SNAPSHOT_LIMIT - 1) {
      // Warnmeldung, dass das Limit erreicht ist, aber der Snapshot gespeichert wird
      setInfoModalMessage('Snapshot gespeichert. Maximum erreicht – kein weiterer Snapshot möglich!');
      setSnapshots([...snapshots, formData]);
      return setShowDeleteModal(true);
    }

    // Normaler Snapshot ohne Warnmeldung
    const newSnapshots = [...snapshots, formData];
    setSnapshots(newSnapshots); // Füge den neuen Snapshot hinzu
  };

  const handleDeleteAll = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Kein Snapshot vorhanden.');
      return setShowDeleteModal(true);
    }

    setInfoModalMessage('Alle Snapshots löschen?');
    setShowDeleteModal(true);
  };

  const confirmDeleteAll = () => {
    setSnapshots([]);
    setShowDeleteModal(false);
    setInfoModalMessage('');
  };

  const closeInfoModal = () => {
    setShowDeleteModal(false);
    setInfoModalMessage('');
  };

  return (
    <>
      <SnapshotContainer>
        <SnapshotButton onClick={handleSnapshot} isSnapshotLimitReached={isSnapshotLimitReached}>
          {snapshots.length >= SNAPSHOT_LIMIT ? <FaStackOverflow /> : <FaCamera />}
          <ButtonText>{snapshots.length}</ButtonText>
        </SnapshotButton>
        <DeleteButton onClick={handleDeleteAll}>
          <FaTrash />
        </DeleteButton>
      </SnapshotContainer>

      {showDeleteModal && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>{infoModalMessage}</ModalHeader>
            <ModalButtonContainer>
              <ModalButton onClick={confirmDeleteAll}>Ja</ModalButton>
              <CancelButton onClick={closeInfoModal}>Nein</CancelButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}
