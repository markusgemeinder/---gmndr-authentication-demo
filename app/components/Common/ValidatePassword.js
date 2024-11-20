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
  CriteriaList,
  CriteriaItem,
  PasswordVisibleIcon,
  PasswordHiddenIcon,
  CheckIcon,
  ErrorIcon,
} from '@/app/components/AuthForm/AuthFormStyles';

export default function ValidatePassword({ hasRepeatPassword = false, onPasswordValid }) {
  const { language } = useContext(LanguageContext);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordInputRef = useRef(null);

  const criteria = [
    { id: 'min_length', test: (pwd) => pwd.length >= 8, text: getText('validate_password', 'min_length', language) },
    { id: 'uppercase', test: (pwd) => /[A-Z]/.test(pwd), text: getText('validate_password', 'uppercase', language) },
    { id: 'lowercase', test: (pwd) => /[a-z]/.test(pwd), text: getText('validate_password', 'lowercase', language) },
    { id: 'digit', test: (pwd) => /[0-9]/.test(pwd), text: getText('validate_password', 'digit', language) },
    {
      id: 'special_character',
      test: (pwd) => /[^A-Za-z0-9\s]/.test(pwd) && !/\s/.test(pwd),
      text: getText('validate_password', 'special_character', language),
    },
  ];

  const isPasswordValid = criteria.every((criterion) => criterion.test(password));
  const passwordsMatch = password === repeatPassword && repeatPassword.length > 0;
  const isOverallValid = isPasswordValid && (!hasRepeatPassword || passwordsMatch);

  useEffect(() => {
    onPasswordValid(isOverallValid, password);
  }, [isOverallValid, password]);

  function handlePasswordChange(pwd) {
    setPassword(pwd);
    if (!isPasswordValid) setRepeatPassword(''); // Reset Repeat Password if the main password becomes invalid
  }

  function handleRepeatPasswordChange(pwd) {
    setRepeatPassword(pwd);
  }

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);

    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }

  return (
    <>
      {/* Passwortfeld */}
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='password'>{getText('validate_password', 'label_password', language)}:</Label>
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
      </InputGroup>

      {/* Repeat Password Feld (wird erst angezeigt, wenn alle Kriterien erfüllt sind) */}
      {hasRepeatPassword && isPasswordValid && (
        <InputGroup>
          <LabelContainer>
            <Label htmlFor='repeat-password'>{getText('validate_password', 'label_repeat_password', language)}:</Label>
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
        </InputGroup>
      )}

      {/* Kriterienliste */}
      <CriteriaList>
        {/* Fehleranzeige für Nicht-Übereinstimmung */}
        {hasRepeatPassword && isPasswordValid && (
          <CriteriaItem valid={passwordsMatch}>
            {passwordsMatch ? <CheckIcon /> : <ErrorIcon />}
            <span>{getText('validate_password', 'error_mismatch', language)}</span>
          </CriteriaItem>
        )}

        {/* Kriterien für Passwortprüfung */}
        {criteria.map(({ id, test, text }) => (
          <CriteriaItem key={id} valid={test(password)}>
            {test(password) ? <CheckIcon /> : <ErrorIcon />}
            <span>{text}</span>
          </CriteriaItem>
        ))}
      </CriteriaList>
    </>
  );
}
