// /app/components/Color/MonochromePaletteGenerator.js

'use client';

import { useReducer, useState, useEffect } from 'react';
import {
  Wrapper,
  Title,
  InputGroup,
  Label,
  ColorPickerWrapper,
  ColorPicker,
  TextInput,
  Select,
  CheckboxGroup,
  CheckboxLabel,
  Button,
  PaletteWrapper,
  CopyButton,
  PaletteOutput,
  ColorTileWrapper,
  ColorPreview,
  StyledSlider,
  SliderText,
} from '@/app/components/Color/PaletteGeneratorStyles';
import { FaCopy } from 'react-icons/fa';
import { generateMonochromePalette, getColorPreview } from '@/utils/colorUtils';

// Default Werte
const defaults = {
  hex: '#ff00ff',
  prefix: '--color-',
  suffix: 'test',
  sortOrder: 'asc',
  checkedValues: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], // Beispielwerte
  selectedOption: '100er [0-1000]',
  darkLimit: 20,
  brightLimit: 90,
  generatedPalette: null,
};

const selectorOptions = {
  '100er [0-1000]': [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  '100er [100-900]': [100, 200, 300, 400, 500, 600, 700, 800, 900],
  '100er [mit 50, 950]': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  '200er [0-1000]': [0, 200, 400, 600, 800, 1000],
  '200er [200-800]': [200, 400, 600, 800],
  Alle: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000],
  Keine: [],
};

const allValues = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
];

// Reducer Funktion zum Steuern des States
function paletteReducer(state, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, [action.key]: action.value };
    case 'RESET_FORM':
      return { ...defaults };
    case 'SET_CHECKED_VALUES':
      return { ...state, checkedValues: action.value };
    case 'SET_SELECTED_OPTION':
      return { ...state, selectedOption: action.value };
    case 'SET_GENERATED_PALETTE':
      return { ...state, generatedPalette: action.value };
    default:
      return state;
  }
}

export default function MonochromePaletteGenerator() {
  const [state, dispatch] = useReducer(paletteReducer, defaults);
  const [isCopied, setIsCopied] = useState(false); // Definiere isCopied als State

  useEffect(() => {
    localStorage.setItem('hex', state.hex);
    localStorage.setItem('prefix', state.prefix);
    localStorage.setItem('suffix', state.suffix);
    localStorage.setItem('sortOrder', state.sortOrder);
    localStorage.setItem('checkedValues', JSON.stringify(state.checkedValues));
    localStorage.setItem('selectedOption', state.selectedOption);
    localStorage.setItem('darkLimit', state.darkLimit.toString());
    localStorage.setItem('brightLimit', state.brightLimit.toString());
  }, [state]);

  const handleHexChange = (e) => {
    dispatch({ type: 'SET_VALUE', key: 'hex', value: e.target.value });
  };

  const handleColorPickerChange = (e) => {
    dispatch({ type: 'SET_VALUE', key: 'hex', value: e.target.value });
  };

  const handleGeneratePalette = () => {
    const palette = generateMonochromePalette(
      state.hex,
      state.prefix,
      state.suffix,
      state.darkLimit,
      state.brightLimit
    );
    const filteredPalette = Object.entries(palette)
      .filter(([key]) => state.checkedValues.includes(parseInt(key.split('-').pop())))
      .sort(([keyA], [keyB]) => {
        const valA = parseInt(keyA.split('-').pop());
        const valB = parseInt(keyB.split('-').pop());
        return state.sortOrder === 'asc' ? valA - valB : valB - valA;
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    dispatch({ type: 'SET_GENERATED_PALETTE', value: filteredPalette });
  };

  const handleCopyPalette = () => {
    navigator.clipboard.writeText(
      Object.entries(state.generatedPalette)
        .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`)
        .join('\n')
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Nach 2 Sekunden den "Kopiert!"-Text zurücksetzen
  };

  const handleSelectOption = (option) => {
    dispatch({ type: 'SET_SELECTED_OPTION', value: option });
    dispatch({ type: 'SET_CHECKED_VALUES', value: selectorOptions[option] || [] });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const isFormChanged = () => {
    return (
      state.hex !== defaults.hex ||
      state.prefix !== defaults.prefix ||
      state.suffix !== defaults.suffix ||
      state.sortOrder !== defaults.sortOrder ||
      !isArraysEqual(state.checkedValues, defaults.checkedValues) ||
      state.selectedOption !== defaults.selectedOption ||
      state.darkLimit !== defaults.darkLimit ||
      state.brightLimit !== defaults.brightLimit
    );
  };

  const isArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  };

  return (
    <Wrapper>
      <Title>Monochrome Palette Generator</Title>

      <InputGroup>
        <Label>Basisfarbwert (Hex):</Label>
        <ColorPickerWrapper>
          <ColorPicker type='color' value={state.hex} onChange={handleColorPickerChange} />
          <TextInput type='text' value={state.hex} onChange={handleHexChange} placeholder='#' />
        </ColorPickerWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Hellster Wert (0):</Label>
        <ColorTileWrapper>
          <ColorPreview bgColor={getColorPreview(state.hex, state.brightLimit)} />
          <SliderText>
            <span>dunkler</span>
          </SliderText>
          <StyledSlider
            type='range'
            min={70}
            max={100}
            value={state.brightLimit}
            onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'brightLimit', value: parseInt(e.target.value) })}
            startColor='#ffffff'
            endColor={getColorPreview(state.hex, state.brightLimit)}
            thumbColor='#fff'
            thumbBorderColor='#333'
          />
          <SliderText>
            <span>heller</span>
          </SliderText>
        </ColorTileWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Dunkelster Wert (1000):</Label>
        <ColorTileWrapper>
          <ColorPreview bgColor={getColorPreview(state.hex, state.darkLimit)} />
          <SliderText>
            <span>dunkler</span>
          </SliderText>
          <StyledSlider
            type='range'
            min={0}
            max={30}
            value={state.darkLimit}
            onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'darkLimit', value: parseInt(e.target.value) })}
            startColor={getColorPreview(state.hex, state.darkLimit)}
            endColor='#000000'
            thumbColor='#fff'
            thumbBorderColor='#333'
          />
          <SliderText>
            <span>heller</span>
          </SliderText>
        </ColorTileWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Sortierung:</Label>
        <Select
          value={state.sortOrder}
          onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'sortOrder', value: e.target.value })}>
          <option value='asc'>Aufsteigend (0 ... 1000)</option>
          <option value='desc'>Absteigend (1000 ... 0)</option>
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>Ausgabewerte:</Label>
        <Select value={state.selectedOption} onChange={(e) => handleSelectOption(e.target.value)}>
          {Object.keys(selectorOptions).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <CheckboxGroup>
          {allValues.map((value) => (
            <CheckboxLabel key={value}>
              <input
                type='checkbox'
                checked={state.checkedValues.includes(value)} // Zeigt an, ob die Checkbox markiert ist
                onChange={() => {
                  const newCheckedValues = state.checkedValues.includes(value)
                    ? state.checkedValues.filter((item) => item !== value) // Entfernt den Wert, wenn er bereits ausgewählt ist
                    : [...state.checkedValues, value]; // Fügt den Wert hinzu, wenn er nicht ausgewählt ist
                  dispatch({ type: 'SET_CHECKED_VALUES', value: newCheckedValues });
                }}
              />
              {value}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </InputGroup>

      <Button onClick={handleGeneratePalette}>Palette generieren</Button>

      {isFormChanged() && (
        <Button onClick={resetForm} style={{ marginTop: '10px', backgroundColor: 'gray' }}>
          Formular zurücksetzen
        </Button>
      )}

      {state.generatedPalette && (
        <PaletteWrapper>
          <CopyButton onClick={handleCopyPalette}>
            {isCopied ? (
              'Kopiert!'
            ) : (
              <>
                <FaCopy /> Kopieren
              </>
            )}
          </CopyButton>
          <PaletteOutput>
            {Object.entries(state.generatedPalette)
              .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`)
              .join('\n')}
          </PaletteOutput>
        </PaletteWrapper>
      )}
    </Wrapper>
  );
}
