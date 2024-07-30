import { useSession, signIn } from 'next-auth/react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  margin-bottom: 0.4rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
`;

const LoginLink = styled.a`
  color: var(--color-link);
  text-decoration: underline;

  &:hover {
    color: var(--color-link-hover);
  }
`;

const SessionStatus = () => {
  const { data: session } = useSession();

  return (
    <StatusContainer>
      {session ? (
        <p>
          Welcome, {session.user.name}. You are logged in as {session.user.role}.
        </p>
      ) : (
        <p>
          Welcome, unknown user.{' '}
          <LoginLink href='#' onClick={() => signIn()}>
            Please login.
          </LoginLink>
        </p>
      )}
    </StatusContainer>
  );
};

export default SessionStatus;
