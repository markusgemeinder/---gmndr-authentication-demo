// /app/components/Color/PaletteGeneratorStyles.js

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.6rem auto;
  padding: 1.4rem 1.8rem;
  width: 96%;
  max-width: 600px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) and (min-height: 768px) {
    width: 84%;
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
  type: 'color';
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

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.2rem;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #388e3c;
  }
`;

export const PaletteWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f0f5f9;
  border: 1px solid #ddd;
  position: relative;
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #5a5a5a; /* Grauton */
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  width: 7.6rem;
  height: 2.4rem;

  &:hover {
    background-color: #757575; /* Etwas dunklerer Grauton */
  }

  &:active {
    background-color: #616161; /* Noch dunkler beim Klicken */
  }
`;

export const PaletteOutput = styled.pre`
  font-family: monospace;
  font-size: 0.9rem;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 3rem;
`;

export const Spacer = styled.div`
  height: 0.4rem;
`;

export const ColorTileWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 4fr auto; /* 4 Spalten: 1. ColorPreview, 2. SliderText, 3. StyledSlider, 4. SliderText */
  gap: 0.6rem; /* Abstand zwischen den Spalten */
  align-items: center; /* Vertikale Ausrichtung der Elemente */
  width: 100%;
`;

export const ColorPreview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${(props) => props.bgColor || '#fff'};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledSlider = styled.input`
  width: 100%;
  height: 10px;
  background: linear-gradient(to right, ${(props) => props.endColor}, #ffffff);
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
    background: #333;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #fff;
  }

  ::-moz-range-thumb {
    height: 20px;
    width: 20px;
    background: #333;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #fff;
  }
`;

export const SliderText = styled.div`
  text-align: center;
  font-size: 0.7rem;
  color: #333;
  width: 100%;
`;
