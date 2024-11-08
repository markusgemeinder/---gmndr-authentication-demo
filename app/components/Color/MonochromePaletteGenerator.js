// /app/components/Color/MonochromePaletteGenerator.js

'use client';

import { useState } from 'react';
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
} from '@/app/components/Color/PaletteGeneratorStyles';
import { FaCopy } from 'react-icons/fa';

// Hex-zu-RGB-Umwandlung
function hexToRgb(hex) {
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  let r = 0,
    g = 0,
    b = 0;

  if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return [r, g, b];
}

// RGB-zu-HSL-Umwandlung
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Achse bei grau
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// HSL-zu-Hex-Umwandlung
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;

  let r, g, b;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

// Neue Funktion, um Hex-Wert für gegebene Helligkeit (lightness) zu berechnen
function getHexFromLightness(h, s, lightness) {
  return hslToHex(h, s, lightness);
}

// Monochrome Palette Generierung
function generateMonochromePalette(hex, name, leftLimit, rightLimit) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const palette = {};

  const adjustLightness = (lightnessPercent) => {
    return hslToHex(h, s, lightnessPercent);
  };

  // Berechnung der Schritte der Helligkeit basierend auf den Grenzen
  const lightnessDifference = rightLimit - leftLimit;
  const step = lightnessDifference / 1000;

  // Werte korrekt von hell nach dunkel generieren
  for (let i = 0; i <= 1000; i += 50) {
    // const lightnessPercent = rightLimit - step * i; // Von leftLimit zu rightLimit
    const lightnessPercent = rightLimit - step * i; // Von leftLimit zu rightLimit
    palette[`--color-${name}-${i}`] = adjustLightness(lightnessPercent);
  }

  return palette;
}

// Hauptkomponente
export default function MonochromePaletteGenerator() {
  const [hex, setHex] = useState('#ff00ff');
  const [paletteName, setPaletteName] = useState('test');
  const [generatedPalette, setGeneratedPalette] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [checkedValues, setCheckedValues] = useState([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]);
  const [isCopied, setIsCopied] = useState(false);

  // Slider-Werte für Helligkeit
  const [leftLimit, setLeftLimit] = useState(0); // Linke Grenze von Weiß bis Helles Grau
  const [rightLimit, setRightLimit] = useState(100); // Rechte Grenze von Schwarz bis Dunkles Grau

  const [metaCheckboxState, setMetaCheckboxState] = useState(null);

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
    const formattedHex = hex;
    const formattedName = paletteName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const palette = generateMonochromePalette(formattedHex, formattedName, leftLimit, rightLimit);

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

  // Meta-Checkbox: Alle auswählen/deselektieren
  const handleMetaCheckboxChange = () => {
    if (metaCheckboxState === null || metaCheckboxState === false) {
      setCheckedValues([
        0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
      ]);
      setMetaCheckboxState(true);
    } else {
      setCheckedValues([]);
      setMetaCheckboxState(false);
    }
  };

  return (
    <Wrapper>
      <Title>Monochrome Palette Generator</Title>
      <InputGroup>
        <Label>Farbwert (Hex):</Label>
        <ColorPickerWrapper>
          <ColorPicker type='color' value={hex} onChange={handleColorPickerChange} />
          <TextInput type='text' value={hex} onChange={handleHexChange} placeholder='#' />
        </ColorPickerWrapper>
      </InputGroup>

      {/* Helligkeitseinstellungen */}
      <InputGroup>
        <Label>Hellster Wert (0% = #ffffff):</Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Slider-Input */}
          <input
            type='range'
            min={0}
            max={25}
            value={leftLimit}
            onChange={(e) => setLeftLimit(parseInt(e.target.value))}
          />
          {/* Anzeige des aktuellen Wertes */}
          <div style={{ marginLeft: '1rem' }}>{leftLimit}%</div>
        </div>
      </InputGroup>

      <InputGroup>
        <Label>Dunkelster Wert (100% = #000000):</Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Slider-Input */}
          <input
            type='range'
            min={75}
            max={100}
            value={rightLimit}
            onChange={(e) => setRightLimit(parseInt(e.target.value))}
          />
          {/* Anzeige des aktuellen Wertes */}
          <div style={{ marginLeft: '1rem' }}>{rightLimit}%</div>
        </div>
      </InputGroup>

      <InputGroup>
        <Label>Palettenname:</Label>
        <TextInput
          type='text'
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
          placeholder='name'
        />
      </InputGroup>

      <InputGroup>
        <Label>Sortierung:</Label>
        <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value='asc'>0 ... 1000</option>
          <option value='desc'>1000 ... 0</option>
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>Ausgabewerte:</Label>
        <CheckboxGroup>
          <CheckboxLabel>
            <input type='checkbox' checked={metaCheckboxState} onChange={handleMetaCheckboxChange} /> Alle
          </CheckboxLabel>

          {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000].map(
            (value) => (
              <CheckboxLabel key={value}>
                <input
                  type='checkbox'
                  checked={checkedValues.includes(value)}
                  onChange={() =>
                    setCheckedValues((prev) =>
                      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
                    )
                  }
                />{' '}
                {value}
              </CheckboxLabel>
            )
          )}
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
