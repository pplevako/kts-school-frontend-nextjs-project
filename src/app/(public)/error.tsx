'use client';

import ErrorState from '@/components/ErrorState';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === 'development';

  return <ErrorState message={isDev ? error.message : undefined} onRetry={reset} />;
}
