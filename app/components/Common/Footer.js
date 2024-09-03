'use client';

import styled from 'styled-components';

// Footer container with fixed positioning at the bottom
const FooterContainer = styled.footer`
  background-color: var(--color-footer);
  color: var(--color-footer-text);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure footer is above other content */
`;

// Container for the content inside the footer
const FooterContent = styled.div`
  text-align: center;
  margin: 0.6rem;
`;

// Styled paragraph for the footer text
const FooterText = styled.p`
  font-size: 0.8rem;
`;

// Footer component
export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; 2024 #GMNDR</FooterText>
      </FooterContent>
    </FooterContainer>
  );
}
