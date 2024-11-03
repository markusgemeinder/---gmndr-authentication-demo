// /app/layout.js

import '@/app/globals.css';

import { Ubuntu } from 'next/font/google';
import Navigation from '@/app/components/Layout/Navigation';
import AuthProvider from '@/app/components/Authentication/AuthProvider';
import Footer from '@/app/components/Layout/Footer';
import ThemeProvider from '@/app/components/Common/ThemeProvider';
import NavigationButtonPageUp from '@/app/components/Button/NavigationButtonPageUp';
import MainContainer from '@/app/components/Layout/MainContainer';
import { LanguageProvider } from '@/app/components/LanguageProvider';

export const metadata = {
  title: '#GMNDR Auth Demo',
  description: 'Created with Next.js 14 and MongoDB | Erstellt mit Next.js 14 und MongoDB',
};

export const defaultFont = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal'],
});

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <body className={defaultFont.className}>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <Navigation />
              <MainContainer>{children}</MainContainer>
              <NavigationButtonPageUp />
              <Footer />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
