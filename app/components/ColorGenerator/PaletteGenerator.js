// /app/components/ColorGenerator/PaletteGenerator.js

'use client';

import { useReducer, useState, useEffect, useContext } from 'react';
import {
  Wrapper,
  Title,
  InputGroup,
  Label,
  ColorPickerWrapper,
  ColorPicker,
  TextInput,
  ColorTileWrapper,
  ColorPreview,
  StyledSlider,
  SliderText,
  SliderValue,
  Select,
  CheckboxGroup,
  CheckboxLabel,
  CheckboxInput,
  GeneratePaletteButton,
  ResetFormButton,
  CopyPaletteButton,
  PaletteWrapper,
  PaletteOutput,
} from './PaletteGeneratorStyles';
import { FaCopy, FaSlidersH, FaRedo } from 'react-icons/fa';
import { generateMonochromePalette, getColorPreview } from '@/utils/paletteGeneratorUtils';
import SnapshotController from './SnapshotController';
import { loadFormDataFromLocalStorage, saveFormDataToLocalStorage } from '@/utils/localStorageUtils';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const defaults = {
  hex: '#456789',
  prefix: '--color-',
  suffix: 'test',
  sortOrder: 'asc',
  checkedValues: [
    0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
  ],
  selectedOption: 'optionDefault',
  darkLimit: 20,
  brightLimit: 95,
  generatedPalette: null,
};

const selectorOptions = {
  selectorOptionDefault: [
    0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
  ],
  selectorOption1: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  selectorOption2: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  selectorOption3: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  selectorOption4: [0, 200, 400, 600, 800, 1000],
  selectorOption5: [200, 400, 600, 800],
  selectorOptionNone: [],
};

const allValues = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
];

// ===== Hilfsfunktion zum Vergleichen von Arrays =====
function isArraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

// ===== Reducer zur Verwaltung des Formularzustands =====
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
    case 'LOAD_SNAPSHOT':
      return { ...action.payload }; // Snapshot laden
    default:
      return state;
  }
}

// ===== Formular-Daten aus LocalStorage laden =====
const formData = loadFormDataFromLocalStorage() || defaults;

export default function PaletteGenerator() {
  const { language } = useContext(LanguageContext);
  const [state, dispatch] = useReducer(paletteReducer, formData);

  // ===== Sprachtext-Abfrage
  const getLanguageText = (key) => {
    return getText('paletteGenerator', key, language);
  };

  // ===== Zustand für visuelle Effekte =====
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerateClicked, setIsGenerateClicked] = useState(false);

  // ===== Formularzustand in LocalStorage speichern =====
  useEffect(() => {
    saveFormDataToLocalStorage(state);
  }, [state]);

  // ===== Snapshot anwenden =====
  function applySnapshot(snapshot) {
    dispatch({ type: 'LOAD_SNAPSHOT', payload: snapshot });
  }

  // ===== Farbwerte-Änderungen =====
  const handleHexChange = (e) => {
    dispatch({ type: 'SET_VALUE', key: 'hex', value: e.target.value });
  };

  const handleColorPickerChange = (e) => {
    dispatch({ type: 'SET_VALUE', key: 'hex', value: e.target.value });
  };

  // ===== Palette generieren =====
  const handleGeneratePalette = () => {
    setIsGenerateClicked(true);
    setTimeout(() => setIsGenerateClicked(false), 200);

    // Generiere die Palette
    const palette = generateMonochromePalette(
      state.hex,
      state.prefix,
      state.suffix,
      state.darkLimit,
      state.brightLimit
    );

    // Filtere die Palette basierend auf den checkedValues
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

  // ===== Formular zurücksetzen =====
  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  // ===== Palette kopieren =====
  const handleCopyPalette = () => {
    const brightLimitDisplayed = 100 - state.brightLimit;
    const darkLimitDisplayed = 100 - state.darkLimit;

    const comment =
      `/* ${state.prefix}${state.suffix}-base: ${state.hex}; */\n` +
      `/* Light level (0): ${brightLimitDisplayed}% | Dark level (1000): ${darkLimitDisplayed}% */\n`;

    const paletteText = Object.entries(state.generatedPalette)
      .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`)
      .join('\n');

    navigator.clipboard.writeText(comment + paletteText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // ===== Option auswählen =====
  const handleSelectOption = (option) => {
    dispatch({ type: 'SET_SELECTED_OPTION', value: option });
    dispatch({ type: 'SET_CHECKED_VALUES', value: selectorOptions[option] || [] });
  };

  // ===== Formular auf Änderungen prüfen =====
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

  return (
    <Wrapper>
      <SnapshotController state={state} onApplySnapshot={applySnapshot} resetForm={resetForm} />

      <Title>{getLanguageText('title')}</Title>

      <InputGroup>
        <Label>{getLanguageText('hexLabel')}</Label>
        <ColorPickerWrapper>
          <ColorPicker type='color' value={state.hex} onChange={handleColorPickerChange} />
          <TextInput type='text' value={state.hex} onChange={handleHexChange} placeholder='#' />
        </ColorPickerWrapper>
      </InputGroup>

      <InputGroup>
        <Label>{getLanguageText('brightLimitLabel')}</Label>
        <ColorTileWrapper>
          <ColorPreview $bgColor={getColorPreview(state.hex, state.brightLimit)} />
          <SliderText>
            <span>{getLanguageText('adjustLabelsDarker')}</span>
          </SliderText>
          <StyledSlider
            type='range'
            min={70}
            max={100}
            value={state.brightLimit}
            onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'brightLimit', value: parseInt(e.target.value) })}
            $startColor='var(--color-white)'
            $endColor={getColorPreview(state.hex, state.brightLimit)}
            $thumbColor='var(--color-white)'
            $thumbBorderColor='var(--color-secondary-700)'
          />
          <SliderText>
            <span>{getLanguageText('adjustLabelsLighter')}</span>
          </SliderText>
          <SliderValue>{-(state.brightLimit - 100)}</SliderValue>
        </ColorTileWrapper>
      </InputGroup>

      <InputGroup>
        <Label>{getLanguageText('darkLimitLabel')}</Label>
        <ColorTileWrapper>
          <ColorPreview $bgColor={getColorPreview(state.hex, state.darkLimit)} />
          <SliderText>
            <SliderText>
              <span>{getLanguageText('adjustLabelsDarker')}</span>
            </SliderText>
          </SliderText>
          <StyledSlider
            type='range'
            min={0}
            max={30}
            value={state.darkLimit}
            onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'darkLimit', value: parseInt(e.target.value) })}
            $startColor={getColorPreview(state.hex, state.darkLimit)}
            $endColor={getColorPreview(state.hex, state.darkLimit)}
            $thumbColor='var(--color-white)'
            $thumbBorderColor='var(--color-secondary-700)'
          />

          <SliderText>
            <span>{getLanguageText('adjustLabelsLighter')}</span>
          </SliderText>
          <SliderValue>{100 - state.darkLimit}</SliderValue>
        </ColorTileWrapper>
      </InputGroup>

      <InputGroup>
        <Label>{getLanguageText('prefixLabel')}</Label>
        <TextInput
          type='text'
          value={state.prefix}
          onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'prefix', value: e.target.value })}
          placeholder='--color-'
        />
      </InputGroup>

      <InputGroup>
        <Label>{getLanguageText('suffixLabel')}</Label>
        <TextInput
          type='text'
          value={state.suffix}
          onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'suffix', value: e.target.value })}
          placeholder='test'
        />
      </InputGroup>

      <InputGroup>
        <Label>{getLanguageText('sortOrderLabel')}</Label>
        <Select
          value={state.sortOrder}
          onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'sortOrder', value: e.target.value })}>
          <option value='asc'>{getLanguageText('sortOrderAsc')}</option>
          <option value='desc'>{getLanguageText('sortOrderDesc')}</option>
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>{getLanguageText('outputValuesLabel')}</Label>

        <Select value={state.selectedOption} onChange={(e) => handleSelectOption(e.target.value)}>
          {Object.keys(selectorOptions).map((option) => {
            return (
              <option key={option} value={option}>
                {getText('paletteGenerator', option, language)}
              </option>
            );
          })}
        </Select>
      </InputGroup>

      <InputGroup>
        <CheckboxGroup>
          {allValues.map((value) => (
            <CheckboxLabel key={value}>
              <CheckboxInput
                type='checkbox'
                checked={state.checkedValues.includes(value)}
                onChange={() => {
                  const newCheckedValues = state.checkedValues.includes(value)
                    ? state.checkedValues.filter((item) => item !== value)
                    : [...state.checkedValues, value];
                  dispatch({ type: 'SET_CHECKED_VALUES', value: newCheckedValues });
                }}
              />
              {value}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </InputGroup>

      <GeneratePaletteButton width='100%' onClick={handleGeneratePalette}>
        <FaSlidersH /> {getLanguageText('generateButton')}
      </GeneratePaletteButton>

      {isFormChanged() && (
        <ResetFormButton width='auto' onClick={resetForm}>
          <FaRedo /> {getLanguageText('resetButton')}
        </ResetFormButton>
      )}

      {state.generatedPalette && Object.entries(state.generatedPalette).length > 0 && (
        <PaletteWrapper>
          <CopyPaletteButton width='auto' onClick={handleCopyPalette}>
            <FaCopy /> {isCopied ? getLanguageText('copied') : getLanguageText('copyButton')}
          </CopyPaletteButton>

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
