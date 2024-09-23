import React from 'react';
import Navbar from '../_components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
        <Navbar/>
        {children}
    </main>
  );
}