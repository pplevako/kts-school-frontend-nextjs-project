import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import routes from '@/config/routes';
import { loginUser } from '@/shared/api/auth';

export const config = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.identifier || !credentials.password) {
          return null;
        }

        try {
          const data = await loginUser({
            identifier: String(credentials.identifier),
            password: String(credentials.password),
          });

          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.username,
            strapiToken: data.jwt,
          };
        } catch {
          // loginUser throws ApiRequestError on non-ok response
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Type assertion needed because NextAuth types user as User | AdapterUser
      // We use Credentials provider, so it's always our custom User with strapiToken
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.strapiToken = (user as { strapiToken: string }).strapiToken;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      // Type assertion needed due to NextAuth v5 beta type limitations
      // auth.d.ts augmentation doesn't fully work in callback context
      (session as unknown as { strapiToken: string }).strapiToken = token.strapiToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: routes.login.create(),
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
