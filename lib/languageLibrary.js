// /lib/languageLibrary.js
const languageLibrary = {
  home: {
    title: { EN: '#GMNDR Authentication Demo', DE: '#GMNDR Authentifizierungsdemo' },
    button_send_email: { EN: 'Send Test Email', DE: 'Test-E-Mail senden' },
    button_sending: { EN: 'Sending...', DE: 'Senden...' },
    email_failure: { EN: 'Failed to send test email.', DE: 'Senden der Test-E-Mail fehlgeschlagen.' },
    email_success: { EN: 'Test email sent successfully!', DE: 'Test-E-Mail erfolgreich gesendet!' },
  },
  navigation: {
    home: { EN: 'Home', DE: 'Home' },
    about: { EN: 'About', DE: 'Über' },
    forgot_password: { EN: 'Forgot Password', DE: 'Passwort vergessen' },
    reviews: { EN: 'Reviews', DE: 'Bewertungen' },
    logout: { EN: 'Logout', DE: 'Logout' },
    login: { EN: 'Login', DE: 'Login' },
    register: { EN: 'Register', DE: 'Registrieren' },
  },
  review_card: {
    alert_last_digits_mismatch: {
      EN: 'The last 4 digits do not match. Please try again.',
      DE: 'Die letzten 4 Ziffern stimmen nicht überein. Bitte versuche es erneut.',
    },
    button_cancel: { EN: 'Cancel', DE: 'Abbrechen' },
    button_confirm: { EN: 'Confirm', DE: 'Bestätigen' },
    button_delete: { EN: 'Delete', DE: 'Löschen' },
    button_edit: { EN: 'Edit', DE: 'Bearbeiten' },
    error_deleting_review: { EN: 'Error deleting the review:', DE: 'Fehler beim Löschen der Bewertung:' },
    label_created: { EN: 'Created', DE: 'Erstellt' },
    label_id: { EN: 'ID', DE: 'ID' },
    label_updated: { EN: 'Updated', DE: 'Aktualisiert' },
    modal_confirm_delete: { EN: 'Confirm Delete', DE: 'Löschen bestätigen' },
    modal_delete_warning: {
      EN: 'Are you sure you want to delete this review? This action is irreversible.',
      DE: 'Möchtest du diese Bewertung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
    },
    placeholder_enter_last_digits: {
      EN: 'Enter last 4 digits of the review ID',
      DE: 'Gib die letzten 4 Ziffern der Bewertungs-ID ein',
    },
  },
  review_create: {
    title: { EN: 'Create Review', DE: 'Bewertung erstellen' },
  },
  review_edit: {
    title: { EN: 'Edit Review', DE: 'Bewertung bearbeiten' },
    error_demo_review_not_found: { EN: 'Demo review not found', DE: 'Demo-Bewertung nicht gefunden' },
    error_review_not_found: { EN: 'Review not found', DE: 'Bewertung nicht gefunden' },
    error_fetching_review: { EN: 'Error fetching review:', DE: 'Fehler beim Laden der Bewertung:' },
    review_not_found: { EN: 'Review not found', DE: 'Bewertung nicht gefunden' },
  },
  review_form: {
    button_cancel: { EN: 'Cancel', DE: 'Abbrechen' },
    button_save: { EN: 'Save', DE: 'Speichern' },
    error_saving_review: { EN: 'Error saving review:', DE: 'Fehler beim Speichern der Bewertung:' },
    label_created: { EN: 'Created', DE: 'Erstellt' },
    label_email: { EN: 'Email', DE: 'E-Mail' },
    label_note: { EN: 'Note', DE: 'Notiz' },
    label_rating: { EN: 'Rating', DE: 'Bewertung' },
    label_updated: { EN: 'Updated', DE: 'Aktualisiert' },
    not_updated: { EN: 'Not updated', DE: 'Nicht aktualisiert' },
  },
  reviews: {
    title: { EN: 'Reviews', DE: 'Bewertungen' },
    button_create_demo_review: { EN: 'Create Demo Review', DE: 'Demo-Bewertung erstellen' },
    button_create_review: { EN: 'Create Review', DE: 'Bewertung erstellen' },
    demo_review_note: {
      EN: 'Logged in as a Demo User. You can edit and delete this review, but it will not be saved. When logging out or closing the browser it disappears.',
      DE: 'Eingeloggt als Demo-Benutzer. Sie können diese Bewertung bearbeiten und löschen, aber sie wird nicht gespeichert. Beim Abmelden oder Schließen des Browsers verschwindet sie.',
    },
    error_fetching_reviews: { EN: 'Error fetching reviews:', DE: 'Fehler beim Abrufen der Bewertungen:' },
    error_not_array: { EN: 'Data is not an array', DE: 'Die Daten sind kein Array' },
    username_demo: { EN: 'Demo User', DE: 'Demo-Benutzer' },
  },
  test: {
    button_send_email: { EN: 'Send Test Email', DE: 'Test-E-Mail senden' },
    button_sending: { EN: 'Sending...', DE: 'Senden...' },
    email_failure: { EN: 'Failed to send test email.', DE: 'Senden der Test-E-Mail fehlgeschlagen.' },
    email_success: { EN: 'Test email sent successfully!', DE: 'Test-E-Mail erfolgreich gesendet!' },
    greeting_afternoon: { EN: 'Good afternoon', DE: 'Guten Nachmittag' },
    greeting_evening: { EN: 'Good evening', DE: 'Guten Abend' },
    greeting_morning: { EN: 'Good morning', DE: 'Guten Morgen' },
    headline: { EN: 'Our Approach to Enhanced Usability', DE: 'Unser Ansatz zur verbesserten Benutzerfreundlichkeit' },
    paragraph_intro: {
      EN: 'Our goal is to simplify digital navigation, making information easy to access. A clear design helps users find what they need, improving overall satisfaction and engagement with the platform.',
      DE: 'Unser Ziel ist es, die digitale Navigation zu vereinfachen, sodass Informationen leicht zugänglich sind. Ein klares Design hilft Benutzern, das zu finden, was sie benötigen, was die Gesamtzufriedenheit und das Engagement für die Plattform verbessert.',
    },
    paragraph_updates: {
      EN: 'Upcoming updates will focus on customizable features for a more personal experience. By listening to feedback, we aim to create an interface that adapts to various user needs seamlessly.',
      DE: 'Zukünftige Updates werden sich auf anpassbare Funktionen konzentrieren, um eine persönlichere Erfahrung zu ermöglichen. Durch das Hören auf Feedback streben wir an, eine Schnittstelle zu schaffen, die sich nahtlos an verschiedene Benutzerbedürfnisse anpasst.',
    },
    subtitle: {
      EN: 'Designing a Clear and Intuitive Interface',
      DE: 'Entwurf einer klaren und intuitiven Schnittstelle',
    },
    switch_language: { EN: 'Language –> DE', DE: 'Sprache –> EN' },
    title: { EN: 'Test Page | Improving User Experience', DE: 'Testseite | Verbesserung der Benutzererfahrung' },
  },
};

export function getText(pageRef, key, language) {
  const textItem = languageLibrary[pageRef]?.[key];
  return textItem ? (language === 'DE' ? textItem.DE : textItem.EN) : '';
}

export default languageLibrary;
