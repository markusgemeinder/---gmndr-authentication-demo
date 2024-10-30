// /utils/sendEmail.js

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail({ to, subject, text }) {
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

  try {
    const response = await sgMail.send(msg);
    console.log('Email sent successfully', response);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid error response:', error.response.body);
    }
  }
}
