// /app/components/Color/localStorageUtils.js

import { defaults } from '../PaletteGenerator';

// Funktion zum Setzen von Daten in den LocalStorage
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Fehler beim Speichern von ${key} in localStorage:`, error);
  }
}

// Funktion zum Abrufen von Daten aus dem LocalStorage mit Fehlerprüfung
export function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Fehler beim Abrufen und Parsen von ${key} aus localStorage:`, error);
    return null; // Rückfall auf null bei Fehler
  }
}

// Speichern der Snapshots im LocalStorage (aktualisiert, ohne snapshotPositionInArray)
export function saveSnapshotsToLocalStorage(snapshots) {
  setLocalStorage('snapshotsData', snapshots);
}

// Laden der Snapshots aus dem LocalStorage
export function loadSnapshotsFromLocalStorage() {
  const snapshots = getLocalStorage('snapshotsData') || []; // Standardwert: leeres Array
  return { snapshots };
}

// Speichern der Formulardaten im LocalStorage
export function saveFormDataToLocalStorage(state) {
  setLocalStorage('formData', {
    hex: state.hex,
    prefix: state.prefix,
    suffix: state.suffix,
    sortOrder: state.sortOrder,
    checkedValues: state.checkedValues,
    selectedOption: state.selectedOption,
    darkLimit: state.darkLimit,
    brightLimit: state.brightLimit,
  });
}

// Laden der Formulardaten aus dem LocalStorage
export function loadFormDataFromLocalStorage() {
  return getLocalStorage('formData') || defaults; // Falls keine Formulardaten vorhanden sind, verwenden wir die Standardwerte
}
