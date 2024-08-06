// app/components/Common/Button.js

import styled from 'styled-components';

// StyledButton with transient props (props that are not forwarded to the DOM element)
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'hoverColor', 'color'].includes(prop),
})`
  background-color: ${(props) => props.bgColor || 'var(--color-button)'};
  color: ${(props) => props.color || 'var(--color-button-text)'};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0.8rem;
  margin-left: 0rem;
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
