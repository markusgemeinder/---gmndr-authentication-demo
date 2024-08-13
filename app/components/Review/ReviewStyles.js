// /app/components/Review/ReviewStyles.js

import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const IDLabel = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 5px;
`;

export const Username = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #374151;
`;

export const Email = styled.div`
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 10px;
`;

export const Note = styled.p`
  font-size: 16px;
  color: #4b5563;
  margin-bottom: 15px;
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
`;

export const CreatedUpdated = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

export const ModalHeader = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #111827;
`;

export const ModalParagraph = styled.p`
  font-size: 16px;
  color: #374151;
  margin-bottom: 20px;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const FormContainer = styled.form`
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font-size: 16px;
  color: #374151;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font-size: 16px;
  color: #374151;
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

export const HiddenInput = styled.input`
  display: none;
`;
