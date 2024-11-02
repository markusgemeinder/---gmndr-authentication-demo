// /app/page.js

'use client';

import { useState, useContext } from 'react';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button from '@/app/components/Button/Button';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { language } = useContext(LanguageContext); // Zugriff auf die aktuelle Sprache

  const handleTestEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-test-email', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to send test email.');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to send test email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollToTop />
      <Title>{getText('home', 'title', language)}</Title> {/* Dynamischer Titel */}
      <SessionStatus />
      {/* <Button
        onClick={handleTestEmail}
        bgColor='var(--color-button-delete)'
        hoverColor='var(--color-button-delete-hover)'
        disabled={loading}>
        {loading ? getText('home', 'button_sending', language) : getText('home', 'button_send_email', language)}
      </Button>
      {message && <p>{message}</p>} */}
    </Container>
  );
}
