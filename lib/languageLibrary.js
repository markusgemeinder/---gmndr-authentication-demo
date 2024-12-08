// /lib/languageLibrary.js

const languageLibrary = {
  home: {
    title: { EN: '#GMNDR Color Generator', DE: '#GMNDR Farb-Generator' },
  },

  info_contact: {
    contact: { EN: 'Contact', DE: 'Kontakt' },
    name: { EN: 'Markus Gemeinder', DE: 'Markus Gemeinder' },
    description: {
      EN: 'Self-employed in the field of coaching and marketing communication – open to new opportunities in web and app development.',
      DE: 'Selbstständig im Bereich Coaching und Marketing-Kommunikation – offen für neue Möglichkeiten im Bereich Web- und Anwendungsentwicklung.',
    },
    // availability: {
    //   EN: 'Available from November to February (with limitations during the coaching main season from March to October).',
    //   DE: 'Verfügbar von November bis Februar (mit Einschränkungen während der Hauptsaison des Coachings von März bis Oktober).',
    // },
    phone: { EN: 'Phone', DE: 'Telefon' },
    email: { EN: 'Email', DE: 'E-Mail' },
    website: { EN: 'Website', DE: 'Website' },
    github: { EN: 'GitHub', DE: 'GitHub' },
    instagram: { EN: 'Instagram', DE: 'Instagram' },
    facebook: { EN: 'Facebook', DE: 'Facebook' },
  },

  info_neue_fische: {
    aria_label_close_expanded_image: { EN: 'Close enlarged view', DE: 'Vergrößerte Ansicht schließen' },
    link_website: { EN: 'neue fische Website', DE: 'neue fische Webseite' },
    paragraph_participation: {
      EN: 'Completed the bootcamp with success! Full-time participation for three months from November 2023 to February 2024.',
      DE: 'Bootcamp erfolgreich abgeschlossen! Drei Monate Vollzeit von November 2023 bis Februar 2024.',
    },
    title: { EN: 'Web Development Bootcamp', DE: 'Web Development Bootcamp' },
  },

  info_project: {
    title: { EN: '#GMNDR Color Generator', DE: '#GMNDR Farb-Generator' },
    greeting_morning: { EN: 'Good morning!', DE: 'Guten Morgen!' },
    greeting_afternoon: { EN: 'Good afternoon!', DE: 'Guten Tag!' },
    greeting_evening: { EN: 'Good evening!', DE: 'Guten Abend!' },
    welcome_message: {
      EN: 'Welcome to a project by Markus Gemeinder from 2024, built with Next.js 14.',
      DE: 'Willkommen zu einem Projekt von Markus Gemeinder aus 2024, realisiert mit Next.js 14.',
    },
    project_overview_title: { EN: 'Project Overview', DE: 'Projektübersicht' },
    project_overview_description: {
      EN: 'This app is a helpful tool for web developers, enabling easy generation of RGB hex color palettes for implementation in globals.css.',
      DE: 'Diese App ist ein Hilfstool für Webentwickler und ermöglicht die einfache Generierung von RGB-Hex-Farbpaletten zur Implementierung z.B. in globals.css.',
    },
    main_features_title: { EN: 'Key Features', DE: 'Hauptmerkmale' },
    feature_responsive_navigation: {
      EN: 'Responsive navigation, language selection, and dark/light mode.',
      DE: 'Responsive Navigation, Sprachauswahl und Dunkel-/Hellmodus',
    },
    feature_base_color_selection: {
      EN: 'Base color selection (intuitive choice or hex input)',
      DE: 'Auswahl der Basisfarbwerts (intuitive Farbauswahl oder Eingabe eines Hex-Wertes)',
    },
    feature_color_spread: {
      EN: 'Color spread adjustment for lightest and darkest value',
      DE: 'Einstellung der Farbspreizung für hellsten und dunkelsten Wert',
    },
    feature_custom_variable_naming: {
      EN: 'Custom naming of color variables (prefix and suffix)',
      DE: 'Individuelle Benennung der Farbvariablen (Eingabe von Prefix und Suffix)',
    },
    feature_sorting_and_scaling: {
      EN: 'Sorting and scaling options for output values',
      DE: 'Auswahl von Sortierung und Abstufung bei Ausgabewerten',
    },
    feature_snapshots: {
      EN: "Create snapshots (save in browser's local storage)",
      DE: 'Erstellung von Snapshots (Speicherung im LocalStorage des Browsers)',
    },
    link_github: { EN: 'GitHub Repository', DE: 'GitHub-Repository' },
  },

  info_techstack: {
    frontend_css: { EN: 'CSS', DE: 'CSS' },
    frontend_html: { EN: 'HTML', DE: 'HTML' },
    frontend_javascript: { EN: 'JavaScript', DE: 'JavaScript' },
    frontend_nextjs: { EN: 'Next.js', DE: 'Next.js' },
    frontend_react: { EN: 'React', DE: 'React' },
    frontend_react_icons: { EN: 'react-icons/fa', DE: 'react-icons/fa' },
    frontend_title: { EN: 'Frontend', DE: 'Frontend' },
    intro: {
      EN: 'Technologies and tools used in this project:',
      DE: 'Technologien und Werkzeuge, die in diesem Projekt verwendet werden:',
    },
    language_support_intro: {
      EN: 'Language control is managed via a custom language library, with support for multiple languages scalable through cookies.',
      DE: 'Die Sprachsteuerung erfolgt über eine individuell entwickelte Bibliothek, die mehrere Sprachen unterstützt und auf weitere Sprachen skalierbar ist, gesteuert über Cookies.',
    },
    language_support_title: {
      EN: 'Language Support',
      DE: 'Sprachsteuerung',
    },
    other_tools_github: { EN: 'GitHub', DE: 'GitHub' },
    other_tools_intro: { EN: 'Version control, deployment:', DE: 'Versionskontrolle, Bereitstellung:' },
    other_tools_title: { EN: 'Other Tools', DE: 'Weitere Werkzeuge' },
    other_tools_vercel: { EN: 'Vercel', DE: 'Vercel' },
    title: { EN: 'Techstack', DE: 'Tech-Stack' },
  },

  navigation: {
    home: { EN: 'Color Generator', DE: 'Farb-Generator' },
    info: { EN: 'Info', DE: 'Info' },
    aria_label_toggle_menu: { EN: 'Toggle burger menu', DE: 'Menü umschalten' },
  },

  navigation_button_next_page: {
    aria_label: {
      EN: 'Next page',
      DE: 'Nächste Seite',
    },
  },

  navigation_button_page_up: {
    aria_label: {
      EN: 'Scroll to top',
      DE: 'Nach oben scrollen',
    },
  },

  navigation_button_previous_page: {
    aria_label: {
      EN: 'Previous page',
      DE: 'Vorherige Seite',
    },
  },

  paletteGenerator: {
    adjustLabelsDarker: {
      EN: 'Darker',
      DE: 'Dunkler',
    },
    adjustLabelsLighter: {
      EN: 'Lighter',
      DE: 'Heller',
    },
    title: {
      EN: 'Monochrome Palette Generator',
      DE: 'Monochrom Farbpalette Generator',
    },
    hexLabel: {
      EN: 'Base Color (Hex):',
      DE: 'Basisfarbwert (Hex):',
    },
    brightLimitLabel: {
      EN: 'Lightest Value (0):',
      DE: 'Hellster Wert (0):',
    },
    darkLimitLabel: {
      EN: 'Darkest Value (1000):',
      DE: 'Dunkelster Wert (1000):',
    },
    outputValuesLabel: {
      EN: 'Output Values:',
      DE: 'Ausgabewerte:',
    },
    prefixLabel: {
      EN: 'Prefix:',
      DE: 'Prefix:',
    },
    suffixLabel: {
      EN: 'Suffix:',
      DE: 'Suffix:',
    },
    sortOrderLabel: {
      EN: 'Sort Order:',
      DE: 'Sortierung:',
    },
    generateButton: {
      EN: 'Generate Palette',
      DE: 'Palette generieren',
    },
    resetButton: {
      EN: 'Reset Form',
      DE: 'Formular zurücksetzen',
    },
    copyButton: {
      EN: 'Copy',
      DE: 'Kopieren',
    },
    copied: {
      EN: 'Copied!',
      DE: 'Kopiert!',
    },
    copyFailed: {
      EN: 'Failed to copy!',
      DE: 'Kopieren fehlgeschlagen!',
    },
    sortOrderAsc: {
      EN: 'Ascending (0 ... 1000)',
      DE: 'Aufsteigend (0 ... 1000)',
    },
    sortOrderDesc: {
      EN: 'Descending (1000 ... 0)',
      DE: 'Absteigend (1000 ... 0)',
    },
    selectorOptionDefault: {
      EN: 'All [0-1000]',
      DE: 'Alle [0-1000]',
    },
    selectorOption1: {
      EN: "100's [0-1000]",
      DE: '100er [0-1000]',
    },
    selectorOption2: {
      EN: "100's [100-900]",
      DE: '100er [100-900]',
    },
    selectorOption3: {
      EN: "100's [including 50, 950]",
      DE: '100er [inklusive 50, 950]',
    },
    selectorOption4: {
      EN: "200's [0-1000]",
      DE: '200er [0-1000]',
    },
    selectorOption5: {
      EN: "200's [200-800]",
      DE: '200er [200-800]',
    },
    selectorOptionNone: {
      EN: 'None',
      DE: 'Keine',
    },
  },

  snapshotController: {
    snapshotLimitReached: {
      EN: 'Maximum reached, no further snapshot possible.',
      DE: 'Maximum erreicht, kein weiterer Snapshot möglich.',
    },
    snapshotAlreadyExists: {
      EN: 'Snapshot already exists, no new snapshot possible.',
      DE: 'Snapshot existiert bereits, kein neuer Snapshot möglich.',
    },
    noSnapshotToDelete: {
      EN: 'No snapshot to delete.',
      DE: 'Kein Snapshot zum Löschen vorhanden.',
    },
    formDataChangedReset: {
      EN: 'Form data has been changed. Reset to the last snapshot?',
      DE: 'Die Formulardaten wurden verändert. Auf letzten Snapshot zurücksetzen?',
    },
    deleteCurrentSnapshot: {
      EN: 'Delete current snapshot?',
      DE: 'Aktuellen Snapshot löschen?',
    },
    deleteAllSnapshots: {
      EN: 'Delete all snapshots and reset form?',
      DE: 'Alle Snapshots löschen und Formular zurücksetzen?',
    },
    noSnapshotsToDelete: {
      EN: 'No snapshots to delete.',
      DE: 'Keine Snapshots zum Löschen vorhanden.',
    },
    snapshotSavedMaxReached: {
      EN: 'Snapshot saved. (Maximum reached, no further snapshot possible.)',
      DE: 'Snapshot gespeichert. (Maximum erreicht, kein weiterer Snapshot möglich.)',
    },
    formDataNotSaved: {
      EN: 'Form data not saved. Create a snapshot before continuing with the action?',
      DE: 'Formulareinstellung noch nicht gespeichert. Snapshot erstellen, bevor Aktion fortgesetzt wird?',
    },
  },

  snapshotControllerModal: {
    snapshotLimitReached: {
      EN: 'Maximum reached, no further snapshot possible.',
      DE: 'Maximum erreicht, kein weiterer Snapshot möglich.',
    },
    snapshotAlreadyExists: {
      EN: 'Snapshot already exists, no new snapshot possible.',
      DE: 'Snapshot existiert bereits, kein neuer Snapshot möglich.',
    },
    noSnapshotToDelete: {
      EN: 'No snapshot to delete.',
      DE: 'Kein Snapshot zum Löschen vorhanden.',
    },
    formDataChangedReset: {
      EN: 'Form data has been changed. Reset to the last snapshot?',
      DE: 'Die Formulardaten wurden verändert. Auf letzten Snapshot zurücksetzen?',
    },
    deleteCurrentSnapshot: {
      EN: 'Delete current snapshot?',
      DE: 'Aktuellen Snapshot löschen?',
    },
    deleteAllSnapshots: {
      EN: 'Delete all snapshots and reset form?',
      DE: 'Alle Snapshots löschen und Formular zurücksetzen?',
    },
    noSnapshotsToDelete: {
      EN: 'No snapshots to delete.',
      DE: 'Keine Snapshots zum Löschen vorhanden.',
    },
    snapshotSavedMaxReached: {
      EN: 'Snapshot saved. (Maximum reached, no further snapshot possible.)',
      DE: 'Snapshot gespeichert. (Maximum erreicht, kein weiterer Snapshot möglich.)',
    },
    formDataNotSaved: {
      EN: 'Form data not saved. Create a snapshot before continuing with the action?',
      DE: 'Formulareinstellung noch nicht gespeichert. Snapshot erstellen, bevor Aktion fortgesetzt wird?',
    },
    modalConfirm: {
      EN: 'Yes',
      DE: 'Ja',
    },
    modalCancel: {
      EN: 'No',
      DE: 'Nein',
    },
    modalOk: {
      EN: 'OK',
      DE: 'OK',
    },
  },

  theme_toggle_button: {
    'aria-label': {
      de: 'Farbschema umschalten',
      en: 'Toggle color theme',
    },
  },
};

export function getText(pageRef, key, language) {
  const textItem = languageLibrary[pageRef]?.[key];
  return textItem ? (language === 'DE' ? textItem.DE : textItem.EN) : '';
}

export default languageLibrary;
