import type { Metadata } from 'next';

import Text from '@/components/Text';

import RegisterForm from './_components/RegisterForm';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Register - Lalasia',
};

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Text tag="h1" className={styles.title}>
          Register
        </Text>
        <RegisterForm />
      </div>
    </div>
  );
}
