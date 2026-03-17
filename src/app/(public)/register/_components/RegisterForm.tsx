'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { registerUser } from '@/api/auth';
import { ApiRequestError } from '@/api/client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import routes from '@/config/routes';

import styles from '../page.module.scss';

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser({ username, email, password });

      const result = await signIn('credentials', {
        identifier: email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError('Registration successful, but login failed. Please try logging in.');
        setLoading(false);
        return;
      }

      router.push(routes.profile.create());
      router.refresh();
    } catch (e) {
      if (e instanceof ApiRequestError && e.status === 400) {
        setError('Email already in use');
      } else {
        setError('An error occurred. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input value={username} onChange={setUsername} placeholder="Username" disabled={loading} />
      <Input
        value={email}
        onChange={setEmail}
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
        Register
      </Button>
      <Text className={styles.link}>
        Already have an account? <Link href={routes.login.create()}>Login</Link>
      </Text>
    </form>
  );
}
