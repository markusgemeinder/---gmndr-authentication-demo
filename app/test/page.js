'use client';

import { useState } from 'react';

function hexToRgb(hex) {
  // Falls der Hex-Wert 3-stellig ist, erweitere ihn auf 6-stellig
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

  return [r, g, b]; // RGB-Werte zurück
}

function rgbToHex(r, g, b) {
  // Konvertiert RGB zu Hex
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function generatePalette(hex, name) {
  const [r, g, b] = hexToRgb(hex);
  const palette = {};

  // Funktion zum Erstellen der RGB-Werte mit angepasster Helligkeit
  const adjustLightness = (lightnessPercent) => {
    const scale = lightnessPercent / 100;

    // Berechnung der neuen RGB-Werte, indem der Farbton (RGB) mit dem Lightness-Faktor multipliziert wird
    const newR = Math.round(r * scale);
    const newG = Math.round(g * scale);
    const newB = Math.round(b * scale);

    return rgbToHex(newR, newG, newB);
  };

  // Farbpalette mit verschiedenen Helligkeitswerten (Lightness von 100% bis 0%)
  for (let i = 0; i <= 1000; i += 50) {
    const lightnessPercent = 100 - i / 10; // Umwandlung von 0-1000 auf 100%-0% Lightness
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
