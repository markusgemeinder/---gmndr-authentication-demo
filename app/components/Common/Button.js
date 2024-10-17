// /app/components/Common/Button.js

import styled from 'styled-components';

// export const ButtonContainer = styled.div`
//   display: flex;
//   gap: 0.6rem;
// `;

// Container for buttons
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Increased gap for better spacing */
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
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0.6rem;
  margin-left: 0rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => props.hoverColor || 'var(--color-button-hover)'};
  }
`;

export default function Button({ children, onClick, disabled, ...rest }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  );
}
