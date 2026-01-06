import React from 'react';
import { Navbar } from './shared/Navbar';
import { Footer } from './shared/Footer';

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
}
