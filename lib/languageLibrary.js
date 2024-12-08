// /lib/languageLibrary.js

const languageLibrary = {
  // ColorPaletteGenerator ===== Beginn

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

  home: {
    title: { EN: '#GMNDR Color Palette Generator', DE: '#GMNDR Farbpalette Generator' },
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
    title: { EN: '#GMNDR Auth Demo', DE: '#GMNDR Auth Demo' },
    greeting_morning: { EN: 'Good morning', DE: 'Guten Morgen' },
    greeting_afternoon: { EN: 'Good afternoon', DE: 'Guten Tag' },
    greeting_evening: { EN: 'Good evening', DE: 'Guten Abend' },
    welcome_message: {
      EN: 'Welcome to a project by Markus Gemeinder from 2024, built with Next.js 14 and MongoDB. It features secure authentication and an extensible database-driven language system (example: EN/DE).',
      DE: 'Willkommen zu einem Projekt von Markus Gemeinder aus 2024, realisiert mit Next.js 14 und MongoDB. Es bietet sichere Authentifizierung und eine erweiterbare Sprachsteuerung mit Datenbankanbindung (hier im Beispiel EN/DE).',
    },
    project_overview_title: { EN: 'Project Overview', DE: 'Projektübersicht' },
    project_overview_description_1: {
      EN: 'This app enables secure user authentication, email verification (double opt-in), and a database-driven, extensible language system (example: EN/DE).',
      DE: 'Diese App ermöglicht sichere Authentifizierung, E-Mail-Verifizierung (Double Opt-In) und ein datenbankgestütztes, erweiterbares Sprachsystem (hier im Beispiel EN/DE).',
    },
    project_overview_description_2: {
      EN: 'Logged-in users can view, create, and manage reviews.',
      DE: 'Eingeloggte Benutzer können Bewertungen einsehen, erstellen und verwalten.',
    },
    main_features_title: { EN: 'Key Features', DE: 'Hauptmerkmale' },
    feature_multiple_login: {
      EN: 'Multiple login options: GitHub, Google, or custom credentials.',
      DE: 'Mehrere Anmeldemöglichkeiten: GitHub, Google oder benutzerdefinierte Anmeldeinformationen.',
    },
    feature_double_opt_in: {
      EN: 'Secure registration with double opt-in and password reset',
      DE: 'Sichere Registrierung mit Double Opt-In und Passwortzurücksetzung',
    },
    feature_middleware: {
      EN: 'Protected routes and middleware for secure access',
      DE: 'Geschützte Routen und Middleware für sicheren Zugriff',
    },
    feature_review_creation: {
      EN: '5-star review creation in the frontend',
      DE: '5-Sterne-Bewertungserstellung im Frontend',
    },
    feature_responsive_navigation: {
      EN: 'Responsive navigation and dark/light mode',
      DE: 'Responsive Navigation und Dunkel-/Hellmodus',
    },
    link_github: { EN: 'GitHub Repository', DE: 'GitHub-Repository' },
  },

  info_techstack: {
    backend_intro: {
      EN: 'Authentication, APIs, database, mail services:',
      DE: 'Authentifizierung, APIs, Datenbank, Maildienste:',
    },
    backend_mongodb: { EN: 'MongoDB', DE: 'MongoDB' },
    backend_next_auth: { EN: 'NextAuth', DE: 'NextAuth' },
    backend_next_response: { EN: 'NextResponse', DE: 'NextResponse' },
    backend_node: { EN: 'Node.js', DE: 'Node.js' },
    backend_sendgrid: { EN: 'SendGrid', DE: 'SendGrid' },
    backend_title: { EN: 'Backend', DE: 'Backend' },
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
    home: { EN: 'Generator', DE: 'Generator' },
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
