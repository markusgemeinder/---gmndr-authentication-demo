// /app/reviews/signup/page.js

'use client';

import styled from 'styled-components';
import SignupForm from '@/app/components/Signup/SignupForm';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

const Main = styled.main`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export default function SignupPage() {
  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Signup</Title>
        <SignupForm />
      </Main>
    </>
  );
}
