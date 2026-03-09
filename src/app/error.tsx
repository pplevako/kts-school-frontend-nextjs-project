'use client';

import Button from '@/components/Button';
import Text from '@/components/Text';

import styles from './error.module.scss';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.error}>
      <Text view="p-20" weight="bold">
        Something went wrong!
      </Text>
      <Text view="p-18">{error.message || 'An unexpected error occurred'}</Text>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
