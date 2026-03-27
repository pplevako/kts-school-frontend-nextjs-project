import Header from '@/components/Header';
import { StoreProvider } from '@/providers/StoreProvider';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Header />
      <main>{children}</main>
    </StoreProvider>
  );
}
