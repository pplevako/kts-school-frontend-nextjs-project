import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    strapiToken: string;
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User {
    strapiToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    strapiToken: string;
  }
}
