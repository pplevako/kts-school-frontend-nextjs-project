import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import Text from '@/components/Text';
import routes from '@/config/routes';

import ProfileView from './_components/ProfileView';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Profile - Lalasia',
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect(routes.login.create());
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Text tag="h1" className={styles.title}>
          Profile
        </Text>
        <ProfileView />
      </div>
    </div>
  );
}
