// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies'; // Importiere die Funktion, um die Sprache aus den Cookies zu erhalten

const handler = async (req, res) => {
  const language = getLanguageFromCookies(req); // Sprache aus Cookies abrufen
  req.language = language; // Füge die Sprache dem Request-Objekt hinzu

  // Modifiziere die Optionen, um die Sprache für den CredentialsProvider zu berücksichtigen
  const credentialsProvider = options.providers.find((provider) => provider.id === 'credentials');
  if (credentialsProvider) {
    credentialsProvider.authorize = async (credentials) => {
      return await credentialsProvider.authorize(credentials, language);
    };
  }

  return NextAuth(req, res, options);
};

export { handler as GET, handler as POST };
