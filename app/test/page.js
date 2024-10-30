// /app/test/page.js

'use client';

import { useState, useContext } from 'react';
import { Container, Title, Subtitle, Headline, Paragraph } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button, { ButtonContainerVertical } from '@/app/components/Button/Button';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function Test() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return getText('test', 'greeting_morning', language);
    if (currentHour < 18) return getText('test', 'greeting_afternoon', language);
    return getText('test', 'greeting_evening', language);
  };

  const handleTestEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-test-email', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(getText('test', 'email_failure', language));
      }

      const data = await response.json();
      setMessage(data.message || getText('test', 'email_success', language));
    } catch (error) {
      setMessage(getText('test', 'email_failure', language));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollToTop />
      <Title>{getText('test', 'title', language)}</Title>
      <Subtitle>{getText('test', 'subtitle', language)}</Subtitle>
      <Headline>{getText('test', 'headline', language)}</Headline>
      <Paragraph>{getText('test', 'paragraph_intro', language)}</Paragraph>
      <Paragraph>{`${getGreeting()}, ${getText('test', 'paragraph_updates', language)}`}</Paragraph>
      <ButtonContainerVertical>
        <Button
          onClick={toggleLanguage}
          bgColor='var(--color-button-secondary)'
          hoverColor='var(--color-button-secondary-hover)'>
          {getText('test', 'switch_language', language)}
        </Button>
        <Button
          onClick={handleTestEmail}
          bgColor='var(--color-button-delete)'
          hoverColor='var(--color-button-delete-hover)'
          disabled={loading}>
          {loading ? getText('test', 'button_sending', language) : getText('test', 'button_send_email', language)}
        </Button>
        {message && <p>{message}</p>}
      </ButtonContainerVertical>
    </Container>
  );
}
