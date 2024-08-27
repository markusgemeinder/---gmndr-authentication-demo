// app/components/Common/Button.js

import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`;

// StyledButton with transient props (props that are not forwarded to the DOM element)
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'hoverColor', 'color'].includes(prop),
})`
  background-color: ${(props) => props.bgColor || 'var(--color-button)'};
  color: ${(props) => props.color || 'var(--color-button-text)'};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor || 'var(--color-button-hover)'};
  }
`;

// Button component utilizing transient props to avoid passing unwanted props to the DOM
const Button = ({ children, bgColor, hoverColor, color, ...rest }) => {
  return (
    <StyledButton bgColor={bgColor} hoverColor={hoverColor} color={color} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
