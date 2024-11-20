// /app/components/ColorPaletteGenerator/SnapshotControllerModalPopup.js

import { useContext } from 'react';
import styled from 'styled-components';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 90%;

  @media (min-width: 768px) and (min-height: 768px) {
    width: 80%;
    max-width: 30rem;
  }
`;

const ModalHeader = styled.h3`
  margin-bottom: 0.6rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
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
  height: 48px;
  max-width: 120px;
  background-color: var(--color-primary-500);
  &:hover {
    background-color: var(--color-primary-600);
  }

  @media (min-width: 768px) and (min-height: 768px) {
    width: 100%;
    max-width: 120px;
  }
`;

const ModalConfirmButton = styled(ModalButton)`
  background-color: var(--color-primary-500);
  &:hover {
    background-color: var(--color-primary-600);
  }
`;

const ModalCancelButton = styled(ModalButton)`
  background-color: var(--color-secondary-300);
  &:hover {
    background-color: var(--color-secondary-500);
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
