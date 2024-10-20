// /app/components/About/AboutStyles.js

import styled from 'styled-components';
import { Title, Paragraph, Main, Container, SmallTitle } from '@/app/components/Common/CommonStyles';

export const AboutContainer = styled(Container)``;

export const AboutMain = styled(Main)``;

export const AboutTitle = styled(Title)`
  font-size: 1.5rem;
  margin: 1.5rem 0 0.5rem;
`;

export const AboutSmallTitle = styled(SmallTitle)``;

export const AboutHeadline = styled.h3`
  font-size: 1.25rem;
  margin: 1.2rem 0 0.8rem;
`;

export const AboutParagraph = styled(Paragraph)`
  margin-bottom: 1.2rem;
`;

export const AboutAvatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

export const AboutListContainer = styled.ul`
  margin-bottom: 1.2rem;
`;

export const AboutList = styled.li`
  margin-bottom: 0.6rem;
`;

export const AboutLinkContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AboutLink = styled.a`
  color: var(--color-primary);
  text-decoration: none;

  &:hover {
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
