// /app/utils/maskEmail.js

// actually not in use

export function maskEmail(email) {
  if (!email) return 'Email not available';

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return 'Email not available';

  const [domainName, ...tldParts] = domain.split('.');
  if (!domainName || tldParts.length === 0) return 'Email not available';

  const tld = tldParts.join('.');

  // Mask the local part: first two characters visible, rest masked
  const maskedLocalPart = localPart.length > 2 ? localPart.slice(0, 2) + '*'.repeat(localPart.length - 2) : localPart;

  // Mask the domain name: first character visible, rest masked
  const maskedDomainName = domainName.length > 1 ? domainName[0] + '*'.repeat(domainName.length - 1) : domainName;

  return `${maskedLocalPart}@${maskedDomainName}.${tld}`;
}
