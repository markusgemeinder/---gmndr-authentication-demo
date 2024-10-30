// /lib/languageLibrary.js
const languageLibrary = {
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
    switch_language: { EN: 'Switch Language > DE', DE: 'Sprache wechseln > EN' },
    title: { EN: 'Test Page | Improving User Experience', DE: 'Testseite | Verbesserung der Benutzererfahrung' },
  },
};

export function getText(pageRef, key, language) {
  const textItem = languageLibrary[pageRef]?.[key];
  return textItem ? (language === 'DE' ? textItem.DE : textItem.EN) : '';
}

export default languageLibrary;
