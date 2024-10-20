/* /app/components/Common/CommonStyles.js */

import styled from 'styled-components';

export const Main = styled.main`
  margin: 5rem auto;
  padding: 2.4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 75%;
  max-width: 30rem;
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
