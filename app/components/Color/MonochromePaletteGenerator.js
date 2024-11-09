// /app/components/Color/MonochromePaletteGenerator.js

'use client';

import { useEffect, useState } from 'react';
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

// Hauptkomponente
export default function MonochromePaletteGenerator() {
  // Funktion zum Abrufen von Werten aus dem LocalStorage
  const getStoredValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return defaultValue;
    // Wenn der gespeicherte Wert ein JSON-String ist, parsen wir ihn
    try {
      return JSON.parse(storedValue);
    } catch (e) {
      // Wenn es kein JSON-String ist (z.B. einfache Strings wie '#ff00ff'), geben wir den Wert direkt zurück
      return storedValue;
    }
  };

  const [hex, setHex] = useState(() => getStoredValue('hex', '#ff00ff'));
  const [prefix, setPrefix] = useState(() => getStoredValue('prefix', '--color-'));
  const [suffix, setSuffix] = useState(() => getStoredValue('suffix', 'test'));
  const [generatedPalette, setGeneratedPalette] = useState(null);
  const [sortOrder, setSortOrder] = useState(() => getStoredValue('sortOrder', 'asc'));
  const [checkedValues, setCheckedValues] = useState(() => getStoredValue('checkedValues', []));
  const [isCopied, setIsCopied] = useState(false);

  // Slider-Werte für Helligkeit
  const [darkLimit, setDarkLimit] = useState(() => getStoredValue('darkLimit', 20));
  const [brightLimit, setBrightLimit] = useState(() => getStoredValue('brightLimit', 90));

  // Auswahlmöglichkeiten für den neuen Selektor
  const selectorOptions = {
    '100er': [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    '100er (ohne 0 und 1000)': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    '100er (mit 50 und 950)': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    '200er': [0, 200, 400, 600, 800, 1000],
    '200er (ohne 0 und 1000)': [200, 400, 600, 800],
    Alle: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000],
    Keine: [],
  };

  const [selectedOption, setSelectedOption] = useState(() => getStoredValue('selectedOption', '100er'));

  useEffect(() => {
    setCheckedValues(selectorOptions[selectedOption]);
  }, [selectedOption]);

  // handleHexChange beibehalten!
  const handleHexChange = (e) => {
    setHex(e.target.value);
  };

  // handleColorPickerChange beibehalten!
  const handleColorPickerChange = (e) => {
    setHex(e.target.value);
  };

  // handleGeneratePalette beibehalten!
  const handleGeneratePalette = () => {
    const palette = generateMonochromePalette(hex, prefix, suffix, darkLimit, brightLimit);

    const filteredPalette = Object.entries(palette)
      .filter(([key]) => checkedValues.includes(parseInt(key.split('-').pop())))
      .sort(([keyA], [keyB]) => {
        const valA = parseInt(keyA.split('-').pop());
        const valB = parseInt(keyB.split('-').pop());
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    setGeneratedPalette(filteredPalette);
  };

  // handleCopyPalette beibehalten!
  const handleCopyPalette = () => {
    navigator.clipboard.writeText(
      Object.entries(generatedPalette)
        .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`)
        .join('\n')
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // handleSelectOption beibehalten!
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setCheckedValues(selectorOptions[option]);
  };

  const getCurrentColor = (limit) => {
    return getColorPreview(hex, limit);
  };

  useEffect(() => {
    // Speichern der Werte im LocalStorage, wenn sich etwas ändert
    localStorage.setItem('hex', hex);
    localStorage.setItem('prefix', prefix);
    localStorage.setItem('suffix', suffix);
    localStorage.setItem('sortOrder', sortOrder);
    localStorage.setItem('checkedValues', JSON.stringify(checkedValues));
    localStorage.setItem('selectedOption', selectedOption);
    localStorage.setItem('darkLimit', darkLimit.toString());
    localStorage.setItem('brightLimit', brightLimit.toString());
  }, [hex, prefix, suffix, sortOrder, checkedValues, selectedOption, darkLimit, brightLimit]);

  return (
    <Wrapper>
      <Title>Monochrome Palette Generator</Title>

      <InputGroup>
        <Label>Basisfarbwert (Hex):</Label>
        <ColorPickerWrapper>
          <ColorPicker type='color' value={hex} onChange={handleColorPickerChange} />
          <TextInput type='text' value={hex} onChange={handleHexChange} placeholder='#' />
        </ColorPickerWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Hellster Wert:</Label>
        <ColorTileWrapper>
          <ColorPreview bgColor={getCurrentColor(brightLimit)} />
          <SliderText>
            <span>dunkler</span>
          </SliderText>
          <StyledSlider
            type='range'
            min={70}
            max={100}
            value={brightLimit}
            onChange={(e) => setBrightLimit(parseInt(e.target.value))}
            startColor='#ffffff'
            endColor={getCurrentColor(brightLimit)}
            thumbColor='#fff'
            thumbBorderColor='#333'
          />
          <SliderText>
            <span>heller</span>
          </SliderText>
        </ColorTileWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Dunkelster Wert:</Label>
        <ColorTileWrapper>
          <ColorPreview bgColor={getCurrentColor(darkLimit)} />
          <SliderText>
            <span>dunkler</span>
          </SliderText>
          <StyledSlider
            type='range'
            min={0}
            max={30}
            value={darkLimit}
            onChange={(e) => setDarkLimit(parseInt(e.target.value))}
            startColor={getCurrentColor(darkLimit)}
            endColor={getCurrentColor(darkLimit)}
            thumbColor='#fff'
            thumbBorderColor='#333'
          />
          <SliderText>
            <span>heller</span>
          </SliderText>
        </ColorTileWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Prefix:</Label>
        <TextInput type='text' value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder='--color-' />
      </InputGroup>

      <InputGroup>
        <Label>Suffix:</Label>
        <TextInput type='text' value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder='test' />
      </InputGroup>

      <InputGroup>
        <Label>Sortierung:</Label>
        <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value='asc'>Aufsteigend (0 ... 1000)</option>
          <option value='desc'>Absteigend (1000 ... 0)</option>
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>Ausgabewerte:</Label>
        <Select value={selectedOption} onChange={(e) => handleSelectOption(e.target.value)}>
          {Object.keys(selectorOptions).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <CheckboxGroup>
          {[...Array(21)].map((_, idx) => {
            const value = idx * 50; // Werte: 0, 50, 100, ..., 1000
            return (
              <CheckboxLabel key={value}>
                <input
                  type='checkbox'
                  checked={checkedValues.includes(value)}
                  onChange={() => {
                    // Toggle the checked state of the value
                    if (checkedValues.includes(value)) {
                      setCheckedValues(checkedValues.filter((item) => item !== value)); // Uncheck it
                    } else {
                      setCheckedValues([...checkedValues, value]); // Check it
                    }
                  }}
                />{' '}
                {value}
              </CheckboxLabel>
            );
          })}
        </CheckboxGroup>
      </InputGroup>

      <Button onClick={handleGeneratePalette}>Palette generieren</Button>

      {generatedPalette && (
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
            {Object.entries(generatedPalette)
              .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`)
              .join('\n')}
          </PaletteOutput>
        </PaletteWrapper>
      )}
    </Wrapper>
  );
}
