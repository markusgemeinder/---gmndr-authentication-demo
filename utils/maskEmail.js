// /app/utils/maskEmail.js

export function maskEmail(email) {
  if (!email) return 'Email not available';

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return 'Email not available';

  const [domainName, ...tldParts] = domain.split('.');
  if (!domainName || tldParts.length === 0) return 'Email not available';

  const tld = tldParts.join('.');

  // Mask the domain name with a fixed format
  const maskedDomainName =
    domainName.length > 2 ? domainName[0] + `[...]` + domainName[domainName.length - 1] : domainName;

  return `${localPart}@${maskedDomainName}.${tld}`;
}
