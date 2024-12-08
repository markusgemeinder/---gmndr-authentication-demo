// /utils/paletteGeneratorUtils.js

// Hex-zu-RGB-Umwandlung
export function hexToRgb(hex) {
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
export function rgbToHsl(r, g, b) {
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
export function hslToHex(h, s, l) {
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
export function getHexFromLightness(h, s, lightness) {
  return hslToHex(h, s, lightness);
}

// Monochrome Palette Generierung
export function generateMonochromePalette(hex, prefix, suffix, leftLimit, rightLimit) {
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
    const lightnessPercent = rightLimit - step * i; // Von leftLimit zu rightLimit
    palette[`${prefix}${suffix}-${i}`] = adjustLightness(lightnessPercent);
  }

  return palette;
}

// Neue Funktion, um die Farbe basierend auf dem Helligkeitswert zu berechnen
export function getColorPreview(hex, lightnessPercent) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, _] = rgbToHsl(r, g, b);
  return hslToHex(h, s, lightnessPercent);
}
