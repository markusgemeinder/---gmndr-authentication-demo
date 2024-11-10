// /app/components/Button/Button.js

import styled from 'styled-components';

export const ButtonContainerVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  margin-top: 1.4rem;
  margin-bottom: 0.4rem;

  @media (min-width: 768px) and (min-height: 768px) {
    margin-top: 1.6rem;
    margin-bottom: 0.8rem;
  }

  &:first-child {
    margin-top: 0.6rem;
  }

  &:last-child {
    margin-bottom: 0.6rem;
  }
`;

export const ButtonContainerHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
  width: 100%;
  justify-content: center;
  margin: 0.4rem 0;

  @media (min-width: 768px) and (min-height: 768px) {
    gap: 1rem;
  }
`;

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'bgColor' && prop !== 'hoverColor',
})`
  background-color: ${({ bgColor }) => bgColor || 'var(--color-button)'};
  color: ${({ color }) => color || 'var(--color-button-text)'};
  font-weight: 500;
  padding: 0 0.7rem;
  border-radius: 0.6rem;
  min-width: 48px;
  min-height: 48px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  /* transition: background-color 0.05s ease; */

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || 'var(--color-button-hover)'};
  }

  &:active {
    background-color: ${({ bgColor }) => bgColor || 'var(--color-button-hover)'};
    transform: scale(0.98);
  }

  @media (min-width: 768px) and (min-height: 768px) {
    padding: 0.75rem 1rem;
  }
`;

export default function Button({ children, onClick, disabled, ...rest }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} aria-label={children} {...rest}>
      {children}
    </StyledButton>
  );
}
