import Header from '@/components/Header';
import AuthProvider from '@/providers/AuthProvider';
import { StoreProvider } from '@/providers/StoreProvider';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <StoreProvider>
        <Header />
        <main>{children}</main>
      </StoreProvider>
    </AuthProvider>
  );
}
