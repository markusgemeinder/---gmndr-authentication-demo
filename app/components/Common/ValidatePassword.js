// /app/components/Common/ValidatePassword.js

import { useState } from 'react';
import {
  FormGroup,
  LabelContainer,
  Label,
  Input,
  InputContainer,
  ToggleVisibility,
  CheckIcon,
  ErrorIcon,
  WarningMessage,
  PasswordVisibleIcon,
  PasswordHiddenIcon,
} from '@/app/components/AuthForm/AuthFormStyles';

function validatePassword(password) {
  if (password.length < 8) return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one digit.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character.';
  return '';
}

export default function ValidatePassword({ hasRepeatPassword = false, onPasswordValid }) {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordQuality, setPasswordQuality] = useState(null); // Set initial state to null
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  function handlePasswordChange(pwd) {
    setPassword(pwd);
    const validationMessage = validatePassword(pwd);
    setPasswordQuality(validationMessage); // Will be '' if password is valid, otherwise an error message
    onPasswordValid(!validationMessage && (!hasRepeatPassword || (hasRepeatPassword && passwordsMatch)));
  }

  function handleRepeatPasswordChange(pwd) {
    setRepeatPassword(pwd);
    const match = password === pwd;
    setPasswordsMatch(match);
    onPasswordValid(!passwordQuality && match);
  }

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='password'>Password:</Label>
          {password.length > 0 && !passwordQuality ? <CheckIcon /> : password.length > 0 ? <ErrorIcon /> : null}
        </LabelContainer>
        <InputContainer>
          <Input
            id='password'
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />
          <ToggleVisibility onClick={togglePasswordVisibility} type='button'>
            {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
          </ToggleVisibility>
        </InputContainer>
        {password.length > 0 && passwordQuality && <WarningMessage>{passwordQuality}</WarningMessage>}
      </FormGroup>

      {/* Only show Repeat Password if password is valid (passwordQuality === '') */}
      {hasRepeatPassword && passwordQuality === '' && (
        <FormGroup>
          <LabelContainer>
            <Label htmlFor='repeat-password'>Repeat Password:</Label>
            {repeatPassword.length > 0 && passwordsMatch ? (
              <CheckIcon />
            ) : repeatPassword.length > 0 ? (
              <ErrorIcon />
            ) : null}
          </LabelContainer>
          <InputContainer>
            <Input
              id='repeat-password'
              type={passwordVisible ? 'text' : 'password'}
              value={repeatPassword}
              onChange={(e) => handleRepeatPasswordChange(e.target.value)}
              required
            />
          </InputContainer>
          {repeatPassword.length > 0 && !passwordsMatch && <WarningMessage>Passwords do not match.</WarningMessage>}
        </FormGroup>
      )}
    </>
  );
}
