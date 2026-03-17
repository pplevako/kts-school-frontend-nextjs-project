'use client';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import Button from '@/components/Button';
import Text from '@/components/Text';
import routes from '@/config/routes';
import { useStore } from '@/providers/StoreProvider';

import styles from '../page.module.scss';

const ProfileView = observer(() => {
  const router = useRouter();
  const { authStore } = useStore();
  const { user } = authStore;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    authStore.clear();
    router.push(routes.home.create());
    router.refresh();
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <Text className={styles.label}>Username:</Text>
        <Text>{user.username}</Text>
      </div>
      <div className={styles.info}>
        <Text className={styles.label}>Email:</Text>
        <Text>{user.email}</Text>
      </div>
      <Button onClick={handleLogout} className={styles.button}>
        Logout
      </Button>
    </div>
  );
});

export default ProfileView;
