// /app/components/Common/CommonStyles.js

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 0.5rem;
  margin-top: 5rem;
`;

export const Main = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`;

export const SmallTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: var(--color-text);
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  color: var(--color-text);
`;
