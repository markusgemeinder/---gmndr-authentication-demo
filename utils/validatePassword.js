// /utils/validatePassword.js

export default function validatePassword(pwd) {
  if (pwd.length < 8) return 'Must be at least 8 characters long.';
  if (!/[A-Z]/.test(pwd)) return 'Must contain at least one uppercase letter.';
  if (!/[a-z]/.test(pwd)) return 'Must contain at least one lowercase letter.';
  if (!/[0-9]/.test(pwd)) return 'Must contain at least one number.';
  if (!/[!@#$%^&*]/.test(pwd)) return 'Must contain at least one special character.';
  return '';
}
