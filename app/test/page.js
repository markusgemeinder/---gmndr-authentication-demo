'use client';

import { useState } from 'react';
import { Container, Title, Subtitle, Headline, Paragraph } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button, { ButtonContainerVertical } from '@/app/components/Button/Button';

export default function Test() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [languageButtonText, setLanguageButtonText] = useState('Switch Language Forth');

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

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

  const handleSwitchLanguage = () => {
    setLanguageButtonText((prevText) =>
      prevText === 'Switch Language Forth' ? 'Switch Language Back' : 'Switch Language Forth'
    );
  };

  return (
    <Container>
      <ScrollToTop />
      <Title>Test Page | Improving User Experience</Title>
      <Subtitle>Designing a Clear and Intuitive Interface</Subtitle>
      <Headline>Our Approach to Enhanced Usability</Headline>
      <Paragraph>
        Our goal is to simplify digital navigation, making information easy to access. A clear design helps users find
        what they need, improving overall satisfaction and engagement with the platform.
      </Paragraph>
      <Paragraph>
        {getGreeting()}, upcoming updates will focus on customizable features for a more personal experience. By
        listening to feedback, we aim to create an interface that adapts to various user needs seamlessly.
      </Paragraph>
      <ButtonContainerVertical>
        <Button
          onClick={handleSwitchLanguage}
          bgColor='var(--color-button-secondary)'
          hoverColor='var(--color-button-secondary-hover)'>
          {languageButtonText}
        </Button>
        <Button
          onClick={handleTestEmail}
          bgColor='var(--color-button-delete)'
          hoverColor='var(--color-button-delete-hover)'
          disabled={loading}>
          {loading ? 'Sending...' : 'Send Test Email'}
        </Button>
        {message && <p>{message}</p>}
      </ButtonContainerVertical>
    </Container>
  );
}
