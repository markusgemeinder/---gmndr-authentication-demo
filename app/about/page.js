// /app/about/page.js

'use client';

import { Container, NarrowContainer } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import NavigationButtonNextPage from '@/app/components/Button/NavigationButtonNextPage';
import NavigationButtonPreviousPage from '@/app/components/Button/NavigationButtonPreviousPage';
import { PaginationContainer, Pagination } from '@/app/components/About/AboutStyles';
import { useState, useEffect } from 'react';
import AboutProject from '@/app/components/About/AboutProject';
import AboutNeueFische from '@/app/components/About/AboutNeueFische';
import AboutTechstack from '@/app/components/About/AboutTechstack';
import AboutContact from '@/app/components/About/AboutContact';

const cards = [
  { id: 1, content: <AboutProject /> },
  { id: 2, content: <AboutContact /> },
  { id: 3, content: <AboutNeueFische /> },
  { id: 4, content: <AboutTechstack /> },
];

export default function About() {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      nextCard();
    } else if (event.key === 'ArrowLeft') {
      previousCard();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
