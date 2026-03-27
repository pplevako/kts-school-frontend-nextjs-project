import type { Metadata } from 'next';

import Text from '@/components/Text';

import LoginForm from './_components/LoginForm';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Login - Lalasia',
};

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Text tag="h1" className={styles.title}>
          Login
        </Text>
        <LoginForm />
      </div>
    </div>
  );
}
