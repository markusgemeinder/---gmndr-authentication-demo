// /utils/emailTemplate.js

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Good morning';
  if (currentHour < 18) return 'Good afternoon';
  return 'Good evening';
};

const getBaseUrl = () =>
  process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app/' : 'http://localhost:3000';

const formatExpiryTime = (expiry) =>
  new Date(expiry).toLocaleString('en-US', {
    timeZone: 'Europe/Berlin',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: true,
  });

export const getRegistrationEmailText = (token) => {
  const confirmationUrl = `${getBaseUrl()}/verify-email/${token}`;
  const expiryTime = Date.now() + 86400000; // 24 Stunden
  return `${getGreeting()} Markus,\n\nThank you for signing up with #GMNDR Authentication Demo!\nTo complete your registration, please click the link below:\n\n${confirmationUrl}\n\nThis link will expire on ${formatExpiryTime(
    expiryTime
  )}.\n\nIf you didn't initiate this request, feel free to disregard this message.\n\nBest wishes,\nMarkus from #GMNDR Authentication Demo`;
};

export const getResendVerificationEmailText = (token) => {
  const confirmationUrl = `${getBaseUrl()}/verify-email/${token}`;
  const expiryTime = Date.now() + 86400000; // 24 Stunden
  return `${getGreeting()} Markus,\n\nWe have received your request to send the confirmation email again. To verify your email address, please use the link below:\n\n${confirmationUrl}\n\nThis link will expire on ${formatExpiryTime(
    expiryTime
  )}.\n\nIf you did not request this, you can safely ignore this email.\n\nBest wishes,\nYour Service Team`;
};
