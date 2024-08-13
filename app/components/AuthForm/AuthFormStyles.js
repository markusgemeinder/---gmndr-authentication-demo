// /app/components/AuthForm/AuthFormStyles.js

import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';

export const Main = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export const FormContainer = styled.form`
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  margin: 1rem auto;
  padding: 1rem;
  max-width: 32rem;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 0.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: bold;
  color: #4a5568;
  margin-bottom: 0.4rem;
  margin-right: 0.5rem;
`;

export const InputContainer = styled.div`
  margin-bottom: 0.8rem;
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
`;

export const ToggleVisibility = styled.button`
  position: absolute;
  top: 40%;
  right: 0.7rem;
  transform: translateY(-40%);
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568;
  display: flex;
  align-items: center;
`;
export const PasswordVisibleIcon = styled(FaEye)``;

export const PasswordHiddenIcon = styled(FaEyeSlash)``;

export const WarningMessage = styled.p`
  color: #e00;
  font-size: 0.875rem;
  margin: 0.5rem 0;
  text-align: center;
`;

export const PasswordQualityWarning = styled(WarningMessage)`
  text-align: left;
`;

export const CheckIcon = styled(FaCheck)`
  color: green;
  margin-right: 0.5rem;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--color-text-light);
    margin: 0 0.8rem;
  }

  span {
    color: var(--color-text-light);
    font-size: 0.875rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
`;
