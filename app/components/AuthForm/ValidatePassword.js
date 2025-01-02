// /app/components/AuthForm/ValidatePassword.js

import { useState, useRef, useContext, useEffect } from 'react';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
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

  const getLanguageText = (key) => {
    return getText('validate_password', key, language);
  };

  const criteria = [
    { id: 'min_length', test: (pwd) => pwd.length >= 8, text: getLanguageText('min_length') },
    { id: 'uppercase', test: (pwd) => /[A-Z]/.test(pwd), text: getLanguageText('uppercase') },
    { id: 'lowercase', test: (pwd) => /[a-z]/.test(pwd), text: getLanguageText('lowercase') },
    { id: 'digit', test: (pwd) => /[0-9]/.test(pwd), text: getLanguageText('digit') },
    {
      id: 'special_character',
      test: (pwd) => /[^A-Za-z0-9\s]/.test(pwd) && !/\s/.test(pwd),
      text: getLanguageText('special_character'),
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
    if (!isPasswordValid) setRepeatPassword('');
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
          <Label htmlFor='password'>{getLanguageText('label_password')}:</Label>
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
            title={passwordVisible ? getLanguageText('toggle_hide') : getLanguageText('toggle_show')}
            aria-label={passwordVisible ? getLanguageText('toggle_hide') : getLanguageText('toggle_show')}>
            {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
          </ToggleVisibility>
        </InputContainer>
      </InputGroup>

      {hasRepeatPassword && isPasswordValid && (
        <InputGroup>
          <LabelContainer>
            <Label htmlFor='repeat-password'>{getLanguageText('label_repeat_password')}:</Label>
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

      <CriteriaList>
        {hasRepeatPassword && isPasswordValid && (
          <CriteriaItem valid={passwordsMatch}>
            {passwordsMatch ? <CheckIcon /> : <ErrorIcon />}
            <span>{getLanguageText('error_mismatch')}</span>
          </CriteriaItem>
        )}

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
