import Navigation from './(components)/Navigation';
import './globals.css';

export const metadata = {
  title: '#GMNDR Authentication Demo',
  description: 'A demo application using Next.js and MongoDB',
};

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Navigation />
        <main className='pt-16'>
          {' '}
          {/* Padding to avoid content being hidden under the fixed header */}
          {children}
        </main>
      </body>
    </html>
  );
}
