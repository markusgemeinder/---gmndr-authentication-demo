// /app/page.js

'use client';

import { useState } from 'react';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button from '@/app/components/Button/Button';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // const handleTestEmail = async () => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const response = await fetch('/api/send-test-email', {
  //       method: 'POST',
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to send test email.');
  //     }

  //     const data = await response.json();
  //     setMessage(data.message);
  //   } catch (error) {
  //     setMessage('Failed to send test email.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Container>
      <ScrollToTop />
      <Title>#GMNDR Authentication Demo</Title>
      <SessionStatus />
      {/* <Button
        onClick={handleTestEmail}
        bgColor='var(--color-button-delete)'
        hoverColor='var(--color-button-delete-hover)'
        disabled={loading}>
        {loading ? 'Sending...' : 'Send Test Email'}
      </Button> */}
      {message && <p>{message}</p>}
    </Container>
  );
}
