'use client';

import { useState } from 'react';

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

export default function Test() {
  const [hex, setHex] = useState('');
  const [paletteName, setPaletteName] = useState('');
  const [generatedPalette, setGeneratedPalette] = useState(null);

  const handleHexChange = (e) => setHex(e.target.value);
  const handlePaletteNameChange = (e) => setPaletteName(e.target.value);

  const handleGeneratePalette = () => {
    const formattedHex = hex.startsWith('#') ? hex : `#${hex}`;
    const formattedName = paletteName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const palette = generatePalette(formattedHex, formattedName);
    setGeneratedPalette(palette);
  };

  return (
    <div>
      <h1>Test</h1>
      <div>
        <label>
          Farbwert (Hex):
          <input type='text' value={hex} onChange={handleHexChange} placeholder='#' />
        </label>
      </div>
      <div>
        <label>
          Palettenname:
          <input type='text' value={paletteName} onChange={handlePaletteNameChange} placeholder='name' />
        </label>
      </div>
      <button onClick={handleGeneratePalette}>Palette erstellen</button>

      {generatedPalette && (
        <div style={{ marginTop: '20px' }}>
          <h3>Farbpalette für {paletteName}:</h3>
          <pre>
            {Object.entries(generatedPalette)
              .map(([key, value]) => `${key}: ${value};`)
              .join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
}
