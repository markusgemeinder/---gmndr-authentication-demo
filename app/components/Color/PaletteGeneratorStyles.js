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
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) and (min-height: 768px) {
    /* margin-left: 0; */
    width: 88%;
    max-width: 30rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 0.8rem;
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
  color: #555;
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
`;

export const ColorPicker = styled.input`
  /* type: 'color'; */

  border: 2px solid #ddd;
  border-radius: 8px;
  width: 5rem;
  height: 3rem;
  padding: 0.2rem;
  cursor: pointer;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

export const TextInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledSlider = styled.input.attrs((props) => ({
  style: {
    background: `linear-gradient(to right, ${props.$startColor}, ${props.$endColor || '#ffffff'})`,
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
    background: ${(props) => props.$thumbColor || '#333'};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${(props) => props.$thumbBorderColor || '#fff'};
  }

  ::-moz-range-thumb {
    height: 20px;
    width: 20px;
    background: ${(props) => props.$thumbColor || '#333'};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${(props) => props.$thumbBorderColor || '#fff'};
  }
`;

export const SliderText = styled.div`
  text-align: center;
  font-size: 0.6rem;
  color: #333;
  width: 100%;
`;

export const SliderValue = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  min-width: 1.4rem;
  color: #555;
`;

export const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
`;

export const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 0.5rem;
  margin-left: 0.6rem;
  gap: 0.2rem;

  & > label {
    padding-left: 0.5rem;
    border-right: 1px solid #ddd;

    &:nth-child(3n) {
      border-right: none;
    }
  }

  @media (min-width: 768px) and (min-height: 768px) {
    margin-left: 2rem;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #555;
  text-align: left;
`;

export const PaletteWrapper = styled.div`
  width: 100%;
  margin-top: 1.4rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f0f5f9;
  border: 1px solid #ddd;
  position: relative;
`;

export const PaletteOutput = styled.pre`
  font-family: monospace;
  font-size: 0.9rem;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 3.6rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 600;
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
    background-color: ${({ $hoverColor }) => $hoverColor || '#555'};
  }

  svg {
    margin-right: 8px;
  }
`;

export const GeneratePaletteButton = styled(Button)`
  width: 15.6rem;
  background-color: #1fbf3f;
  &:hover {
    background-color: #199a33;
  }
`;

export const ResetFormButton = styled(Button)`
  width: 15.6rem;
  background-color: #c0c0c0;
  &:hover {
    background-color: #a0a0a0;
  }
`;

export const CopyPaletteButton = styled(Button)`
  width: 8.8rem;
  position: absolute;
  top: 0;
  right: 0.8rem;
  background-color: #3a3a3a;
  &:hover {
    background-color: #1a1a1a;
  }
`;

export const SnapshotContainer = styled.div`
  position: fixed;
  top: 4.7rem;
  right: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  z-index: 4;

  @media (min-width: 768px) and (min-height: 768px) {
    top: 7rem;
    right: 2rem;
  }
`;

export const SnapshotButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.6rem;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-color: #5a5a5a;
  &:hover {
    background-color: #3a3a3a;
  }

  svg {
    font-size: 1.8rem;
    color: white;
  }
`;

export const UndoButton = styled(SnapshotButton)`
  background-color: #c0c0c0;
  &:hover {
    background-color: #a0a0a0;
  }
`;

export const RedoButton = styled(SnapshotButton)`
  background-color: #c0c0c0;
  &:hover {
    background-color: #a0a0a0;
  }
`;

export const Spacer = styled.div`
  height: 0.4rem;
`;
