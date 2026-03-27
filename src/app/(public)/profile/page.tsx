import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import routes from '@/config/routes';

import ProfileView from './_components/ProfileView';

export const metadata: Metadata = {
  title: 'Profile - Lalasia',
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect(routes.login.create());
  }

  return <ProfileView />;
}
