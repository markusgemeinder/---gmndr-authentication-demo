// /app/components/About/AboutStyles.js

import styled from 'styled-components';

export const NarrowContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
`;

export const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin: 1rem 0;
`;

export const AboutTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin: 1.5rem 0 0.5rem;
  color: var(--color-text);
`;

export const AboutHeadline = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 2rem 0 0.4rem;
`;

export const AboutParagraph = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  color: var(--color-text);
`;

export const AboutListContainer = styled.ul`
  margin: 1.2rem 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AboutList = styled.li`
  margin-bottom: 0.2rem;
  display: flex;
  align-items: flex-start;
  text-align: center;
  position: relative;

  &::before {
    content: '▶';
    position: absolute;
    left: -18px;
    font-weight: bold;
    color: var(--color-link-hover);
  }
`;

export const AboutLinkContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AboutLink = styled.a`
  text-align: center;
  font-weight: 500;
  color: var(--color-link);
  text-decoration: none;

  &:hover {
    color: var(--color-link-hover);
    text-decoration: underline;
  }
`;

export const AboutImageWithLink = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const AboutImageContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin: 1rem 0;
  justify-content: center;
`;
