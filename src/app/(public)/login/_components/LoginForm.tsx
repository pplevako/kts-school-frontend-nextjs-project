'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import routes from '@/config/routes';

import styles from '../page.module.scss';

export default function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        identifier,
        password,
        redirect: false,
      });

      if (result.error) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      router.push(routes.profile.create());
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        value={identifier}
        onChange={setIdentifier}
        placeholder="Email"
        type="email"
        disabled={loading}
      />
      <Input
        value={password}
        onChange={setPassword}
        placeholder="Password"
        type="password"
        disabled={loading}
      />
      {error && <Text className={styles.error}>{error}</Text>}
      <Button type="submit" loading={loading} className={styles.button}>
        Login
      </Button>
      <Text className={styles.link}>
        Don&#39;t have an account? <Link href={routes.register.create()}>Register</Link>
      </Text>
    </form>
  );
}
