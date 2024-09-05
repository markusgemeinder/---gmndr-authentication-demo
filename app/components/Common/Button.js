// app/components/Common/Button.js

import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'hoverColor', 'color', 'disabled'].includes(prop),
})`
  background-color: ${(props) => props.bgColor || 'var(--color-button)'};
  color: ${(props) => props.color || 'var(--color-button-text)'};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${(props) => (props.disabled ? undefined : props.hoverColor || 'var(--color-button-hover)')};
  }
`;

const Button = ({ children, bgColor, hoverColor, color, disabled, ...rest }) => {
  return (
    <StyledButton bgColor={bgColor} hoverColor={hoverColor} color={color} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
