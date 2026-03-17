'use client';

import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import Button from '@/components/Button';
import Text from '@/components/Text';
import routes from '@/config/routes';

import styles from './ProfileView.module.scss';

export default function ProfileView() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(routes.home.create());
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Text tag="h1" className={styles.title}>
          Profile
        </Text>
        <div className={styles.profile}>
          <div className={styles.info}>
            <Text className={styles.label}>Username:</Text>
            <Text>{user.name}</Text>
          </div>
          <div className={styles.info}>
            <Text className={styles.label}>Email:</Text>
            <Text>{user.email}</Text>
          </div>
          <Button onClick={handleLogout} className={styles.button}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
