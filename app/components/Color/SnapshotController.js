// /app/components/Color/SnapshotController.js

import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaTrash } from 'react-icons/fa';
import { loadSnapshotsFromLocalStorage, saveSnapshotsToLocalStorage } from './utils/localStorageUtils';
import {
  SnapshotContainer,
  SnapshotButton,
  DeleteButton,
  ButtonText,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalButton,
  CancelButton,
  OKModalButton,
  ModalButtonContainer,
} from './SnapshotControllerStyles';

const SNAPSHOT_LIMIT = 5;

export default function SnapshotController({ state }) {
  const { snapshots: initialSnapshots } = loadSnapshotsFromLocalStorage();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [isSnapshotLimitReached, setIsSnapshotLimitReached] = useState(snapshots.length >= SNAPSHOT_LIMIT);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'info' oder 'decision'
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
      setInfoModalMessage('Maximum erreicht, kein weiterer Snapshot möglich.');
      setModalType('info'); // Info-Modal aufrufen
      return setShowModal(true);
    }

    if (snapshots.length === SNAPSHOT_LIMIT - 1) {
      // Warnmeldung, dass das Limit erreicht ist, aber der Snapshot gespeichert wird
      setInfoModalMessage('Snapshot gespeichert. Bitte beachten: Maximum erreicht, kein weiterer Snapshot möglich.');
      setSnapshots([...snapshots, formData]);
      setModalType('info'); // Info-Modal
      return setShowModal(true);
    }

    // Normaler Snapshot ohne Warnmeldung
    const newSnapshots = [...snapshots, formData];
    setSnapshots(newSnapshots);
  };

  const handleDeleteAll = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Kein Snapshot zum Löschen vorhanden.');
      setModalType('info'); // Info-Modal
      return setShowModal(true);
    }

    setInfoModalMessage('Alle Snapshots löschen?');
    setModalType('decision'); // Decision-Modal
    setShowModal(true);
  };

  const confirmDeleteAll = () => {
    setSnapshots([]);
    setShowModal(false);
    setInfoModalMessage('');
  };

  const closeModal = () => {
    setShowModal(false);
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

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{infoModalMessage}</ModalHeader>
            <ModalButtonContainer>
              {modalType === 'decision' ? (
                <>
                  <ModalButton onClick={confirmDeleteAll}>Ja</ModalButton>
                  <CancelButton onClick={closeModal}>Nein</CancelButton>
                </>
              ) : (
                <OKModalButton onClick={closeModal}>OK</OKModalButton>
              )}
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
