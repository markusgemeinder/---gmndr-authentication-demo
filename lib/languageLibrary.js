// /lib/languageLibrary.js
const languageLibrary = {
  about_contact: {
    contact: { EN: 'Contact', DE: 'Kontakt' },
    name: { EN: 'Markus Gemeinder', DE: 'Markus Gemeinder' },
    description: {
      EN: 'Self-employed in the field of coaching and marketing - open to new opportunities and seeking a side job in web development.',
      DE: 'Selbstständig im Bereich Coaching und Marketing - offen für neue Möglichkeiten und auf der Suche nach einem Nebenjob in der Webentwicklung.',
    },
    availability: {
      EN: 'Available from November to February (with limitations during the coaching main season from March to October).',
      DE: 'Verfügbar von November bis Februar (mit Einschränkungen während der Hauptsaison des Coachings von März bis Oktober).',
    },
    phone: { EN: 'Phone', DE: 'Telefon' },
    email: { EN: 'Email', DE: 'E-Mail' },
    website: { EN: 'Website', DE: 'Website' },
    github: { EN: 'GitHub', DE: 'GitHub' },
    instagram: { EN: 'Instagram', DE: 'Instagram' },
    facebook: { EN: 'Facebook', DE: 'Facebook' },
  },
  aboutNeueFische: {
    link_website: { EN: 'neue fische Website', DE: 'neue fische Webseite' },
    paragraph_participation: {
      EN: 'Successfully participated (3 months full-time) and completed in February 2024.',
      DE: 'Erfolgreich teilgenommen (3 Monate Vollzeit) und im Februar 2024 abgeschlossen.',
    },
    title: { EN: 'Web Development Bootcamp', DE: 'Webentwicklungs-Bootcamp' },
  },
  aboutProject: {
    feature_dark_light_mode: {
      EN: 'Dark/Light mode toggle for better UX',
      DE: 'Dunkel-/Hellmodus für mehr Bedienerfreundlichkeit',
    },
    feature_double_opt_in: {
      EN: 'Double opt-in registration and secure password reset',
      DE: 'Double-Opt-In-Registrierung und sichere Passwortzurücksetzung',
    },
    feature_feedback: {
      EN: 'Error and success feedback via modal popups',
      DE: 'Fehler- und Erfolgsmeldungen über modale Popups',
    },
    feature_middleware: {
      EN: 'Middleware and protected routes ensure secure access to user data',
      DE: 'Middleware und geschützte Routen gewährleisten sicheren Zugriff auf Benutzerdaten',
    },
    feature_multiple_login: {
      EN: 'Multiple login options: GitHub, Google, custom credentials, or demo user',
      DE: 'Mehrere Anmeldemöglichkeiten: GitHub, Google, benutzerdefinierte Anmeldeinformationen oder Demo User',
    },
    feature_responsive_navigation: {
      EN: 'Responsive burger menu navigation for mobile users',
      DE: 'Responsive Burger-Menü-Navigation für mobile Benutzer',
    },
    feature_review_creation: {
      EN: 'Frontend review creation with note and 5-star rating',
      DE: 'Frontend-Bewertungserstellung mit Notiz und 5-Sterne-Rating',
    },
    greeting_afternoon: { EN: 'Good afternoon', DE: 'Guten Tag' },
    greeting_evening: { EN: 'Good evening', DE: 'Guten Abend' },
    greeting_morning: { EN: 'Good morning', DE: 'Guten Morgen' },
    link_github: { EN: 'GitHub Repository', DE: 'GitHub-Repository' },
    project_overview_description: {
      EN: 'The main focus of this demo application is the login functionality. Users can create reviews with a note and a 5-star rating, view all reviews stored in MongoDB, and manage their submissions (edit and delete). Note that the reviews page serves only as a placeholder example for a protected area. The registration process includes a double opt-in for email verification and secure password recovery options.',
      DE: 'Der Schwerpunkt dieser Demoanwendung liegt auf der Anmeldefunktionalität. Benutzer können Bewertungen mit einer Notiz und einem 5-Sterne-Rating erstellen, alle in MongoDB gespeicherten Bewertungen anzeigen und ihre Einträge verwalten (bearbeiten und löschen). Beachten Sie, dass die Bewertungsseite nur als Platzhalterbeispiel für einen geschützten Bereich dient. Der Registrierungsprozess umfasst ein Double Opt-In zur E-Mail-Verifizierung und sichere Optionen zur Passwortwiederherstellung.',
    },
    project_overview_title: { EN: 'Project Overview', DE: 'Projektübersicht' },
    title: { EN: '#GMNDR Authentication Demo', DE: '#GMNDR Authentifizierungsdemo' },
    welcome_message: {
      EN: 'and welcome to a project developed by Markus Gemeinder in 2024 using Next.js 14. All functionalities are original developments created from scratch.',
      DE: 'und herzlich willkommen zu einem Projekt, das 2024 von Markus Gemeinder mit Next.js 14 realisiert wurde. Alle Funktionalitäten sind Eigenentwicklungen, die von Grund auf neu erstellt wurden.',
    },
  },
  aboutTechstack: {
    frontend_css: { EN: 'CSS', DE: 'CSS' },
    frontend_html: { EN: 'HTML', DE: 'HTML' },
    frontend_javascript: { EN: 'JavaScript', DE: 'JavaScript' },
    frontend_nextjs: { EN: 'Next.js', DE: 'Next.js' },
    frontend_react: { EN: 'React', DE: 'React' },
    frontend_react_icons: { EN: 'react-icons/fa', DE: 'react-icons/fa' },
    backend_intro: { EN: 'Authentication, APIs, mail services:', DE: 'Authentifizierung, APIs, Maildienste:' },
    backend_node: { EN: 'Node.js', DE: 'Node.js' },
    backend_next_auth: { EN: 'NextAuth', DE: 'NextAuth' },
    backend_next_response: { EN: 'NextResponse', DE: 'NextResponse' },
    backend_sendgrid: { EN: 'SendGrid', DE: 'SendGrid' },
    database_mongodb: { EN: 'MongoDB', DE: 'MongoDB' },
    database_title: { EN: 'Database', DE: 'Datenbank' },
    intro: {
      EN: 'Technologies and tools used in this project:',
      DE: 'Technologien und Werkzeuge, die in diesem Projekt verwendet werden:',
    },
    other_tools_github: { EN: 'GitHub', DE: 'GitHub' },
    other_tools_intro: { EN: 'Version control, deployment:', DE: 'Versionskontrolle, Bereitstellung:' },
    other_tools_title: { EN: 'Other Tools', DE: 'Weitere Werkzeuge' },
    other_tools_vercel: { EN: 'Vercel', DE: 'Vercel' },
    backend_title: { EN: 'Backend', DE: 'Backend' },
    frontend_title: { EN: 'Frontend', DE: 'Frontend' },
    title: { EN: 'Techstack', DE: 'Technologie-Stack' },
  },
  forgot_password_form: {
    email_label: { EN: 'Email:', DE: 'E-Mail:' },
    invalid_email: {
      EN: 'Please enter a valid email address.',
      DE: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    },
    reset_link_sent: {
      EN: 'A password reset link has been sent to your email.',
      DE: 'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.',
    },
    sending_email: {
      EN: 'Preparing to send your password reset link...',
      DE: 'Bereite den Versand Ihres Links zum Zurücksetzen des Passworts vor...',
    },
    unexpected_error: {
      EN: 'An unexpected error occurred. Please try again later.',
      DE: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    },
    send_reset_link: { EN: 'Send Reset Link', DE: 'Link zum Zurücksetzen senden' },
  },
  home: {
    title: { EN: '#GMNDR Authentication Demo', DE: '#GMNDR Authentifizierungsdemo' },
    button_send_email: { EN: 'Send Test Email', DE: 'Test-E-Mail senden' },
    button_sending: { EN: 'Sending...', DE: 'Senden...' },
    email_failure: { EN: 'Failed to send test email.', DE: 'Senden der Test-E-Mail fehlgeschlagen.' },
    email_success: { EN: 'Test email sent successfully!', DE: 'Test-E-Mail erfolgreich gesendet!' },
  },
  loading_animation: {
    loading_text: { EN: 'Loading...', DE: 'Lädt...' },
  },
  login_form: {
    demo_error: { EN: 'Error logging in as Demo User', DE: 'Fehler beim Einloggen als Demo User' },
    demo_logging_in: { EN: 'Logging in as Demo User...', DE: 'Einloggen als Demo User...' },
    email_label: { EN: 'Email:', DE: 'E-Mail:' },
    forgot_password: { EN: 'Forgot Password', DE: 'Passwort vergessen' },
    logging_in: { EN: 'Logging in...', DE: 'Anmelden...' },
    login: { EN: 'Login', DE: 'Anmelden' },
    login_error: {
      EN: 'Login failed. Please check your credentials.',
      DE: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.',
    },
    password_label: { EN: 'Password:', DE: 'Passwort:' },
    hide_password: { EN: 'Hide password', DE: 'Passwort verstecken' },
    show_password: { EN: 'Show password', DE: 'Passwort anzeigen' },
    demo_user: { EN: 'Demo User', DE: 'Demo User' },
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
  navigation_button_next_page: {
    'aria-label': {
      de: 'Nächste Seite',
      en: 'Next page',
    },
  },
  navigation_button_page_up: {
    'aria-label': {
      de: 'Nach oben scrollen',
      en: 'Scroll to top',
    },
  },
  navigation_button_previous_page: {
    'aria-label': {
      de: 'Vorherige Seite',
      en: 'Previous page',
    },
  },
  register_form: {
    email_label: { EN: 'Email:', DE: 'E-Mail:' },
    password_invalid: {
      EN: 'Please ensure your password meets the requirements.',
      DE: 'Bitte stellen Sie sicher, dass Ihr Passwort den Anforderungen entspricht.',
    },
    creating_account: { EN: 'Preparing to create your account...', DE: 'Vorbereiten der Erstellung Ihres Kontos...' },
    registration_failed: { EN: 'Registration failed.', DE: 'Registrierung fehlgeschlagen.' },
    unexpected_error: { EN: 'An unexpected error occurred.', DE: 'Ein unerwarteter Fehler ist aufgetreten.' },
    confirm: { EN: 'Confirm', DE: 'Bestätigen' },
    cancel: { EN: 'Cancel', DE: 'Abbrechen' },
  },
  reset_password_form: {
    token_required: { EN: 'Token is required.', DE: 'Token ist erforderlich.' },
    check_token_error: {
      EN: 'An error occurred while checking the token.',
      DE: 'Ein Fehler ist beim Überprüfen des Tokens aufgetreten.',
    },
    resetting_password: { EN: 'Resetting your password...', DE: 'Ihr Passwort wird zurückgesetzt...' },
    password_saved: {
      EN: 'New password saved. You can now log in.',
      DE: 'Neues Passwort gespeichert. Sie können sich jetzt anmelden.',
    },
    save_password_failed: {
      EN: 'Failed to save password. Please try again.',
      DE: 'Speichern des Passworts fehlgeschlagen. Bitte versuchen Sie es erneut.',
    },
    error_occurred: {
      EN: 'An error occurred. Please try again.',
      DE: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    },
    confirm: { EN: 'Confirm', DE: 'Bestätigen' },
    cancel: { EN: 'Cancel', DE: 'Abbrechen' },
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
      DE: 'Eingeloggt als Demo User. Sie können diese Bewertung bearbeiten und löschen, aber sie wird nicht gespeichert. Beim Abmelden oder Schließen des Browsers verschwindet sie.',
    },
    error_fetching_reviews: { EN: 'Error fetching reviews:', DE: 'Fehler beim Abrufen der Bewertungen:' },
    error_not_array: { EN: 'Data is not an array', DE: 'Die Daten sind kein Array' },
    username_demo: { EN: 'Demo User', DE: 'Demo User' },
  },
  session_status: {
    welcome_demo_user: {
      EN: 'Welcome! You are logged in as Demo User.',
      DE: 'Willkommen! Sie sind als Demo User angemeldet.',
    },
    welcome_user: {
      EN: 'Welcome, {email}! You are logged in as {role}.',
      DE: 'Willkommen, {email}! Sie sind als {role} angemeldet.',
    },
    your_login_expires_in: { EN: 'Your login expires in ', DE: 'Ihre Anmeldung läuft ab in ' },
    renew_session: { EN: 'renew session', DE: 'Sitzung erneuern' },
    session_expiring_soon: { EN: 'Session Expiring Soon', DE: 'Sitzung läuft bald ab' },
    logout: { EN: 'Logout', DE: 'Abmelden' },
    login_or_signup: { EN: 'Log in as a Demo User or ', DE: 'Melden Sie sich als Demo User an oder ' },
    log_in: { EN: 'Log in', DE: 'Einloggen' },
    sign_up: { EN: 'sign up', DE: 'Registrieren' },
    to_access_reviews: { EN: 'to access the Reviews section.', DE: 'um auf den Bewertungsbereich zuzugreifen.' },
    or: { EN: 'or', DE: 'oder' },
  },
  star_rating: {
    'aria-label': { EN: 'Star rating', DE: 'Sternbewertung' },
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
  theme_toggle_button: {
    'aria-label': {
      de: 'Farbschema umschalten',
      en: 'Toggle color theme',
    },
  },
  validate_password: {
    error_digit: {
      EN: 'Password must contain at least one digit.',
      DE: 'Das Passwort muss mindestens eine Ziffer enthalten.',
    },
    error_lowercase: {
      EN: 'Password must contain at least one lowercase letter.',
      DE: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.',
    },
    error_min_length: {
      EN: 'Password must be at least 8 characters long.',
      DE: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
    },
    error_mismatch: { EN: 'Passwords do not match.', DE: 'Die Passwörter stimmen nicht überein.' },
    error_special_char: {
      EN: 'Password must contain at least one special character.',
      DE: 'Das Passwort muss mindestens ein Sonderzeichen enthalten.',
    },
    error_uppercase: {
      EN: 'Password must contain at least one uppercase letter.',
      DE: 'Das Passwort muss mindestens einen Großbuchstaben enthalten.',
    },
    label_password: { EN: 'Password', DE: 'Passwort' },
    label_repeat_password: { EN: 'Repeat Password', DE: 'Passwort wiederholen' },
    toggle_hide: { EN: 'Hide password', DE: 'Passwort verstecken' },
    toggle_show: { EN: 'Show password', DE: 'Passwort anzeigen' },
  },
};

export function getText(pageRef, key, language) {
  const textItem = languageLibrary[pageRef]?.[key];
  return textItem ? (language === 'DE' ? textItem.DE : textItem.EN) : '';
}

export default languageLibrary;
