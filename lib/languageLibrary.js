// /lib/languageLibrary.js

const languageLibrary = {
  accordion: {
    about_project_title: { EN: 'About this project', DE: 'Über dieses Projekt' },
    about_project_overview: {
      EN: 'The Auth Demo App serves as a reference example for Next.js and MongoDB.',
      DE: 'Die Auth Demo App dient als Referenzbeispiel für Next.js und MongoDB.',
    },
    about_project_auth_focus: {
      EN: 'The focus is on authentication features (registration, login, password recovery) and secure data processing.',
      DE: 'Der Fokus liegt dabei auf den Auth-Funktionen (Registrierung, Login, Passwort vergessen) und sicherer Datenverarbeitung.',
    },
    about_project_language_feature: {
      EN: 'A scalable language database (EN/DE) ensures multilingual support and completes the application.',
      DE: 'Eine skalierbare Sprachendatenbank (EN/DE) gewährleistet Mehrsprachigkeit und komplettiert die Anwendung.',
    },
    about_project_content: {
      EN: 'All details can be found under ',
      DE: 'Alle Details finden Sie unter ',
    },
    about_project_link: {
      EN: 'Info',
      DE: 'Info',
    },
    how_to_use_title: { EN: 'How to use this app', DE: 'Anwendungsmöglichkeiten dieser App' },
    how_to_use_create_account: {
      EN: 'Create an account or log in with GitHub/Google (Demo User also available).',
      DE: 'Erstellen Sie ein Konto oder loggen Sie sich mit GitHub/Google ein (Demo User verfügbar).',
    },
    how_to_use_add_reviews_and_saved: {
      EN: 'Add, edit, or delete reviews.',
      DE: 'Fügen Sie Bewertungen hinzu, bearbeiten oder löschen Sie diese.',
    },
    how_to_use_language_toggle: {
      EN: 'Switch language (EN/DE) or color mode.',
      DE: 'Wechseln Sie die Sprache (EN/DE) oder den Farbmodus.',
    },
    how_to_use_leave_message: {
      EN: 'Leave feedback in a review.',
      DE: 'Hinterlassen Sie Feedback in einer Bewertung.',
    },
  },

  api_auth_check_token: {
    token_required: { EN: 'Token is required.', DE: 'Token ist erforderlich.' },
    invalid_token: {
      EN: 'The provided token is invalid. Please request a new link.',
      DE: 'Der angegebene Token ist ungültig. Bitte fordern Sie einen neuen Link an.',
    },
    token_expired: {
      EN: 'The token has expired. Please request a new link.',
      DE: 'Der Token ist abgelaufen. Bitte fordern Sie einen neuen Link an.',
    },
    token_valid: {
      EN: 'The token is valid. You can reset your password.',
      DE: 'Der Token ist gültig. Sie können Ihr Passwort zurücksetzen.',
    },
    server_error: {
      EN: 'Something went wrong. Please try again later.',
      DE: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.',
    },
  },

  api_auth_forgot_password: {
    no_account_found: {
      EN: 'No account found with this email address.',
      DE: 'Kein Konto mit dieser E-Mail-Adresse gefunden.',
    },
    google_github_link_error: {
      EN: 'This email is linked to a Google or GitHub login. Password reset cannot be done here.',
      DE: 'Diese E-Mail-Adresse ist mit einem Google- oder GitHub-Konto verknüpft. Eine Passwortzurücksetzung ist hier nicht möglich.',
    },
    email_not_confirmed: {
      EN: 'Your email address is not confirmed yet. Please confirm before resetting your password.',
      DE: 'Ihre E-Mail-Adresse ist noch nicht bestätigt. Bitte bestätigen Sie, bevor Sie Ihr Passwort zurücksetzen.',
    },
    password_reset_email_sent: {
      EN: 'A password reset link has been sent to your email.',
      DE: 'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.',
    },
    forgot_password_failed: {
      EN: 'Something went wrong. Please try again later.',
      DE: 'Etwas ist schief gelaufen. Bitte versuchen Sie es später erneut.',
    },
  },

  api_auth_nextauth_options: {
    name: {
      EN: 'Credentials Login',
      DE: 'Anmeldung mit Anmeldeinformationen',
    },
    email_label: {
      EN: 'Email Address',
      DE: 'E-Mail-Adresse',
    },
    password_label: {
      EN: 'Password',
      DE: 'Passwort',
    },
    error_no_account: {
      EN: 'No account found with that email address.',
      DE: 'Kein Konto mit dieser E-Mail-Adresse gefunden.',
    },
    error_email_not_confirmed: {
      EN: 'Please confirm your email address to log in.',
      DE: 'Bitte bestätigen Sie Ihre E-Mail-Adresse, um sich anzumelden.',
    },
    error_confirmation_link_expired: {
      EN: 'Your confirmation link has expired.',
      DE: 'Ihr Bestätigungslink ist abgelaufen.',
    },
    error_github_registered: {
      EN: 'This email is already registered with GitHub. Please log in using GitHub.',
      DE: 'Diese E-Mail ist bereits bei GitHub registriert. Bitte melden Sie sich über GitHub an.',
    },
    error_google_registered: {
      EN: 'This email is already registered with Google. Please log in using Google.',
      DE: 'Diese E-Mail ist bereits bei Google registriert. Bitte melden Sie sich über Google an.',
    },
    error_incorrect_password: {
      EN: 'Incorrect password.',
      DE: 'Falsches Passwort.',
    },
    log_new_user_created: {
      EN: 'New user created:',
      DE: 'Neuer Benutzer erstellt:',
    },
    log_existing_user_updated: {
      EN: 'Existing user updated:',
      DE: 'Benutzer aktualisiert:',
    },
  },

  api_auth_register: {
    missing_fields: {
      EN: 'Both email and password are required.',
      DE: 'Sowohl E-Mail als auch Passwort sind erforderlich.',
    },
    google_user_error: {
      EN: 'This email is already registered with Google. Please log in using Google.',
      DE: 'Diese E-Mail-Adresse ist bereits bei Google registriert. Bitte melden Sie sich mit Google an.',
    },
    github_user_error: {
      EN: 'This email is already registered with GitHub. Please log in using GitHub.',
      DE: 'Diese E-Mail-Adresse ist bereits bei GitHub registriert. Bitte melden Sie sich mit GitHub an.',
    },
    email_not_confirmed: {
      EN: 'Your email address is already registered, but not confirmed yet. Please confirm and log in.',
      DE: 'Ihre E-Mail-Adresse ist bereits registriert, aber noch nicht bestätigt. Bitte bestätigen Sie und melden Sie sich an.',
    },
    email_in_use_error: {
      EN: 'Email is already in use. Please try logging in or reset your password.',
      DE: 'E-Mail wird bereits verwendet. Bitte versuchen Sie, sich anzumelden oder Ihr Passwort zurückzusetzen.',
    },
    registration_success: {
      EN: 'Registration successful! Please check your email inbox in a few minutes to confirm your account.',
      DE: 'Registrierung erfolgreich! Bitte überprüfen Sie in wenigen Minuten Ihr E-Mail-Postfach, um Ihr Konto zu bestätigen.',
    },
    registration_failed: {
      EN: 'Registration failed. Please try again later.',
      DE: 'Die Registrierung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.',
    },
  },

  api_auth_reset_password: {
    invalid_reset_link: { EN: 'The reset link is invalid.', DE: 'Der Rücksetzlink ist ungültig.' },
    link_expired: { EN: 'The reset link has expired.', DE: 'Der Rücksetzlink ist abgelaufen.' },
    password_and_token_required: {
      EN: 'Password and token are required.',
      DE: 'Passwort und Token sind erforderlich.',
    },
    password_updated: { EN: 'Password successfully updated.', DE: 'Passwort erfolgreich aktualisiert.' },
    update_failed: {
      EN: 'Failed to update password. Please try again later.',
      DE: 'Fehler beim Aktualisieren des Passworts. Bitte versuchen Sie es später erneut.',
    },
  },

  api_auth_verify_email: {
    email_verified: {
      EN: 'Email successfully verified. Please log in.',
      DE: 'E-Mail erfolgreich verifiziert. Bitte loggen Sie sich ein.',
    },
    email_already_confirmed: {
      EN: 'Your email is already confirmed, the verification link is invalid. Please try logging in.',
      DE: 'Ihre E-Mail ist bereits bestätigt, der Bestätigungslink ist ungültig. Bitte versuchen Sie, sich einzuloggen.',
    },
    invalid_link: {
      EN: 'Invalid link. It may have already been used or was copied incorrectly.',
      DE: 'Ungültiger Link. Er wurde möglicherweise bereits verwendet oder wurde falsch kopiert.',
    },
    link_expired: {
      EN: 'The verification link has expired. Please request a new one.',
      DE: 'Der Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an.',
    },
    token_required: { EN: 'Token is required.', DE: 'Token ist erforderlich.' },
    verification_failed: {
      EN: 'Failed to verify email. Please try again later.',
      DE: 'Fehler bei der Verifizierung der E-Mail. Bitte versuchen Sie es später erneut.',
    },
  },

  api_auth_verify_email_resend: {
    email_required: {
      EN: 'Email is required.',
      DE: 'E-Mail ist erforderlich.',
    },
    no_account_found: {
      EN: 'No account found with that email.',
      DE: 'Kein Konto mit dieser E-Mail gefunden.',
    },
    email_already_confirmed: {
      EN: 'Your email is already confirmed.',
      DE: 'Ihre E-Mail ist bereits bestätigt.',
    },
    verification_email_sent: {
      EN: 'A new verification email has been sent.',
      DE: 'Eine neue Bestätigungs-E-Mail wurde gesendet.',
    },
    resend_verification_failed: {
      EN: 'Failed to resend verification email. Please try again later.',
      DE: 'Fehler beim erneuten Senden der Bestätigungs-E-Mail. Bitte versuchen Sie es später erneut.',
    },
  },

  api_reviews: {
    unauthorized: { EN: 'Unauthorized', DE: 'Nicht autorisiert' },
    review_created: { EN: 'Review created', DE: 'Bewertung erstellt' },
  },

  api_reviews_token: {
    unauthorized: { EN: 'Unauthorized', DE: 'Nicht autorisiert' },
    invalid_id: { EN: 'Invalid ID', DE: 'Ungültige ID' },
    not_found: { EN: 'Not found', DE: 'Nicht gefunden' },
    review_created: { EN: 'Review created', DE: 'Bewertung erstellt' },
    review_deleted: { EN: 'Review deleted', DE: 'Bewertung gelöscht' },
    review_not_found: { EN: 'Review not found', DE: 'Bewertung nicht gefunden' },
    review_updated: { EN: 'Review updated', DE: 'Bewertung aktualisiert' },
    server_error: { EN: 'Server error', DE: 'Serverfehler' },
  },

  auth_forgot_password: {
    title: { EN: 'Forgot Password', DE: 'Passwort vergessen' },
  },

  auth_login: {
    title: { EN: 'Login', DE: 'Einloggen' },
    error_empty_fields: {
      EN: 'Please enter both email and password.',
      DE: 'Bitte geben Sie sowohl die E-Mail als auch das Passwort ein.',
    },
    error_demo_login: { EN: 'Error logging in as Demo User', DE: 'Fehler beim Einloggen als Demobenuzter' },
  },

  auth_register: {
    title: { EN: 'Register', DE: 'Registrieren' },
  },

  auth_reset_password_token: {
    title: { EN: 'Reset Password', DE: 'Passwort zurücksetzen' },
    message_reset_success: {
      EN: 'Your password has been successfully reset.',
      DE: 'Ihr Passwort wurde erfolgreich zurückgesetzt.',
    },
    error_unexpected: {
      EN: 'An unexpected error occurred. Please try again later.',
      DE: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.',
    },
    error_unknown: { EN: 'An unknown error occurred.', DE: 'Ein unbekannter Fehler ist aufgetreten.' },
  },

  auth_verify_email_token: {
    title: { EN: 'Email Verification', DE: 'E-Mail-Bestätigung' },
    button_confirm_email: { EN: 'Confirm My Email', DE: 'Meine E-Mail bestätigen' },
    button_resend_verification: { EN: 'Resend Verification Email', DE: 'Bestätigungs-E-Mail erneut senden' },
    paragraph_instruction: {
      EN: 'You need to confirm your email address to complete the registration process.',
      DE: 'Sie müssen Ihre E-Mail-Adresse bestätigen, um den Registrierungsprozess abzuschließen.',
    },
    paragraph_verification_link_expired: {
      EN: 'The verification link has expired. Please request a new one.',
      DE: 'Der Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an.',
    },
    message_verifying_email: {
      EN: 'Your email is currently being verified. Please wait...',
      DE: 'Ihre E-Mail wird derzeit überprüft. Bitte warten...',
    },
    message_preparing_to_send: {
      EN: 'Preparing to send your verification email...',
      DE: 'Bereite den Versand Ihrer Bestätigungs-E-Mail vor...',
    },
    message_verification_email_sent: {
      EN: 'A new verification email has been sent. Please check your email inbox in a few minutes to confirm your account.',
      DE: 'Eine neue Bestätigungs-E-Mail wurde gesendet. Bitte überprüfen Sie in ein paar Minuten Ihren E-Mail-Posteingang, um Ihr Konto zu bestätigen.',
    },
    error_unexpected: {
      EN: 'An unexpected error occurred. Please try again later.',
      DE: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.',
    },
    error_unknown: { EN: 'An unknown error occurred.', DE: 'Ein unbekannter Fehler ist aufgetreten.' },
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
    title: { EN: '#GMNDR Auth Demo', DE: '#GMNDR Auth Demo' },
    // button_send_email: { EN: 'Send Test Email', DE: 'Test-E-Mail senden' },
    // button_sending: { EN: 'Sending...', DE: 'Senden...' },
    // email_failure: { EN: 'Failed to send test email.', DE: 'Senden der Test-E-Mail fehlgeschlagen.' },
    // email_success: { EN: 'Test email sent successfully!', DE: 'Test-E-Mail erfolgreich gesendet!' },
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

  loading_animation: {
    loading_text: { EN: 'Loading...', DE: 'Lädt...' },
  },

  login_form: {
    demo_error: { EN: 'Error logging in as Demo User', DE: 'Fehler beim Einloggen als Demo User' },
    demo_logging_in: { EN: 'Logging in as Demo User...', DE: 'Einloggen als Demo User...' },
    demo_user: { EN: 'Demo User', DE: 'Demo User' },
    divider: { EN: 'or', DE: 'oder' },
    email_label: { EN: 'Email:', DE: 'E-Mail:' },
    forgot_password: { EN: 'Forgot Password', DE: 'Passwort vergessen' },
    hide_password: { EN: 'Hide password', DE: 'Passwort verstecken' },
    logging_in: { EN: 'Logging in...', DE: 'Anmelden...' },
    login: { EN: 'Login', DE: 'Anmelden' },
    login_error: {
      EN: 'Login failed. Please check your credentials.',
      DE: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.',
    },
    password_label: { EN: 'Password:', DE: 'Passwort:' },
    register: { EN: 'Register', DE: 'Registrieren' },
    show_password: { EN: 'Show password', DE: 'Passwort anzeigen' },
  },

  navigation: {
    forgot_password: { EN: 'Forgot Password', DE: 'Passwort vergessen' },
    home: { EN: 'Home', DE: 'Home' },
    info: { EN: 'Info', DE: 'Info' },
    logout: { EN: 'Logout', DE: 'Logout' },
    login: { EN: 'Login', DE: 'Login' },
    register: { EN: 'Register', DE: 'Registrieren' },
    reviews: { EN: 'Reviews', DE: 'Bewertungen' },
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
    label_chars: { EN: 'characters', DE: 'Zeichen' },
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
    welcome: {
      EN: 'Welcome! You are logged in as: ',
      DE: 'Willkommen! Sie sind angemeldet als: ',
    },
    sessionExpires: {
      EN: 'Your login expires in ',
      DE: 'Ihre Anmeldung läuft ab in ',
    },
    renewSession: {
      EN: 'Renew Session',
      DE: 'Sitzung erneuern',
    },
    sessionExpiringSoon: {
      EN: 'Session Expiring Soon',
      DE: 'Sitzung läuft bald ab',
    },
    loginPrompt_intro: {
      EN: 'Just ',
      DE: 'Einfach ',
    },
    loginPrompt_logIn: {
      EN: 'log in',
      DE: 'einloggen',
    },
    loginPrompt_separator: {
      EN: ' (Demo User available) or ',
      DE: ' (Demo User verfügbar) oder ',
    },
    loginPrompt_signUp: {
      EN: 'sign up',
      DE: 'registrieren',
    },
    loginPrompt_outro: {
      EN: ' to access the Reviews section.',
      DE: ', um auf den Bewertungsbereich zuzugreifen.',
    },
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
    switch_language: { EN: 'Sprache > DE', DE: 'Language > EN' },
    title: { EN: 'Test Page | Improving User Experience', DE: 'Testseite | Verbesserung der Benutzererfahrung' },
  },

  test_email: {
    failure_message: { EN: 'Failed to send test email.', DE: 'Senden der Test-E-Mail fehlgeschlagen.' },
    success_message: { EN: 'Test email sent successfully!', DE: 'Test-E-Mail erfolgreich gesendet!' },
    subject: { EN: 'Test Email from #GMNDR Auth Demo', DE: 'Test-E-Mail von #GMNDR Auth Demo' },
    text: {
      EN: 'This is a test email to verify the sending functionality.',
      DE: 'Dies ist eine Test-E-Mail, um die Versandfunktionalität zu überprüfen.',
    },
  },

  theme_toggle_button: {
    'aria-label': {
      de: 'Farbschema umschalten',
      en: 'Toggle color theme',
    },
  },

  utils_email_template: {
    greeting_morning: {
      EN: 'Good morning',
      DE: 'Guten Morgen',
    },
    greeting_afternoon: {
      EN: 'Good afternoon',
      DE: 'Guten Nachmittag',
    },
    greeting_evening: {
      EN: 'Good evening',
      DE: 'Guten Abend',
    },
    closing_remark: {
      EN: 'Best regards',
      DE: 'Mit freundlichen Grüßen',
    },
    disregard_message: {
      EN: 'If you did not request this, please disregard this email.',
      DE: 'Wenn Sie dies nicht angefordert haben, ignorieren Sie bitte diese E-Mail.',
    },
    expiry_link: {
      EN: 'This link will expire on',
      DE: 'Dieser Link läuft ab am',
    },
    email_subject_password_reset: {
      EN: 'Password Reset | #GMNDR Auth Demo',
      DE: 'Passwort zurücksetzen | #GMNDR Auth Demo',
    },
    email_subject_registration: {
      EN: 'Email Confirmation | #GMNDR Auth Demo',
      DE: 'E-Mail-Bestätigung | #GMNDR Auth Demo',
    },
    email_subject_resend_verification: {
      EN: 'Email Confirmation (New Request) | #GMNDR Auth Demo',
      DE: 'E-Mail-Bestätigung (Neue Anfrage) | #GMNDR Auth Demo',
    },
    email_registration_thank_you: {
      EN: 'Thank you for registering! Please confirm your email to activate your account.',
      DE: 'Danke für Ihre Registrierung! Bitte bestätigen Sie Ihre E-Mail, um Ihr Konto zu aktivieren.',
    },
    email_resend_verification_message: {
      EN: 'We have received your request to resend the verification email.',
      DE: 'Wir haben Ihre Anfrage zum erneuten Senden der Bestätigungs-E-Mail erhalten.',
    },
    email_password_reset_message: {
      EN: 'We received a request to reset your password.',
      DE: 'Wir haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten.',
    },
  },

  validate_password: {
    min_length: {
      EN: 'At least 8 characters long',
      DE: 'Mindestens 8 Zeichen lang',
    },
    uppercase: {
      EN: 'At least one uppercase letter (A-Z)',
      DE: 'Mindestens ein Großbuchstabe (A-Z)',
    },
    lowercase: {
      EN: 'At least one lowercase letter (a-z)',
      DE: 'Mindestens ein Kleinbuchstabe (a-z)',
    },
    digit: {
      EN: 'At least one digit (0-9)',
      DE: 'Mindestens eine Ziffer (0-9)',
    },
    error_mismatch: { EN: 'Passwords match', DE: 'Passwörter stimmen überein' },
    label_password: { EN: 'Password', DE: 'Passwort' },
    label_repeat_password: { EN: 'Repeat Password', DE: 'Passwort wiederholen' },
    special_character: {
      EN: 'At least one special character (no spaces)',
      DE: 'Mindestens ein Sonderzeichen (keine Leerzeichen)',
    },
    toggle_hide: { EN: 'Hide password', DE: 'Passwort verstecken' },
    toggle_show: { EN: 'Show password', DE: 'Passwort anzeigen' },
  },
};

export function getText(pageRef, key, language) {
  const textItem = languageLibrary[pageRef]?.[key];
  return textItem ? (language === 'DE' ? textItem.DE : textItem.EN) : '';
}

export default languageLibrary;
