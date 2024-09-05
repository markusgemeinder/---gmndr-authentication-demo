// /app/layout.js

import '@/app/globals.css';
import Navigation from '@/app/components/Common/Navigation';
import AuthProvider from '@/app/components/Authentication/AuthProvider';
import Footer from '@/app/components/Common/Footer';
import ThemeProvider from '@/app/components/Common/ThemeProvider';

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
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
