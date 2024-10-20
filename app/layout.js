// /app/layout.js

import '@/app/globals.css';
import Navigation from '@/app/components/Common/Navigation';
import AuthProvider from '@/app/components/Authentication/AuthProvider';
import Footer from '@/app/components/Common/Footer';
import ThemeProvider from '@/app/components/Common/ThemeProvider';
import PageUpButton from '@/app/components/Common/PageUpButton';
import MainContainer from '@/app/components/Common/MainContainer';

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
