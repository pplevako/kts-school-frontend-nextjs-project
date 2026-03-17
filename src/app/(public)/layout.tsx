import { auth } from '@/auth';
import Header from '@/components/Header';
import AuthProvider from '@/providers/AuthProvider';
import { StoreProvider } from '@/providers/StoreProvider';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let user = null;
  if (session?.user?.id) {
    user = {
      id: session.user.id,
      email: session.user.email || '',
      username: session.user.name || '',
    };
  }
  const initialAuth = { user };

  return (
    <AuthProvider>
      <StoreProvider initialAuth={initialAuth}>
        <Header />
        <main>{children}</main>
      </StoreProvider>
    </AuthProvider>
  );
}
