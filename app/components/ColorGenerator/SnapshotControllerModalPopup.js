// /app/components/ColorGenerator/SnapshotControllerModalPopup.js

import { useContext } from 'react';
import styled from 'styled-components';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--color-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  padding: 1rem;

  /* Für kleinere Geräte: Setze zusätzliche Polsterung */
  @media (max-width: 767px) {
    padding: 2rem;
  }
`;

const ModalContent = styled.div`
  background-color: var(--color-modal-content);
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  width: 90%;
  max-width: 600px;

  @media (min-width: 768px) {
    width: 80%;
    max-width: 30rem;
  }

  /* Anpassung für sehr kleine Bildschirme */
  @media (max-width: 600px) {
    padding: 1.5rem;
    gap: 1rem;
    width: 95%;
  }
`;

const ModalHeader = styled.h3`
  margin-bottom: 0.8rem;
  color: var(--color-modal-header);
  text-align: center;
  font-size: 1.25rem;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`;

const ModalButton = styled.button`
  color: var(--color-white);
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  max-width: 120px;
  height: 48px;
  background-color: var(--color-button-primary);

  &:hover {
    background-color: var(--color-button-primary-hover);
  }

  @media (max-width: 767px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    max-width: 100px;
    height: 42px;
  }
`;

const ModalConfirmButton = styled(ModalButton)`
  background-color: var(--color-button-primary);
  &:hover {
    background-color: var(--color-button-primary-hover);
  }
`;

const ModalCancelButton = styled(ModalButton)`
  background-color: var(--color-button-secondary-light);
  &:hover {
    background-color: var(--color-button-secondary-light-hover);
  }
`;

export default function SnapshotControllerModalPopup({ showModal, modalType, infoModalMessage, onConfirm, onCancel }) {
  const { language } = useContext(LanguageContext);

  // ===== Sprachtext-Abfrage
  const getLanguageText = (key) => {
    return getText('snapshotControllerModal', key, language);
  };

  if (!showModal) return null;

  const renderModalButtons = () => {
    switch (modalType) {
      case 'decision-delete-current':
        return (
          <>
            <ModalConfirmButton onClick={onConfirm}>{getLanguageText('modalConfirm')}</ModalConfirmButton>
            <ModalCancelButton onClick={onCancel}>{getLanguageText('modalCancel')}</ModalCancelButton>
          </>
        );
      case 'decision-delete-all':
        return (
          <>
            <ModalConfirmButton onClick={onConfirm}>{getLanguageText('modalConfirm')}</ModalConfirmButton>
            <ModalCancelButton onClick={onCancel}>{getLanguageText('modalCancel')}</ModalCancelButton>
          </>
        );
      case 'decision-undo-redo':
        return (
          <>
            <ModalConfirmButton onClick={onConfirm}>{getLanguageText('modalConfirm')}</ModalConfirmButton>
            <ModalCancelButton onClick={onCancel}>{getLanguageText('modalCancel')}</ModalCancelButton>
          </>
        );
      case 'info':
        return <ModalConfirmButton onClick={onCancel}>{getLanguageText('modalOk')}</ModalConfirmButton>;
      default:
        return null;
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>{infoModalMessage}</ModalHeader>
        <ModalButtonContainer>{renderModalButtons()}</ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
