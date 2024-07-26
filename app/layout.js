import './globals.css';
import Navigation from './components/Navigation';
import AuthProvider from './components/AuthProvider';
import Footer from './components/Footer'; // Importiere die Footer-Komponente

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
