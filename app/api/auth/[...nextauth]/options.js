// /app/api/auth/[...nextauth]/options.js

import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/db/models/User';
import bcrypt from 'bcrypt';
import dbConnect from '@/db/connect';
import { getText } from '@/lib/languageLibrary';

// Die options Funktion, die die Sprache als Parameter erwartet
export const options = (language) => ({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: getText('api_auth_nextauth_options', 'name', language),
      credentials: {
        email: { label: getText('api_auth_nextauth_options', 'email_label', language), type: 'text' },
        password: { label: getText('api_auth_nextauth_options', 'password_label', language), type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        try {
          if (credentials.email === 'no-reply-demo-user@example.com' && credentials.password === 'DemoUser0815!') {
            return { id: '6713c624bc52c45e30f37969', email: credentials.email, role: 'Demo User', isDemoUser: true };
          }

          const existingUser = await User.findOne({ email: credentials.email }).lean().exec();

          if (!existingUser) {
            throw new Error(getText('api_auth_nextauth_options', 'error_no_account', language));
          }

          if (existingUser.role === 'Credentials User') {
            if (!existingUser.isEmailConfirmed) {
              if (existingUser.confirmationTokenExpiry && new Date() < existingUser.confirmationTokenExpiry) {
                throw new Error(getText('api_auth_nextauth_options', 'error_email_not_confirmed', language));
              }
              if (!existingUser.confirmationTokenExpiry || new Date() > existingUser.confirmationTokenExpiry) {
                throw new Error(getText('api_auth_nextauth_options', 'error_confirmation_link_expired', language));
              }
            }
          }

          if (existingUser.role === 'GitHub User' || existingUser.role === 'GitHub User (Admin)') {
            throw new Error(getText('api_auth_nextauth_options', 'error_github_registered', language));
          }

          if (existingUser.role === 'Google User' || existingUser.role === 'Google User (Admin)') {
            throw new Error(getText('api_auth_nextauth_options', 'error_google_registered', language));
          }

          const match = await bcrypt.compare(credentials.password, existingUser.password);
          if (!match) {
            throw new Error(getText('api_auth_nextauth_options', 'error_incorrect_password', language));
          }

          if (existingUser.resetToken || existingUser.resetTokenExpiry) {
            await User.updateOne({ email: existingUser.email }, { $set: { resetToken: null, resetTokenExpiry: null } });
          }

          return {
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role || 'Credentials User',
            isDemoUser: false,
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
            console.log(getText('api_auth_nextauth_options', 'log_new_user_created', language), user.email);
          } else {
            await User.updateOne({ email: user.email }, { $set: { updatedAt: new Date() } });
            console.log(getText('api_auth_nextauth_options', 'log_existing_user_updated', language), user.email);
          }

          return true;
        }
      } catch (err) {
        console.error(getText('api_auth_nextauth_options', 'error_signin_callback', language), err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isDemoUser = user.isDemoUser;
        token.createdAt = Date.now();
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.isDemoUser = token.isDemoUser;
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 60,
    updateAge: 60 * 5,
  },
});
