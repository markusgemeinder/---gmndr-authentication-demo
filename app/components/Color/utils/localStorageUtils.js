// /app/components/Color/localStorageUtils.js

import { defaults } from '../PaletteGenerator';

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

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

export function loadFormDataFromLocalStorage() {
  return getLocalStorage('formData') || defaults;
}

export function saveSnapshotsToLocalStorage(snapshots, snapshotIndex) {
  setLocalStorage('snapshots', snapshots);
  setLocalStorage('snapshotIndex', snapshotIndex);
}

export function loadSnapshotsFromLocalStorage() {
  const snapshots = getLocalStorage('snapshots') || [];
  const snapshotIndex = getLocalStorage('snapshotIndex') || -1;
  return { snapshots, snapshotIndex };
}
