// utils/sendEmail.js

import sgMail from '@sendgrid/mail';

// Setze den SendGrid API-Schlüssel
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Funktion zum Senden von E-Mails
export default async function sendEmail({ to, subject, text }) {
  // Erstelle die Nachricht mit den E-Mail-Details
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL,
    subject,
    text,
    trackingSettings: {
      clickTracking: { enable: false },
      openTracking: { enable: false },
      subscriptionTracking: { enable: false },
      unsubscribeTracking: { enable: false },
    },
  };

  // Debugging-Ausgaben: Zeige Betreff und Text der E-Mail in der Konsole an
  console.log('Sending email with subject:', subject); // Debugging
  console.log('Sending email to:', to); // Debugging
  console.log('Email text:', text); // Debugging

  try {
    // Sende die E-Mail
    const response = await sgMail.send(msg);
    console.log('Email sent successfully', response);
  } catch (error) {
    // Fehlerbehandlung
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid error response:', error.response.body);
    }
  }
}
