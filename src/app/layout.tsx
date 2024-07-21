"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/context/theme-context';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/app/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cryptonite</title>
        <meta name="description" content="Explore the world of cryptocurrencies." />
      </head>
      <body>
        <Provider store={store}> {}
          <ThemeProvider> {}
            <Navbar />
            <main className="container mx-auto">
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
