// /app/components/AuthForm/AuthFormStyles.js

import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';

// Main container for the form
export const Main = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Title of the form
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem; /* Adjusted margin for better spacing */
  color: var(--color-text);
`;

// Form container
export const FormContainer = styled.form`
  background-color: var(--color-form-background);
  border: 1px solid var(--color-form-border);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slightly deeper shadow */
  border-radius: 0.375rem;
  margin: 1rem auto;
  padding: 1.5rem;
  max-width: 32rem;
  width: 90%;
  box-sizing: border-box;
`;

// Group of form fields
export const FormGroup = styled.div`
  margin-bottom: 0.6rem;
  display: flex;
  flex-direction: column;
`;

// Container for label and its content
export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
`;

// Label styling
export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-label);
  margin: 0 0.5rem;
  line-height: 1.2;
`;

// Container for input fields
export const InputContainer = styled.div`
  position: relative;
`;

// Input field styling
export const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  background-color: var(--color-input-background);
  border: 1px solid var(--color-input-border);
  border-radius: 0.4rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

// Button to toggle password visibility
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

// Icons for password visibility toggle
export const PasswordVisibleIcon = styled(FaEye)``;
export const PasswordHiddenIcon = styled(FaEyeSlash)``;

// Warning message for form validation
export const WarningMessage = styled.p`
  color: var(--color-warning);
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

// Check icon for password strength or validation
export const CheckIcon = styled(FaCheck)`
  color: var(--color-button-review);
  margin: 0 0.5rem;
`;

// Divider for form sections
export const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.6rem 0;

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
