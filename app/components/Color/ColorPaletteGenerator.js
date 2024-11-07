'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { FaCopy } from 'react-icons/fa';

// Styled Components für das Layout
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem auto;
  padding: 1.4rem 1.2rem;
  width: 100%;
  max-width: 600px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const InputGroup = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
`;

const Button = styled.button`
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

const Spacer = styled.div`
  height: 1.5rem;
`;

const PaletteWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f0f5f9;
  border: 1px solid #ddd;
  position: relative;
`;

const CopyButton = styled.button`
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

const PaletteOutput = styled.pre`
  font-family: monospace;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 3rem;
`;

// Funktion zur Umwandlung von Hex in RGB
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

// Funktion zur Umwandlung von RGB in HSL
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

// Funktion zur Umwandlung von HSL in Hex
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

// Funktion zur Generierung der Farbpalette
function generatePalette(hex, name) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const palette = {};

  // Funktion zur Anpassung der Lightness
  const adjustLightness = (lightnessPercent) => {
    return hslToHex(h, s, lightnessPercent);
  };

  // Farbpalette in absteigender Reihenfolge von L = 0% bis L = 100%
  for (let i = 1000; i >= 0; i -= 50) {
    const lightnessPercent = 100 - i / 10; // L startet bei 100% und geht runter bis 0%
    palette[`--color-${name}-${i}`] = adjustLightness(lightnessPercent);
  }

  return palette;
}

export default function ColorPaletteGenerator() {
  const [hex, setHex] = useState('');
  const [paletteName, setPaletteName] = useState('');
  const [generatedPalette, setGeneratedPalette] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleHexChange = (e) => setHex(e.target.value);
  const handlePaletteNameChange = (e) => setPaletteName(e.target.value);

  const handleGeneratePalette = () => {
    const formattedHex = hex.startsWith('#') ? hex : `#${hex}`;
    const formattedName = paletteName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const palette = generatePalette(formattedHex, formattedName);
    setGeneratedPalette(palette);
  };

  const handleCopyPalette = () => {
    navigator.clipboard.writeText(
      Object.entries(generatedPalette)
        .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`) // Farbcodes in Kleinbuchstaben
        .join('\n')
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Erfolgsmeldung nach 2 Sekunden wieder ausblenden
  };

  return (
    <Wrapper>
      <Title>Color Palette Generator</Title>
      <InputGroup>
        <Label>Farbwert (Hex):</Label>
        <Input type='text' value={hex} onChange={handleHexChange} placeholder='#' />
      </InputGroup>
      <InputGroup>
        <Label>Palettenname:</Label>
        <Input type='text' value={paletteName} onChange={handlePaletteNameChange} placeholder='name' />
      </InputGroup>
      <Button onClick={handleGeneratePalette}>Palette generieren</Button>
      <Spacer />
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
              .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`) // Farbcodes in Kleinbuchstaben
              .join('\n')}
          </PaletteOutput>
        </PaletteWrapper>
      )}
    </Wrapper>
  );
}