// /app/components/Common/ValidatePassword.js

import { useState, useRef, useContext, useEffect } from 'react';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import {
  InputGroup,
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

export default function ValidatePassword({ hasRepeatPassword = false, onPasswordValid }) {
  const { language } = useContext(LanguageContext);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordQuality, setPasswordQuality] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const passwordInputRef = useRef(null);

  function validatePassword(password) {
    if (password.length < 8) return getText('validate_password', 'error_min_length', language);
    if (!/[A-Z]/.test(password)) return getText('validate_password', 'error_uppercase', language);
    if (!/[a-z]/.test(password)) return getText('validate_password', 'error_lowercase', language);
    if (!/[0-9]/.test(password)) return getText('validate_password', 'error_digit', language);
    if (!/[^A-Za-z0-9]/.test(password)) return getText('validate_password', 'error_special_char', language);
    return null; // No error
  }

  function handlePasswordChange(pwd) {
    setPassword(pwd);
  }

  function handleRepeatPasswordChange(pwd) {
    setRepeatPassword(pwd);
    const match = password === pwd;
    setPasswordsMatch(match);
    onPasswordValid(!passwordQuality && match, password);
  }

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);

    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }

  // Validate password on every change
  useEffect(() => {
    const validationMessage = validatePassword(password);
    setPasswordQuality(validationMessage);

    const isValid = !validationMessage && (!hasRepeatPassword || (hasRepeatPassword && passwordsMatch));
    onPasswordValid(isValid, password);
  }, [password, passwordsMatch, hasRepeatPassword, language]); // Ensure validation runs on language change

  const isPasswordValid = !passwordQuality; // True if password is valid

  return (
    <>
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='password'>{getText('validate_password', 'label_password', language)}:</Label>
          {password.length > 0 && isPasswordValid ? <CheckIcon /> : password.length > 0 ? <ErrorIcon /> : null}
        </LabelContainer>
        <InputContainer>
          <Input
            id='password'
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
            ref={passwordInputRef}
          />
          <ToggleVisibility
            onClick={togglePasswordVisibility}
            type='button'
            title={
              passwordVisible
                ? getText('validate_password', 'toggle_hide', language)
                : getText('validate_password', 'toggle_show', language)
            }
            aria-label={
              passwordVisible
                ? getText('validate_password', 'toggle_hide', language)
                : getText('validate_password', 'toggle_show', language)
            }>
            {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
          </ToggleVisibility>
        </InputContainer>
        {passwordQuality && <WarningMessage>{passwordQuality}</WarningMessage>}
      </InputGroup>

      {hasRepeatPassword && isPasswordValid && (
        <InputGroup>
          <LabelContainer>
            <Label htmlFor='repeat-password'>{getText('validate_password', 'label_repeat_password', language)}:</Label>
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
          {repeatPassword.length > 0 && !passwordsMatch && (
            <WarningMessage>{getText('validate_password', 'error_mismatch', language)}</WarningMessage>
          )}
        </InputGroup>
      )}
    </>
  );
}
