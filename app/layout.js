import './globals.css';

export const metadata = {
  title: 'Authentication Demo',
  description: 'A simple authentication demo with reviews.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-gray-100 text-gray-900'>{children}</body>
    </html>
  );
}
