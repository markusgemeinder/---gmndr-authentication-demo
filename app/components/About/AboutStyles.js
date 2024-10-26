// /app/components/About/AboutStyles.js

import styled from 'styled-components';
import Link from 'next/link';

export const AboutLinkContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AboutLink = styled(Link)`
  text-align: center;
  font-weight: 500;
  color: var(--color-link);
  text-decoration: none;

  &:hover {
    color: var(--color-link-hover);
    text-decoration: underline;
  }
`;

export const AboutImageContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin: 1rem 0;
  justify-content: center;
`;

export const AboutImageWithLink = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
