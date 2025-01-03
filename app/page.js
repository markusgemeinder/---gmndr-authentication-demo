// /app/page.js
'use client';

import { useState, useContext, useEffect } from 'react';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import { Container, NarrowContainer, Title, Spacer } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { AboutProjectAccordion, HowToUseAccordion } from '@/app/components/Common/Accordion';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { language } = useContext(LanguageContext);

  const [accordionState, setAccordionState] = useState({
    aboutProject: false,
    howToUse: false,
  });

  const getLanguageText = (key) => {
    return getText('home', key, language);
  };

  useEffect(() => {
    // Reset accordion states when language changes
    setAccordionState({
      aboutProject: false,
      howToUse: false,
    });
  }, [language]);

  return (
    <Container>
      <ScrollToTop />
      <Title>{getLanguageText('title')}</Title>
      <SessionStatus />
      <Spacer height='0.8rem' />
      <AboutProjectAccordion
        isOpen={accordionState.aboutProject}
        toggleAccordion={() =>
          setAccordionState((prevState) => ({ ...prevState, aboutProject: !prevState.aboutProject }))
        }
      />
      <HowToUseAccordion
        isOpen={accordionState.howToUse}
        toggleAccordion={() => setAccordionState((prevState) => ({ ...prevState, howToUse: !prevState.howToUse }))}
      />
    </Container>
  );
}
