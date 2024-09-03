// /app/layout.js

import './globals.css';
import Navigation from './components/Common/Navigation';
import AuthProvider from './components/Authentication/AuthProvider';
import Footer from './components/Common/Footer';

export const metadata = {
  title: '#GMNDR Authentication Demo',
  description: 'A demo application using Next.js and MongoDB',
};

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
