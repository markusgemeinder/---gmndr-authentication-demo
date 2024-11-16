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

// Speichern der Formulardaten im LocalStorage
export function saveFormDataToLocalStorage(state) {
  setLocalStorage('pg_formData', {
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
  return getLocalStorage('pg_formData') || defaults; // Falls keine Formulardaten vorhanden sind, verwenden wir die Standardwerte
}

// Speichern der Snapshots im LocalStorage
export function saveSnapshotsToLocalStorage(snapshots) {
  setLocalStorage('pg_snapshots', snapshots);
  setLocalStorage('pg_snapshotCount', snapshots.length); // Speichern der Anzahl
}

// Laden der Snapshots aus dem LocalStorage
export function loadSnapshotsFromLocalStorage() {
  const snapshots = getLocalStorage('pg_snapshots') || []; // Standardwert: leeres Array
  return { snapshots };
}

// Speichern des zuletzt verwendeten Snapshots
export function saveLastUsedSnapshotToLocalStorage(snapshot) {
  setLocalStorage('pg_lastUsedSnapshot', snapshot);
}

// Funktion zum Laden des zuletzt verwendeten Snapshots
export function loadLastUsedSnapshotFromLocalStorage() {
  return getLocalStorage('pg_lastUsedSnapshot') || null; // Rückfall auf null, wenn kein Snapshot gespeichert wurde
}

// Funktion zum Löschen des lastUsedSnapshot aus dem LocalStorage
export function deleteLastUsedSnapshotFromLocalStorage() {
  try {
    localStorage.removeItem('pg_lastUsedSnapshot');
  } catch (error) {
    console.error('Fehler beim Löschen von lastUsedSnapshot aus localStorage:', error);
  }
}
