// /app/about/page.js

'use client';

import { Container } from '@/app/components/Common/CommonStyles';
import { NarrowContainer } from '@/app/components/About/AboutStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import NextPageButton from '@/app/components/Common/NextPageButton';
import PreviousPageButton from '@/app/components/Common/PreviousPageButton';
import { useState } from 'react';
import AboutProject from '@/app/components/About/AboutProject';
import AboutNeueFische from '@/app/components/About/AboutNeueFische';
import AboutTechstack from '@/app/components/About/AboutTechstack';
import AboutContact from '@/app/components/About/AboutContact';

const cards = [
  {
    id: 1,
    content: <AboutProject />,
  },
  {
    id: 2,
    content: <AboutNeueFische />,
  },
  {
    id: 3,
    content: <AboutTechstack />,
  },
  {
    id: 4,
    content: <AboutContact />,
  },
];

export default function About() {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <Container>
      <ScrollToTop />
      <NarrowContainer>{cards[currentCard].content}</NarrowContainer>
      <PreviousPageButton onClick={previousCard} />
      <NextPageButton onClick={nextCard} />
    </Container>
  );
}
