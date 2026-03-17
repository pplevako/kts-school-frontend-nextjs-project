import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from '@/auth';
import routes from '@/config/routes';

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Protect /profile route
  if (pathname.startsWith(routes.profile.create())) {
    if (!session) {
      const loginUrl = new URL(routes.login.create(), request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users from /login and /register to /profile
  if (pathname.startsWith(routes.login.create()) || pathname.startsWith(routes.register.create())) {
    if (session) {
      const profileUrl = new URL(routes.profile.create(), request.url);
      return NextResponse.redirect(profileUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/register'],
};
