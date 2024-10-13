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
          if (!credentials.email || !credentials.password) {
            throw new Error('Email or Password is missing.');
          }

          const existingUser = await User.findOne({ email: credentials.email }).lean().exec();

          if (!existingUser) {
            console.log('No user found for email:', credentials.email);
            throw new Error('No account found with this email address.'); // Benutzer nicht gefunden
          }

          const match = await bcrypt.compare(credentials.password, existingUser.password);
          if (!match) {
            console.log('Password mismatch for email:', credentials.email);
            throw new Error('Password is incorrect.'); // Passwort falsch
          }

          const userPayload = {
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role || 'Credentials User',
          };

          return userPayload;
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authentication failed.');
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
          } else {
            await User.updateOne({ email: user.email }, { $set: { updatedAt: new Date() } });
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
    maxAge: 60 * 60,
    updateAge: 60 * 5,
  },
};
