import type { Metadata } from 'next';

import { StoreProvider } from '@stores/StoreProvider';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Lalasia',
  description: 'E-commerce app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
