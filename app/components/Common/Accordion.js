// /app/components/Common/Accordion.js

import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import { StyledLink, Spacer } from '@/app/components/Common/CommonStyles';

const AccordionContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0.5rem 0;
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  border-radius: 0.6rem;
  max-width: 24rem;

  @media (min-width: 768px) and (min-height: 768px) {
    width: 86%;
    max-width: 30rem;
  }
`;

const AccordionButton = styled.button`
  background-color: var(--color-accordion-title-background);
  color: var(--color-button-text);
  font-weight: 700;
  width: 100%;
  padding: 1rem 1.2rem;
  cursor: pointer;
  border: none;
  outline: none;
  display: grid;
  grid-template-columns: auto 2rem;
  gap: 0.5rem;
  align-items: center;
  text-align: left;
`;

const AccordionContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'contentHeight' && prop !== 'isOpen',
})`
  padding: ${({ isOpen }) => (isOpen ? '1rem 1rem' : '0')};
  height: ${({ isOpen, contentHeight }) => (isOpen ? `${contentHeight}px` : '0')};
  overflow: hidden;
  transition: height 0.2s ease, opacity 0.2s ease, transform 0.2s ease, padding 0.01s ease;
  background-color: var(--color-accordion-content-background);
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen }) => (isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
`;

const AccordionIcon = ({ isOpen }) => (
  <svg
    height='2rem'
    width='2rem'
    fill='var(--color-button-text)'
    style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 -960 960 960'>
    <path d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
  </svg>
);

const AccordionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

const AccordionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const AccordionListItem = styled.li`
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 1.8rem;
    margin-bottom: 0.5rem;
  }
`;

const AccordionTemplate = ({ title, content, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleAccordion = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    setIsOpen(false);
  }, [language]);

  useEffect(() => {
    if (contentRef.current && isOpen) {
      const calculatedHeight = contentRef.current.scrollHeight;
      const additionalPadding = 32;
      setContentHeight(calculatedHeight + additionalPadding);
    } else if (!isOpen) {
      setContentHeight(0);
    }
  }, [isOpen]);

  return (
    <AccordionContainer>
      <AccordionButton onClick={toggleAccordion} aria-expanded={isOpen}>
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon isOpen={isOpen} />
      </AccordionButton>
      <AccordionContent isOpen={isOpen} contentHeight={contentHeight} ref={contentRef}>
        {content}
        <Spacer height='0.8rem' />
      </AccordionContent>
    </AccordionContainer>
  );
};

const AboutProjectAccordion = () => {
  const { language } = useContext(LanguageContext);
  const content = (
    <AccordionList>
      <AccordionListItem>{getText('accordion', 'about_project_overview', language)}</AccordionListItem>
      <AccordionListItem>{getText('accordion', 'about_project_auth_focus', language)}</AccordionListItem>
      <AccordionListItem>{getText('accordion', 'about_project_language_feature', language)}</AccordionListItem>
      <AccordionListItem>
        {getText('accordion', 'about_project_content', language)}
        <StyledLink href='/info'>{getText('accordion', 'about_project_link', language)}</StyledLink>.
      </AccordionListItem>
    </AccordionList>
  );

  return (
    <AccordionTemplate
      title={getText('accordion', 'about_project_title', language)}
      content={content}
      language={language}
    />
  );
};

const HowToUseAccordion = () => {
  const { language } = useContext(LanguageContext);
  const content = (
    <AccordionList>
      <AccordionListItem>{getText('accordion', 'how_to_use_create_account', language)}</AccordionListItem>
      <AccordionListItem>{getText('accordion', 'how_to_use_add_reviews_and_saved', language)}</AccordionListItem>
      <AccordionListItem>{getText('accordion', 'how_to_use_reviews_demo', language)}</AccordionListItem>
      <AccordionListItem>{getText('accordion', 'how_to_use_language_toggle', language)}</AccordionListItem>
      <AccordionListItem>{getText('accordion', 'how_to_use_forgot_password', language)}</AccordionListItem>
      <AccordionListItem>{getText('accordion', 'how_to_use_leave_message', language)}</AccordionListItem>
    </AccordionList>
  );

  return (
    <AccordionTemplate
      title={getText('accordion', 'how_to_use_title', language)}
      content={content}
      language={language}
    />
  );
};

export { AboutProjectAccordion, HowToUseAccordion };
