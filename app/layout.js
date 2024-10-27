// /app/layout.js

import '@/app/globals.css';
import Navigation from '@/app/components/Layout/Navigation';
import AuthProvider from '@/app/components/Authentication/AuthProvider';
import Footer from '@/app/components/Layout/Footer';
import ThemeProvider from '@/app/components/Common/ThemeProvider';
import PageUpButton from '@/app/components/Button/PageUpButton';
import MainContainer from '@/app/components/Layout/MainContainer';

export const metadata = {
  title: '#GMNDR Authentication Demo',
  description: 'A demo application using Next.js and MongoDB',
};

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Navigation />
            <MainContainer>{children}</MainContainer>
            <PageUpButton />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
