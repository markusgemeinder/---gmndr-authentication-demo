// /app/api/auth|[...nextauth]/options.js

import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/db/models/User';
import bcrypt from 'bcrypt';
import dbConnect from '@/db/connect';

export const options = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        try {
          const existingUser = await User.findOne({ email: credentials.email }).lean().exec();

          if (!existingUser) {
            throw new Error('No account with this email address exists. Please register.');
          }

          // 1. Überprüfen, ob der Benutzer über Credentials eingeloggt ist
          if (existingUser.role === 'Credentials User') {
            // E-Mail nicht bestätigt und Token gültig
            if (!existingUser.isEmailConfirmed) {
              if (existingUser.confirmationTokenExpiry && new Date() < existingUser.confirmationTokenExpiry) {
                throw new Error('Your email address isn’t confirmed yet. Please check your inbox (and spam).');
              }
              // E-Mail nicht bestätigt und Token abgelaufen
              if (!existingUser.confirmationTokenExpiry || new Date() > existingUser.confirmationTokenExpiry) {
                throw new Error('Your confirmation link has expired. Please request a new confirmation email.');
              }
            }
          }

          // 2. Benutzer existiert bereits über einen anderen Provider (GitHub/Google)
          if (existingUser.role === 'GitHub User' || existingUser.role === 'GitHub User (Admin)') {
            throw new Error('Email is already registered with GitHub. Please log in that way.');
          }

          if (existingUser.role === 'Google User' || existingUser.role === 'Google User (Admin)') {
            throw new Error('Email is already registered with Google. Please log in that way.');
          }

          // 3. Passwort überprüfen
          const match = await bcrypt.compare(credentials.password, existingUser.password);
          if (!match) {
            throw new Error('Incorrect password. Please try again.');
          }

          // Wenn das Passwort erfolgreich ist, resetToken und resetTokenExpiry auf null setzen
          if (existingUser.resetToken || existingUser.resetTokenExpiry) {
            await User.updateOne({ email: existingUser.email }, { $set: { resetToken: null, resetTokenExpiry: null } });
          }

          // Login erfolgreich
          return {
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role || 'Credentials User',
          };
        } catch (error) {
          throw error;
        }
      },
    }),
    GitHubProvider({
      profile(profile) {
        let userRole = 'GitHub User';
        if (profile?.email === 'info@gemeinder-coaching.de') {
          userRole = 'GitHub User (Admin)';
        }
        return { ...profile, id: profile.id, role: userRole };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = 'Google User';
        if (profile?.email === '190774@gmx.de') {
          userRole = 'Google User (Admin)';
        }
        return { ...profile, id: profile.sub, role: userRole };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();
      try {
        if (account.provider === 'credentials') {
          await User.updateOne({ email: user.email }, { $set: { updatedAt: new Date() } });
          return true;
        }

        if (account.provider === 'github' || account.provider === 'google') {
          const existingUser = await User.findOne({ email: user.email }).lean().exec();

          if (!existingUser) {
            const userRole =
              account.provider === 'github'
                ? user.role === 'GitHub User (Admin)'
                  ? 'GitHub User (Admin)'
                  : 'GitHub User'
                : user.role === 'Google User (Admin)'
                ? 'Google User (Admin)'
                : 'Google User';

            const newUser = new User({ email: user.email, role: userRole });
            await newUser.save();
            console.log('New user created for email:', user.email);
          } else {
            await User.updateOne({ email: user.email }, { $set: { updatedAt: new Date() } });
            console.log('Existing user updated for email:', user.email);
          }

          return true;
        }
      } catch (err) {
        console.error('Error during signIn callback:', err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.createdAt = Date.now();
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 60, // 1 hour
    updateAge: 60 * 5, // every 5 minutes
  },
};
