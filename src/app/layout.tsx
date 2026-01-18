import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Name Plotter CLI & Web',
  description: 'Plot letter frequencies of human names from the browser or terminal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
