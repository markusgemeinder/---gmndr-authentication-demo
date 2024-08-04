// /app/utils/maskEmail.js

export function maskEmail(email) {
  if (!email) return 'Email not available';
  const match = email.match(/^(.{2}).+(@.+\..{2})$/);
  return match ? `${match[1]}****${match[2]}` : 'Email not available';
}
