// utils/emailTemplate.js

import { getText } from '@/lib/languageLibrary';

const getGreeting = (language) => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return getText('utils_email_template', 'greeting_morning', language);
  if (currentHour < 18) return getText('utils_email_template', 'greeting_afternoon', language);
  return getText('utils_email_template', 'greeting_evening', language);
};

// Basis-URL basierend auf der Umgebung
const getBaseUrl = () =>
  process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app/' : 'http://localhost:3000';

// Funktion zum Formatieren der Ablaufzeit
const formatExpiryTime = (expiry) =>
  new Date(expiry).toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: true,
  });

// Zeilenumbruch
const lineBreak = '\n\n';

export const getRegistrationEmailText = (token, language) => {
  const confirmationUrl = `${getBaseUrl()}/verify-email/${token}`;
  const expiryTime = Date.now() + 86400000; // 24 Stunden

  // Alle Texte werden hier gesammelt
  const greeting = getGreeting(language);
  const emailSubject = getText('utils_email_template', 'email_subject_registration', language);
  const thankYouMessage = getText('utils_email_template', 'email_registration_thank_you', language);
  const expiryLinkMessage = getText('utils_email_template', 'expiry_link', language);
  const disregardMessage = getText('utils_email_template', 'disregard_message', language);
  const closingRemark = getText('utils_email_template', 'closing_remark', language);

  // Fertiger Text
  const emailText = `${greeting},${lineBreak}${thankYouMessage}${lineBreak}${confirmationUrl}${lineBreak}${expiryLinkMessage} ${formatExpiryTime(
    expiryTime
  )}.${lineBreak}${disregardMessage}${lineBreak}${closingRemark}`;

  return {
    subject: emailSubject,
    text: emailText,
  };
};

export const getResendVerificationEmailText = (token, language) => {
  const confirmationUrl = `${getBaseUrl()}/verify-email/${token}`;
  const expiryTime = Date.now() + 86400000; // 24 Stunden

  // Alle Texte werden hier gesammelt
  const greeting = getGreeting(language);
  const emailSubject = getText('utils_email_template', 'email_subject_resend_verification', language);
  const resendVerificationMessage = getText('utils_email_template', 'email_resend_verification_message', language);
  const expiryLinkMessage = getText('utils_email_template', 'expiry_link', language);
  const disregardMessage = getText('utils_email_template', 'disregard_message', language);
  const closingRemark = getText('utils_email_template', 'closing_remark', language);

  // Fertiger Text
  const emailText = `${greeting},${lineBreak}${resendVerificationMessage}${lineBreak}${confirmationUrl}${lineBreak}${expiryLinkMessage} ${formatExpiryTime(
    expiryTime
  )}.${lineBreak}${disregardMessage}${lineBreak}${closingRemark}`;

  return {
    subject: emailSubject,
    text: emailText,
  };
};

export const getPasswordResetEmailText = (token, language) => {
  const resetUrl = `${getBaseUrl()}/reset-password/${token}`;
  const expiryTime = Date.now() + 3600000; // 1 Stunde

  // Alle Texte werden hier gesammelt
  const greeting = getGreeting(language);
  const emailSubject = getText('utils_email_template', 'email_subject_password_reset', language);
  const resetMessage = getText('utils_email_template', 'email_password_reset_message', language);
  const expiryLinkMessage = getText('utils_email_template', 'expiry_link', language);
  const disregardMessage = getText('utils_email_template', 'disregard_message', language);
  const closingRemark = getText('utils_email_template', 'closing_remark', language);

  // Fertiger Text
  const emailText = `${greeting},${lineBreak}${resetMessage}${lineBreak}${resetUrl}${lineBreak}${expiryLinkMessage} ${formatExpiryTime(
    expiryTime
  )}.${lineBreak}${disregardMessage}${lineBreak}${closingRemark}`;

  return {
    subject: emailSubject,
    text: emailText,
  };
};
