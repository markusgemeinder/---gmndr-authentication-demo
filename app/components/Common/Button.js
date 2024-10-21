// /app/components/Common/Button.js

import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const ButtonContainerMedium = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 60%;
`;

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'hoverColor', 'color', 'disabled'].includes(prop),
})`
  background-color: ${(props) => props.bgColor || 'var(--color-button)'};
  color: ${(props) => props.color || 'var(--color-button-text)'};
  font-weight: 500;
  padding: 0.75rem;
  border-radius: 0.4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 0.6rem;
  min-width: 48px;
  min-height: 48px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => props.hoverColor || 'var(--color-button-hover)'};
  }

  @media (min-width: 768px) and (min-height: 768px) {
    padding: 0.75rem 1rem;
    margin-right: 1rem;
  }
`;

export default function Button({ children, onClick, disabled, ...rest }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} aria-label={children} {...rest}>
      {children}
    </StyledButton>
  );
}
