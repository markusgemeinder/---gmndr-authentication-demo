import './globals.css';
import Navigation from './components/Common/Navigation';
import AuthProvider from './components/Authentication/AuthProvider';
import Footer from './components/Common/Footer'; // Importiere die Footer-Komponente

export const metadata = {
  title: '#GMNDR Authentication Demo',
  description: 'A demo application using Next.js and MongoDB',
};

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <body className='relative min-h-screen m-10'>
        <AuthProvider>
          <Navigation />
          <main className='pt-16 pb-16'>
            {/* Padding oben für Navigation und unten für Footer */}
            {children}
          </main>
          <Footer /> {/* Füge den Footer hier hinzu */}
        </AuthProvider>
      </body>
    </html>
  );
}
