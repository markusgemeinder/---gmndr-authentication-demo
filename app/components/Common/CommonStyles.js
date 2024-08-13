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

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Main = styled.main`
  padding: 1rem;
`;

export const SmallTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ReviewWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;
