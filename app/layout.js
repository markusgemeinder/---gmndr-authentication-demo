// /app/layout.js

import '@/app/globals.css';

import { Ubuntu } from 'next/font/google';
import Navigation from '@/app/components/Layout/Navigation';
import Footer from '@/app/components/Layout/Footer';
import ThemeProvider from '@/app/components/Common/ThemeProvider';
import NavigationButtonPageUp from '@/app/components/Button/NavigationButtonPageUp';
import MainContainer from '@/app/components/Layout/MainContainer';
import { LanguageProvider } from '@/app/components/LanguageProvider';

export const metadata = {
  title: '#GMNDR Color Palette Generator',
  description: 'Created with Next.js 14 | Erstellt mit Next.js 14',
  icons: {
    icon: '/favicon/gmndr.ico',
  },
};

export const defaultFont = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal'],
});

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <body className={defaultFont.className}>
        <ThemeProvider>
          <LanguageProvider>
            <Navigation />
            <MainContainer>{children}</MainContainer>
            <NavigationButtonPageUp />
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
