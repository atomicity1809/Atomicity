import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}
export const experimental_ppr = true;

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
        {children}
    </main>
  );
}