'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

import Button from '@/components/Button';
import StatusState from '@/components/StatusState';

import styles from './ErrorState.module.scss';

type ErrorStateProps = {
  title?: string;
  message?: string;
  buttonText?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = 'An unexpected error occurred',
  message = 'Please try again later',
  buttonText = 'Try again',
  onRetry,
}: ErrorStateProps) {
  const router = useRouter();

  const handleRetry = () => {
    startTransition(() => {
      onRetry?.();
      router.refresh();
    });
  };

  return (
    <div className={styles.error}>
      <StatusState
        title={title}
        message={message}
        action={<Button onClick={handleRetry}>{buttonText}</Button>}
      />
    </div>
  );
}
