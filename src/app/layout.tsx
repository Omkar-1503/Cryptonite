import React from 'react';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import '@/app/globals.css';

export const metadata = {
  title: 'Cryptonite',
  description: 'Explore the world of cryptocurrencies.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
