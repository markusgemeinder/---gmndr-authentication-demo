// /app/api/auth/[...nextauth]/options.js

import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/db/models/User';
import bcrypt from 'bcryptjs';

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log('Profile GitHub: ', profile);
        let userRole = 'GitHub User';
        if (profile?.email === 'info@gemeinder-coaching.de') {
          userRole = 'admin';
        }
        return { ...profile, id: profile.id, role: userRole, username: profile.login }; // Benutzername von GitHub einfügen
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log('Profile Google: ', profile);
        let userRole = 'Google User';
        return { ...profile, id: profile.sub, role: userRole, username: profile.name }; // Benutzername von Google einfügen
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
          const foundUser = await User.findOne({ email: credentials.email }).lean().exec();

          if (!foundUser) {
            console.log('No user found with this email.');
            throw new Error('No user found with this email.');
          }

          const match = await bcrypt.compare(credentials.password, foundUser.password);
          if (!match) {
            console.log('Password does not match.');
            throw new Error('Password does not match.');
          }

          console.log('Password match');
          const userPayload = {
            id: foundUser._id,
            username: foundUser.username, // Benutzername
            email: foundUser.email,
            role: foundUser.role || 'Unverified User', // Rolle oder Standardwert
          };
          console.log('Returning user payload:', userPayload);
          return userPayload;
        } catch (error) {
          console.log('Error during authorization:', error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.username; // Benutzername zum Token hinzufügen
        token.createdAt = Date.now(); // Behalte das Erstellungsdatum bei
        console.log('JWT Callback - Token:', token); // Logge den JWT-Token
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Token:', token); // Token-Daten loggen
      console.log('Session Callback - Session before update:', session); // Session-Daten vor dem Update loggen
      if (session?.user) {
        session.user.role = token.role;
        session.user.username = token.name; // Benutzername zur Session hinzufügen
        console.log('Session Callback - Session after update:', session); // Logge die Session-Daten
      }
      return session;
    },
  },

  session: {
    maxAge: 60 * 60, // 1 Stunde
    updateAge: 60 * 5, // alle 5 Minuten
  },
};
