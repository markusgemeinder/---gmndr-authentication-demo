import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'; // Importiere CredentialsProvider
import User from '@/db/models/User';
import bcrypt from 'bcrypt';

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log('Profile GitHub: ', profile);
        let userRole = 'GitHub User';
        if (profile?.email === 'info@gemeinder-coaching.de') {
          userRole = 'admin';
        }
        return { ...profile, role: userRole };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log('Profile Google: ', profile);
        let userRole = 'Google User';
        return { ...profile, id: profile.sub, role: userRole };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Your Email', type: 'text', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '******' },
      },
      async authorize(credentials) {
        try {
          // Suche nach dem Benutzer in der Datenbank anhand der E-Mail
          const foundUser = await User.findOne({ email: credentials.email }).lean().exec();

          if (!foundUser) {
            console.log('No user found with this email.');
            return null; // Benutzer wurde nicht gefunden
          }

          // Passwort überprüfen
          const match = await bcrypt.compare(credentials.password, foundUser.password);
          if (match) {
            console.log('Password match');
            delete foundUser.password; // Passwort aus dem Benutzerobjekt entfernen
            // Füge weitere benutzerdefinierte Felder hinzu, falls nötig
            foundUser['role'] = 'Unverified Email'; // Beispiel für Role-Zuweisung
            return foundUser; // Benutzerobjekt zurückgeben
          } else {
            console.log('Password does not match');
            return null; // Passwort stimmt nicht überein
          }
        } catch (error) {
          console.log('Error during authorization:', error);
          return null; // Bei einem Fehler Rückgabe von null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.createdAt = Date.now(); // Behalte das Erstellungsdatum bei
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        // Füge hier weitere Session-Daten hinzu, falls nötig
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 60, // 1 Stunde
    updateAge: 60 * 5, // alle 5 Minuten
  },
};
