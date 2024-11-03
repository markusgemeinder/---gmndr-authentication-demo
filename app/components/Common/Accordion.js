// /app/components/Common/Accordion.js

import { useState, useContext } from 'react';
import styled from 'styled-components';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import { StyledLink } from '@/app/components/Common/CommonStyles';

const AccordionContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0.5rem 0;
  background-color: var(--color-form-background);
  border: 1px solid var(--color-border);
  border-radius: 0.6rem;

  @media (min-width: 768px) and (min-height: 768px) {
    width: 86%;
  }
`;

const AccordionButton = styled.button`
  background-color: var(--color-accordion-background);
  color: var(--color-button-text);
  font-weight: 700;
  width: 100%;
  text-align: left;
  padding: 1rem 1.2rem;
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.5s ease, transform 0.5s ease;
  background-color: var(--color-form-background);
  padding: ${({ isOpen }) => (isOpen ? '1rem' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen }) => (isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
`;

const AccordionIcon = ({ isOpen }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 -960 960 960'
    height='30'
    width='30'
    fill='var(--color-button-text)'
    style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
    <path d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
  </svg>
);

const AccordionTitle = styled.span`
  font-weight: 700;
`;

const AccordionParagraph = styled.p`
  margin: 0.2rem;
  transition: opacity 0.2s ease;
`;

const AccordionList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
`;

const AccordionListItem = styled.li`
  margin: 0 0.8rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-border);
  hyphens: auto;
  word-wrap: break-word;

  &:last-child {
    border-bottom: none;
  }
`;

const AboutProjectAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useContext(LanguageContext);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <AccordionContainer>
      <AccordionButton onClick={toggleAccordion} aria-expanded={isOpen}>
        <AccordionTitle>{getText('accordion', 'about_project_title', language)}</AccordionTitle>
        <AccordionIcon isOpen={isOpen} />
      </AccordionButton>
      <AccordionContent isOpen={isOpen}>
        <AccordionParagraph>
          {getText('accordion', 'about_project_content', language)}{' '}
          <StyledLink href='/info'>{getText('accordion', 'about_project_link', language)}</StyledLink>.
        </AccordionParagraph>
      </AccordionContent>
    </AccordionContainer>
  );
};

const HowToUseAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useContext(LanguageContext);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <AccordionContainer>
      <AccordionButton onClick={toggleAccordion} aria-expanded={isOpen}>
        <AccordionTitle>{getText('accordion', 'how_to_use_title', language)}</AccordionTitle>
        <AccordionIcon isOpen={isOpen} />
      </AccordionButton>
      <AccordionContent isOpen={isOpen}>
        <AccordionList>
          <AccordionListItem>{getText('accordion', 'how_to_use_create_account', language)}</AccordionListItem>
          <AccordionListItem>{getText('accordion', 'how_to_use_add_reviews', language)}</AccordionListItem>
          <AccordionListItem>{getText('accordion', 'how_to_use_reviews_saved', language)}</AccordionListItem>
          <AccordionListItem>{getText('accordion', 'how_to_use_reviews_demo', language)}</AccordionListItem>
          <AccordionListItem>{getText('accordion', 'how_to_use_language_toggle', language)}</AccordionListItem>
          <AccordionListItem>{getText('accordion', 'how_to_use_forgot_password', language)}</AccordionListItem>
          <AccordionListItem>{getText('accordion', 'how_to_use_leave_message', language)}</AccordionListItem>
        </AccordionList>
      </AccordionContent>
    </AccordionContainer>
  );
};

export { AboutProjectAccordion, HowToUseAccordion };
