'use client';

import Button from '@/components/Button/Button';

import styles from './error.module.scss';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.error}>
      <h2>Something went wrong!</h2>
      <p>{error.message || 'Failed to load products'}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
