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
  color: var(--color-text);
`;

export const FormContainer = styled.form`
  background-color: var(--color-form-background);
  border: 1px solid var(--color-form-border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  margin: 1rem auto;
  padding: 1.5rem;
  max-width: 32rem;
  width: 90%;
  box-sizing: border-box;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-label);
  margin: 0 0.5rem;
  line-height: 1.5;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-input-background);
  border: 1px solid var(--color-input-border);
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

export const ToggleVisibility = styled.button`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-medium);
  display: flex;
  align-items: center;
`;

export const PasswordVisibleIcon = styled(FaEye)``;

export const PasswordHiddenIcon = styled(FaEyeSlash)``;

export const WarningMessage = styled.p`
  color: var(--color-warning);
  font-size: 0.875rem;
  margin: 0 0.5rem;
`;

export const CheckIcon = styled(FaCheck)`
  color: var(--color-button-review);
  margin-left: 0.5rem;
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