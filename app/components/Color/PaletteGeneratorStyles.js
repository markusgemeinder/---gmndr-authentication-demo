// /app/components/Color/PaletteGeneratorStyles.js

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.6rem auto;
  margin-right: 1.6rem;
  padding: 1.2rem 1.4rem;
  width: 92%;
  max-width: 600px;
  background-color: var(--color-secondary-50);
  border-radius: 8px;
  border: 1px solid var(--color-secondary-200);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) and (min-height: 768px) {
    /* margin-left: 0; */
    width: 88%;
    max-width: 30rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-primary-700);
  text-align: center;
  margin: 0.4rem 0 0.8rem 0;
`;

export const InputGroup = styled.div`
  margin: 0.5rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-secondary-700);
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
`;

export const ColorPicker = styled.input`
  border: 2px solid var(--color-secondary-200);
  border-radius: 8px;
  width: 5rem;
  height: 3rem;
  padding: 0.2rem;
  cursor: pointer;
  background-color: var(--color-white);

  &:focus {
    outline: none;
    border-color: var(--color-secondary-700);
  }
`;

export const TextInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-secondary-200);
  background-color: var(--color-white);
  color: var(--color-black);
  flex-grow: 1;
  width: 100%;
`;

export const ColorTileWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 4fr 1fr 0.6fr;
  gap: 0.6rem;
  align-items: center;
  width: 100%;
`;

export const ColorPreview = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.$bgColor || '#fff',
  },
}))`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 2px solid var(--color-secondary-200);
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
`;

export const StyledSlider = styled.input.attrs((props) => ({
  style: {
    background: `linear-gradient(to right, ${props.$startColor}, ${props.$endColor || 'var(--color-white'})`,
  },
}))`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  transition: background 0.3s ease;
  cursor: pointer;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 20px;
    background: ${(props) => props.$thumbColor || 'var(--color-secondary-700)'};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${(props) => props.$thumbBorderColor || 'var(--color-white)'};
  }

  ::-moz-range-thumb {
    height: 20px;
    width: 20px;
    background: ${(props) => props.$thumbColor || 'var(--color-secondary-700)'};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${(props) => props.$thumbBorderColor || 'var(--color-white)'};
  }
`;

export const SliderText = styled.div`
  text-align: center;
  font-size: 0.6rem;
  color: var(--color-black);
  width: 100%;
`;

export const SliderValue = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  min-width: 1.4rem;
  color: var(--color-secondary-700);
`;

export const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-secondary-200);
  background-color: var(--color-white);
  color: var(--color-black);
`;

export const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0.5rem;
  gap: 0.2rem;

  @media (min-width: 768px) and (min-height: 768px) {
    margin: 0.5rem 1.8rem;
    margin-left: 3rem;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: var(--color-secondary-700);
  text-align: left;
  display: inline-flex; /* Inline-Block, um mit der Checkbox auf gleicher Linie zu stehen */
  align-items: center; /* Zentriert das Label und die Checkbox vertikal */
  /* gap: 0.1rem; */
`;

export const CheckboxInput = styled.input.attrs((props) => ({
  type: 'checkbox',
  style: {
    width: props.size || '1.6rem', // Größe anpassbar
    height: props.size || '1.6rem', // Größe anpassbar
    margin: props.margin || '0.1rem 0.4rem', // Margin anpassbar
    backgroundColor: props.backgroundColor || 'var(--color-white)', // Hintergrundfarbe anpassbar
  },
}))`
  -webkit-appearance: none;
  appearance: none;
  border-radius: 4px;
  background-color: ${(props) => props.backgroundColor};
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  vertical-align: middle; /* Hinzugefügt für vertikale Ausrichtung */

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid var(--color-secondary-300);
    background-color: var(--color-white);
    transition: background-color 0.3s, border-color 0.3s;
  }

  &:checked::before {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-500);
  }

  &:checked::after {
    content: 'X';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* font-size: 1.1rem; */
    /* font-weight: bold; */
    color: var(--color-white);
  }

  &:focus {
    outline: none;
  }
`;

export const PaletteWrapper = styled.div`
  width: 100%;
  margin-top: 1.4rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--color-white);
  border: 1px solid var(--color-secondary-200);
  position: relative;
`;

export const PaletteOutput = styled.pre`
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--color-black);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 3.6rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  color: var(--color-white);
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width || 'auto'};

  ${({ position }) =>
    position &&
    `
    position: ${position.position || 'static'};
    top: ${position.top || 'auto'};
    right: ${position.right || 'auto'};
    bottom: ${position.bottom || 'auto'};
    left: ${position.left || 'auto'};
  `}

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor || 'var(--color-secondary-900)'};
  }

  svg {
    margin-right: 8px;
  }
`;

export const GeneratePaletteButton = styled(Button)`
  width: 15.6rem;
  background-color: var(--color-primary-500);
  &:hover {
    background-color: var(--color-primary-600);
  }
`;

export const ResetFormButton = styled(Button)`
  width: 15.6rem;
  background-color: var(--color-secondary-300);
  &:hover {
    background-color: var(--color-secondary-500);
  }
`;

export const CopyPaletteButton = styled(Button)`
  width: 8.8rem;
  position: absolute;
  top: 0;
  right: 0.8rem;
  background-color: var(--color-secondary-700);
  &:hover {
    background-color: var(--color-secondary-900);
  }
`;

export const Spacer = styled.div`
  height: 0.4rem;
`;
