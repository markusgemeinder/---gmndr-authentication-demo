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
    account_not_found: {
      EN: 'No account found with this email address.',
      DE: 'Kein Konto mit dieser E-Mail-Adresse gefunden.',
    },
    linked_to_social_login: {
      EN: 'This email is linked to a Google or GitHub login. Password reset cannot be done here.',
      DE: 'Diese E-Mail ist mit einem Google- oder GitHub-Login verknüpft. Ein Zurücksetzen des Passworts ist hier nicht möglich.',
    },
    email_not_confirmed: {
      EN: 'Your email address is not confirmed yet. Please confirm before resetting your password.',
      DE: 'Ihre E-Mail-Adresse ist noch nicht bestätigt. Bitte bestätigen Sie, bevor Sie Ihr Passwort zurücksetzen.',
    },
    reset_link_sent: {
      EN: 'A password reset link has been sent to your email.',
      DE: 'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.',
    },
    server_error: {
      EN: 'Something went wrong. Please try again later.',
      DE: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.',
    },
  },

  api_auth_nextauth_options: {
    email_label: { EN: 'Email', DE: 'E-Mail' },
    error_confirmation_link_expired: {
      EN: 'Your confirmation link has expired. Please request a new confirmation email.',
      DE: 'Ihr Bestätigungslink ist abgelaufen. Bitte fordern Sie eine neue Bestätigungs-E-Mail an.',
    },
    error_email_not_confirmed: {
      EN: 'Your email address is not confirmed yet. Please check your inbox.',
      DE: 'Ihre E-Mail-Adresse ist noch nicht bestätigt. Bitte überprüfen Sie Ihren Posteingang.',
    },
    error_github_registered: {
      EN: 'Email is already registered with GitHub. Please log in that way.',
      DE: 'E-Mail ist bereits bei GitHub registriert. Bitte melden Sie sich auf diese Weise an.',
    },
    error_google_registered: {
      EN: 'Email is already registered with Google. Please log in that way.',
      DE: 'E-Mail ist bereits bei Google registriert. Bitte melden Sie sich auf diese Weise an.',
    },
    error_incorrect_password: {
      EN: 'Incorrect password. Please try again.',
      DE: 'Falsches Passwort. Bitte versuchen Sie es erneut.',
    },
    error_no_account: {
      EN: 'No account with this email address exists. Please register.',
      DE: 'Kein Konto mit dieser E-Mail-Adresse vorhanden. Bitte registrieren Sie sich.',
    },
    log_existing_user_updated: {
      EN: 'Existing user updated for email:',
      DE: 'Vorhandener Benutzer für die E-Mail aktualisiert:',
    },
    log_new_user_created: { EN: 'New user created for email:', DE: 'Neuer Benutzer für die E-Mail erstellt:' },
    name: { EN: 'Credentials', DE: 'Anmeldeinformationen' },
    password_label: { EN: 'Password', DE: 'Passwort' },
  },

  api_auth_register: {
    email_and_password_required: {
      EN: 'Both email and password are required.',
      DE: 'Sowohl E-Mail als auch Passwort sind erforderlich.',
    },
    email_registered_google: {
      EN: 'This email is already registered with Google. Please log in using Google.',
      DE: 'Diese E-Mail ist bereits bei Google registriert. Bitte melden Sie sich mit Google an.',
    },
    email_registered_github: {
      EN: 'This email is already registered with GitHub. Please log in using GitHub.',
      DE: 'Diese E-Mail ist bereits bei GitHub registriert. Bitte melden Sie sich mit GitHub an.',
    },
    email_not_confirmed: {
      EN: 'Your email address is already registered, but not confirmed yet. Please confirm and log in.',
      DE: 'Ihre E-Mail-Adresse ist bereits registriert, aber noch nicht bestätigt. Bitte bestätigen Sie und melden Sie sich an.',
    },
    email_in_use: {
      EN: 'Email is already in use. Please try logging in or reset your password.',
      DE: 'E-Mail wird bereits verwendet. Bitte versuchen Sie, sich anzumelden oder Ihr Passwort zurückzusetzen.',
    },
    registration_successful: {
      EN: 'Registration successful! Please check your email inbox in a few minutes to confirm your account.',
      DE: 'Registrierung erfolgreich! Bitte überprüfen Sie in wenigen Minuten Ihr E-Mail-Postfach, um Ihr Konto zu bestätigen.',
    },
    registration_failed: {
      EN: 'Registration failed. Please try again later.',
      DE: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut.',
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
    email_required: { EN: 'Email is required.', DE: 'E-Mail ist erforderlich.' },
    email_already_confirmed: { EN: 'Your email is already confirmed.', DE: 'Ihre E-Mail ist bereits bestätigt.' },
    no_account_found: {
      EN: 'No account found with that email.',
      DE: 'Es wurde kein Konto mit dieser E-Mail gefunden.',
    },
    verification_email_sent: {
      EN: 'A new verification email has been sent.',
      DE: 'Eine neue Bestätigungs-E-Mail wurde gesendet.',
    },
    verification_email_failed: {
      EN: 'Failed to resend verification email. Please try again later.',
      DE: 'Fehler beim erneuten Senden der Bestätigungs-E-Mail. Bitte versuchen Sie es später erneut.',
    },
    email_confirmation_subject: {
      EN: 'Email Confirmation (New Request) | #GMNDR Authentication Demo',
      DE: 'E-Mail-Bestätigung (Neue Anfrage) | #GMNDR Authentifizierungsdemo',
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

  test_email: {
    failure_message: { EN: 'Failed to send test email.', DE: 'Senden der Test-E-Mail fehlgeschlagen.' },
    success_message: { EN: 'Test email sent successfully!', DE: 'Test-E-Mail erfolgreich gesendet!' },
    subject: { EN: 'Test Email from #GMNDR Authentication Demo', DE: 'Test-E-Mail von #GMNDR Authentifizierungsdemo' },
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
