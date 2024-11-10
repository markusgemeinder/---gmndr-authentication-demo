// /app/components/Color/PaletteGenerator.js

'use client';

import { useReducer, useState, useEffect } from 'react';
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
  GeneratePaletteButton,
  ResetFormButton,
  CopyPaletteButton,
  SnapshotContainer,
  SnapshotButton,
  UndoButton,
  RedoButton,
  PaletteWrapper,
  PaletteOutput,
} from '@/app/components/Color/PaletteGeneratorStyles';
import { FaCopy, FaSlidersH, FaRedo, FaUndo, FaCamera, FaCheck } from 'react-icons/fa';
import { generateMonochromePalette, getColorPreview } from '@/utils/colorUtils';

// Default Werte
const defaults = {
  hex: '#00ffff',
  prefix: '--color-',
  suffix: 'test',
  sortOrder: 'asc',
  checkedValues: [
    0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
  ],
  selectedOption: 'Alle',
  darkLimit: 15,
  brightLimit: 95,
  generatedPalette: null,
};

const selectorOptions = {
  Alle: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000],
  '100er [0-1000]': [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  '100er [100-900]': [100, 200, 300, 400, 500, 600, 700, 800, 900],
  '100er [mit 50, 950]': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  '200er [0-1000]': [0, 200, 400, 600, 800, 1000],
  '200er [200-800]': [200, 400, 600, 800],
  Keine: [],
};

const allValues = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
];

// Reducer Funktion zum Steuern des States
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
    default:
      return state;
  }
}

function loadFromLocalStorage() {
  if (typeof window === 'undefined') return defaults; // Rückgabe von Defaults, wenn nicht im Browser

  const storedState = {
    hex: localStorage.getItem('hex') || defaults.hex,
    prefix: localStorage.getItem('prefix') || defaults.prefix,
    suffix: localStorage.getItem('suffix') || defaults.suffix,
    sortOrder: localStorage.getItem('sortOrder') || defaults.sortOrder,
    checkedValues: JSON.parse(localStorage.getItem('checkedValues')) || defaults.checkedValues,
    selectedOption: localStorage.getItem('selectedOption') || defaults.selectedOption,
    darkLimit: !isNaN(parseInt(localStorage.getItem('darkLimit')))
      ? parseInt(localStorage.getItem('darkLimit'))
      : defaults.darkLimit,
    brightLimit: !isNaN(parseInt(localStorage.getItem('brightLimit')))
      ? parseInt(localStorage.getItem('brightLimit'))
      : defaults.brightLimit,
    generatedPalette: null,
  };

  return storedState;
}

export default function PaletteGenerator() {
  // Initialisierung des States aus dem Local Storage
  const [state, dispatch] = useReducer(paletteReducer, loadFromLocalStorage());
  const [snapshots, setSnapshots] = useState([]);
  const [snapshotIndex, setSnapshotIndex] = useState(-1);
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  const [isCopied, setIsCopied] = useState(false);
  const [isGenerateClicked, setIsGenerateClicked] = useState(false);
  const [isResetClicked, setIsResetClicked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hex', state.hex);
      localStorage.setItem('prefix', state.prefix);
      localStorage.setItem('suffix', state.suffix);
      localStorage.setItem('sortOrder', state.sortOrder);
      localStorage.setItem('checkedValues', JSON.stringify(state.checkedValues));
      localStorage.setItem('selectedOption', state.selectedOption);
      localStorage.setItem('darkLimit', state.darkLimit.toString());
      localStorage.setItem('brightLimit', state.brightLimit.toString());
    }
  }, [state]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSnapshots = JSON.parse(sessionStorage.getItem('snapshots')) || [];
      const storedIndex = parseInt(sessionStorage.getItem('snapshotIndex')) || -1;

      if (storedSnapshots.length !== snapshots.length || storedIndex !== snapshotIndex) {
        setSnapshots(storedSnapshots);
        setSnapshotIndex(storedIndex);
      }
    }
  }, []); // Beim ersten Laden aus sessionStorage

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentSnapshots = JSON.parse(sessionStorage.getItem('snapshots')) || [];
      if (snapshots !== currentSnapshots) {
        sessionStorage.setItem('snapshots', JSON.stringify(snapshots));
      }
    }
  }, [snapshots]); // Nur, wenn der snapshots State sich ändert

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('snapshotIndex', snapshotIndex); // Snapshot Index speichern
    }
  }, [snapshotIndex]); // Nur wenn der snapshotIndex sich ändert

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSnapshots = JSON.parse(sessionStorage.getItem('snapshots')) || [];
      const storedIndex = parseInt(sessionStorage.getItem('snapshotIndex')) || -1;

      if (storedSnapshots.length !== snapshots.length || storedIndex !== snapshotIndex) {
        setSnapshots(storedSnapshots);
        setSnapshotIndex(storedIndex);
      }
    }
  }, [snapshots, snapshotIndex]);

  const handleSnapshot = () => {
    // Erstelle den aktuellen Snapshot
    const snapshot = {
      hex: state.hex,
      prefix: state.prefix,
      suffix: state.suffix,
      sortOrder: state.sortOrder,
      checkedValues: state.checkedValues,
      selectedOption: state.selectedOption,
      darkLimit: state.darkLimit,
      brightLimit: state.brightLimit,
    };

    // Überprüfen, ob der aktuelle Snapshot sich vom letzten unterscheidet
    const lastSnapshot = snapshots[snapshotIndex];

    // Wenn der letzte Snapshot existiert und der aktuelle Snapshot gleich ist, keinen neuen Snapshot speichern
    if (
      lastSnapshot &&
      lastSnapshot.hex === snapshot.hex &&
      lastSnapshot.prefix === snapshot.prefix &&
      lastSnapshot.suffix === snapshot.suffix &&
      lastSnapshot.sortOrder === snapshot.sortOrder &&
      isArraysEqual(lastSnapshot.checkedValues, snapshot.checkedValues) &&
      lastSnapshot.selectedOption === snapshot.selectedOption &&
      lastSnapshot.darkLimit === snapshot.darkLimit &&
      lastSnapshot.brightLimit === snapshot.brightLimit
    ) {
      return; // Keine Änderung, also kein Snapshot speichern
    }

    // Wenn es eine Änderung gibt, Snapshot speichern
    const newSnapshots = [...snapshots.slice(0, snapshotIndex + 1), snapshot];
    setSnapshots(newSnapshots);
    setSnapshotIndex(newSnapshots.length - 1);
  };

  const handleUndo = () => {
    if (snapshotIndex > 0) {
      const prevSnapshot = snapshots[snapshotIndex - 1];
      console.log('Undo: Prev Snapshot', prevSnapshot); // Debugging
      dispatch({ type: 'SET_VALUE', key: 'hex', value: prevSnapshot.hex });
      dispatch({ type: 'SET_VALUE', key: 'prefix', value: prevSnapshot.prefix });
      dispatch({ type: 'SET_VALUE', key: 'suffix', value: prevSnapshot.suffix });
      dispatch({ type: 'SET_VALUE', key: 'sortOrder', value: prevSnapshot.sortOrder });
      dispatch({ type: 'SET_CHECKED_VALUES', value: prevSnapshot.checkedValues });
      dispatch({ type: 'SET_SELECTED_OPTION', value: prevSnapshot.selectedOption });
      dispatch({ type: 'SET_VALUE', key: 'darkLimit', value: prevSnapshot.darkLimit });
      dispatch({ type: 'SET_VALUE', key: 'brightLimit', value: prevSnapshot.brightLimit });
      setSnapshotIndex(snapshotIndex - 1);
    }
  };

  const handleRedo = () => {
    if (snapshotIndex < snapshots.length - 1) {
      const nextSnapshot = snapshots[snapshotIndex + 1];
      console.log('Redo: Next Snapshot', nextSnapshot); // Debugging
      dispatch({ type: 'SET_VALUE', key: 'hex', value: nextSnapshot.hex });
      dispatch({ type: 'SET_VALUE', key: 'prefix', value: nextSnapshot.prefix });
      dispatch({ type: 'SET_VALUE', key: 'suffix', value: nextSnapshot.suffix });
      dispatch({ type: 'SET_VALUE', key: 'sortOrder', value: nextSnapshot.sortOrder });
      dispatch({ type: 'SET_CHECKED_VALUES', value: nextSnapshot.checkedValues });
      dispatch({ type: 'SET_SELECTED_OPTION', value: nextSnapshot.selectedOption });
      dispatch({ type: 'SET_VALUE', key: 'darkLimit', value: nextSnapshot.darkLimit });
      dispatch({ type: 'SET_VALUE', key: 'brightLimit', value: nextSnapshot.brightLimit });
      setSnapshotIndex(snapshotIndex + 1);
    }
  };

  const handleSnapshotClick = () => {
    setSnapshotTaken(true);
    handleSnapshot();
    setTimeout(() => setSnapshotTaken(false), 1000);
  };

  const handleHexChange = (e) => {
    dispatch({ type: 'SET_VALUE', key: 'hex', value: e.target.value });
  };

  const handleColorPickerChange = (e) => {
    dispatch({ type: 'SET_VALUE', key: 'hex', value: e.target.value });
  };

  const handleGeneratePalette = () => {
    setIsGenerateClicked(true);
    setTimeout(() => setIsGenerateClicked(false), 200);

    // Erstelle die Palette ohne die Basisfarbwert-Zeile
    const palette = generateMonochromePalette(
      state.hex,
      state.prefix,
      state.suffix,
      state.darkLimit,
      state.brightLimit
    );

    // Palette nach den ausgewählten Werten und Sortierung filtern
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

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleCopyPalette = () => {
    // Berechnung der angezeigten Helligkeitslimits
    const brightLimitDisplayed = 100 - state.brightLimit;
    const darkLimitDisplayed = 100 - state.darkLimit;

    // Kommentar mit den zusätzlichen Zeilen
    const comment =
      `/* ${state.prefix}${state.suffix}-base: ${state.hex}; */\n` +
      `/* Light level (0): ${brightLimitDisplayed}% | Dark level (1000): ${darkLimitDisplayed}% */\n`;

    // Palette als CSS-Format erstellen
    const paletteText = Object.entries(state.generatedPalette)
      .map(([key, value]) => `${key.toLowerCase()}: ${value.toLowerCase()};`)
      .join('\n');

    // Alles in die Zwischenablage kopieren
    navigator.clipboard.writeText(comment + paletteText);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Nach 2 Sekunden den "Kopiert!"-Text zurücksetzen
  };

  const handleSelectOption = (option) => {
    dispatch({ type: 'SET_SELECTED_OPTION', value: option });
    dispatch({ type: 'SET_CHECKED_VALUES', value: selectorOptions[option] || [] });
  };

  const isArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  };

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
      <Title>Monochrome Palette Generator</Title>
      <InputGroup>
        <Label>Basisfarbwert (Hex):</Label>
        <ColorPickerWrapper>
          <ColorPicker type='color' value={state.hex} onChange={handleColorPickerChange} />
          <TextInput type='text' value={state.hex} onChange={handleHexChange} placeholder='#' />
        </ColorPickerWrapper>
      </InputGroup>
      <InputGroup>
        <Label>Hellster Wert (0):</Label>
        <ColorTileWrapper>
          <ColorPreview $bgColor={getColorPreview(state.hex, state.brightLimit)} />
          <SliderText>
            <span>dunkler</span>
          </SliderText>
          <StyledSlider
            type='range'
            min={70}
            max={100}
            value={state.brightLimit}
            onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'brightLimit', value: parseInt(e.target.value) })}
            $startColor='#ffffff'
            $endColor={getColorPreview(state.hex, state.brightLimit)}
            $thumbColor='#fff'
            $thumbBorderColor='#333'
          />
          <SliderText>
            <span>heller</span>
          </SliderText>
          <SliderValue>{-(state.brightLimit - 100)}</SliderValue>
        </ColorTileWrapper>
      </InputGroup>
      <InputGroup>
        <Label>Dunkelster Wert (1000):</Label>
        <ColorTileWrapper>
          <ColorPreview $bgColor={getColorPreview(state.hex, state.darkLimit)} />
          <SliderText>
            <span>dunkler</span>
          </SliderText>
          <StyledSlider
            type='range'
            min={0}
            max={30}
            value={state.darkLimit}
            onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'darkLimit', value: parseInt(e.target.value) })}
            $startColor={getColorPreview(state.hex, state.darkLimit)}
            $endColor={getColorPreview(state.hex, state.darkLimit)}
            // $endColor='#000000'
            $thumbColor='#fff'
            $thumbBorderColor='#333'
          />
          <SliderText>
            <span>heller</span>
          </SliderText>
          <SliderValue>{100 - state.darkLimit}</SliderValue>
        </ColorTileWrapper>
      </InputGroup>
      {/* New Input for Prefix */}
      <InputGroup>
        <Label>Prefix:</Label>
        <TextInput
          type='text'
          value={state.prefix}
          onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'prefix', value: e.target.value })}
          placeholder='--color-'
        />
      </InputGroup>
      {/* New Input for Suffix */}
      <InputGroup>
        <Label>Suffix:</Label>
        <TextInput
          type='text'
          value={state.suffix}
          onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'suffix', value: e.target.value })}
          placeholder='test'
        />
      </InputGroup>
      <InputGroup>
        <Label>Sortierung:</Label>
        <Select
          value={state.sortOrder}
          onChange={(e) => dispatch({ type: 'SET_VALUE', key: 'sortOrder', value: e.target.value })}>
          <option value='asc'>Aufsteigend (0 ... 1000)</option>
          <option value='desc'>Absteigend (1000 ... 0)</option>
        </Select>
      </InputGroup>
      <InputGroup>
        <Label>Ausgabewerte:</Label>
        <Select value={state.selectedOption} onChange={(e) => handleSelectOption(e.target.value)}>
          {Object.keys(selectorOptions).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </InputGroup>
      <InputGroup>
        <CheckboxGroup>
          {allValues.map((value) => (
            <CheckboxLabel key={value}>
              <input
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

      <SnapshotContainer>
        <SnapshotButton onClick={handleSnapshotClick}>{snapshotTaken ? <FaCheck /> : <FaCamera />}</SnapshotButton>
        <UndoButton onClick={handleUndo}>
          <FaUndo />
        </UndoButton>
        <RedoButton onClick={handleRedo}>
          <FaRedo />
        </RedoButton>
      </SnapshotContainer>

      <GeneratePaletteButton width='100%' onClick={handleGeneratePalette}>
        <FaSlidersH /> Palette generieren
      </GeneratePaletteButton>
      {isFormChanged() && (
        <ResetFormButton width='auto' onClick={resetForm}>
          <FaRedo /> Formular zurücksetzen
        </ResetFormButton>
      )}
      {state.generatedPalette && (
        <PaletteWrapper>
          <CopyPaletteButton width='auto' onClick={handleCopyPalette}>
            <FaCopy /> {isCopied ? 'Kopiert!' : 'Kopieren'}
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
