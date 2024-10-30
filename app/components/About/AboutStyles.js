// /app/components/About/AboutStyles.js

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

export const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
  gap: 0.6rem;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) and (min-height: 768px) {
    gap: 1rem;
    flex-direction: row;
  }
`;

export const Avatar = styled(Image)`
  width: 160px;
  height: 160px;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);

  @media (min-width: 768px) and (min-height: 768px) {
    width: 220px;
    height: 220px;
  }
`;

export const PaginationContainer = styled.div`
  position: fixed;
  top: 4.6rem;
  right: 0.6rem;
  display: flex;
  gap: 0.4rem;
  z-index: 10;

  @media (min-width: 768px) and (min-height: 768px) {
    top: 5.6rem;
  }
`;

export const Pagination = styled.p`
  padding: 0.7rem;
  width: 48px;
  color: var(--color-button-page-navigation-icon);
  font-weight: 500;
  font-size: 1.2rem;

  @media (min-width: 768px) and (min-height: 768px) {
    margin-top: 2rem;
    margin-right: 2rem;
  }
`;

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

export const AboutImageWithLink = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const AboutImageFullSize = styled(Image)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 9999;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 375px) {
    /* z.B. iPhone SE */
    width: 100vw;
    max-height: 90vh;
  }
`;
