// /app/components/AuthForm/AuthFormStyles.js

import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export const FormContainer = styled.form`
  background-color: var(--color-form-background);
  border: 1px solid var(--color-form-border);
  border-radius: 0.6rem;
  margin: 0 auto;
  padding: 1.5rem;
  max-width: 32rem;
  width: 100%;
  /* box-sizing: border-box; */
`;

export const InputGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-top: 0;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-label);
  margin: 0 0.5rem;
  line-height: 1.2;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  background-color: var(--color-input-background);
  border: 1px solid var(--color-input-border);
  border-radius: 0.4rem;
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

export const CheckIcon = styled(FaCheck)`
  color: var(--color-check-ok);
  margin: 0 0.2rem;
`;

export const ErrorIcon = styled(FaTimes)`
  color: var(--color-check-warning);
  margin: 0 0.2rem;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1.4rem;
  margin-bottom: 1rem;

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

  @media (min-width: 768px) and (min-height: 768px) {
    margin-top: 1.8rem;
    margin-bottom: 1.4rem;
  }
`;

export const WarningMessage = styled.p`
  color: var(--color-check-warning);
  font-size: 0.875rem;
  padding: 0.8rem;
  line-height: 1.2;
  text-align: center;
  font-weight: 700;
`;

export const IconButtonImage = styled(Image)`
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;
