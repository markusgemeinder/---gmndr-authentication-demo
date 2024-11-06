// /app/page.js
'use client';

import { useState, useContext, useEffect } from 'react';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import { Container, NarrowContainer, Title, Spacer } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { AboutProjectAccordion, HowToUseAccordion } from '@/app/components/Common/Accordion';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [accordionState, setAccordionState] = useState({
    aboutProject: false,
    howToUse: false,
  });

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
      <Title>{getText('home', 'title', language)}</Title>
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
