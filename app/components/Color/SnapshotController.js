// /app/components/Color/SnapshotController.js
import { useState, useEffect } from 'react';
import { FaCamera, FaStackOverflow, FaTrash, FaCheck } from 'react-icons/fa';
import {
  saveFormDataToLocalStorage,
  loadSnapshotsFromLocalStorage,
  saveSnapshotsToLocalStorage,
  saveLastUsedSnapshotToLocalStorage,
  deleteLastUsedSnapshotFromLocalStorage,
} from './utils/localStorageUtils';
import {
  SnapshotContainer,
  SnapshotButton,
  DeleteButton,
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

  useEffect(() => {
    setIsSnapshotLimitReached(snapshots.length >= SNAPSHOT_LIMIT);
    saveSnapshotsToLocalStorage(snapshots);

    // Speichern der Formulardaten unabhängig vom Snapshot
    saveFormDataToLocalStorage(state); // Hier wird die Speicherung der Formulardaten ausgeführt

    // Wenn keine Snapshots vorhanden sind, löschen wir auch lastUsedSnapshot
    if (snapshots.length === 0) {
      deleteLastUsedSnapshotFromLocalStorage(); // Löscht lastUsedSnapshot, wenn keine Snapshots existieren
    }
  }, [snapshots, state]); // Abhängigkeit von state, damit Formulardaten bei jeder Änderung gespeichert werden

  const handleSnapshot = () => {
    if (snapshots.length >= SNAPSHOT_LIMIT) {
      setInfoModalMessage('Maximum erreicht, kein weiterer Snapshot möglich.');
      setModalType('info');
      return setShowModal(true);
    }

    if (snapshots.length === SNAPSHOT_LIMIT - 1) {
      setInfoModalMessage('Snapshot gespeichert. Bitte beachten: Maximum erreicht, kein weiterer Snapshot möglich.');
      setSnapshots([...snapshots, formData]);
      setModalType('info');
      return setShowModal(true);
    }

    const newSnapshots = [...snapshots, formData];
    setSnapshots(newSnapshots);

    // Snapshot-Prozess starten
    setSnapshotInProgress(true);

    // Speichern des zuletzt erstellten Snapshots in LocalStorage
    saveLastUsedSnapshotToLocalStorage(formData);

    setTimeout(() => {
      setSnapshotInProgress(false);
    }, 1000); // 1000ms = 1 Sekunde
  };

  const handleDeleteAll = () => {
    if (snapshots.length === 0) {
      setInfoModalMessage('Kein Snapshot zum Löschen vorhanden.');
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

    // Löschen des lastUsedSnapshot beim Löschen aller Snapshots
    deleteLastUsedSnapshotFromLocalStorage();
  };

  const closeModal = () => {
    setShowModal(false);
    setInfoModalMessage('');
  };

  return (
    <>
      <SnapshotContainer>
        <SnapshotButton onClick={handleSnapshot} isSnapshotLimitReached={isSnapshotLimitReached}>
          {snapshotInProgress ? <FaCheck /> : snapshots.length >= SNAPSHOT_LIMIT ? <FaStackOverflow /> : <FaCamera />}
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
