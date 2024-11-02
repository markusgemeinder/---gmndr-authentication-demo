// /app/info/page.js

'use client';

import { Container, NarrowContainer } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import NavigationButtonNextPage from '@/app/components/Button/NavigationButtonNextPage';
import NavigationButtonPreviousPage from '@/app/components/Button/NavigationButtonPreviousPage';
import { PaginationContainer, Pagination } from '@/app/components/Info/InfoStyles';
import { useState, useEffect, useCallback } from 'react';
import InfoProject from '@/app/components/Info/InfoProject';
import InfoNeueFische from '@/app/components/Info/InfoNeueFische';
import InfoTechstack from '@/app/components/Info/InfoTechstack';
import InfoContact from '@/app/components/Info/InfoContact';

const cards = [
  { id: 1, content: <InfoProject /> },
  { id: 2, content: <InfoContact /> },
  { id: 3, content: <InfoNeueFische /> },
  { id: 4, content: <InfoTechstack /> },
];

export default function Info() {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      nextCard();
    } else if (event.key === 'ArrowLeft') {
      previousCard();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Container>
      <ScrollToTop />
      <NarrowContainer>{cards[currentCard].content}</NarrowContainer>

      <PaginationContainer>
        <Pagination>{`${currentCard + 1}/${cards.length}`}</Pagination>
      </PaginationContainer>

      <NavigationButtonPreviousPage onClick={previousCard} />
      <NavigationButtonNextPage onClick={nextCard} />
    </Container>
  );
}
