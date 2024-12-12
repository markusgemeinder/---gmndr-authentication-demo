// /app/components/Info/InfoStyles.js

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

export const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
  gap: 0.6rem;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 600px) {
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
  top: 4rem;
  right: 0.6rem;
  display: flex;
  gap: 0.4rem;
  z-index: 10;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: landscape) {
    top: 4.4rem;
    right: 1rem;
  }

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    top: 6rem;
    right: 1.6rem;
  }

  @media (min-width: 1000px) {
    top: 6rem;
    right: 1.6rem;
  }
`;

export const Pagination = styled.p`
  padding: 0.7rem;
  width: 48px;
  color: var(--color-button-page-navigation-icon);
  font-weight: 700;
  font-size: 1.2rem;
`;

export const InfoLinkContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoLink = styled(Link)`
  text-align: center;
  font-weight: 700;
  color: var(--color-link);
  text-decoration: none;

  &:hover {
    color: var(--color-link-hover);
    text-decoration: underline;
  }
`;

export const InfoImageContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin: 1rem 0;
  justify-content: center;
`;

export const InfoImageWithLink = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const InfoImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: hidden;

  @media (min-width: 768px) and (min-height: 768px) {
    width: 68vw;
    max-height: 90vh;
  }

  @media (max-width: 768px) and (orientation: landscape) {
    width: 68vw;
    max-height: 86vh;
  }

  @media (max-width: 768px) and (orientation: portrait) {
    width: 90vw;
    max-height: 90vh;
  }
`;

export const InfoImageFullSize = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer;
`;
