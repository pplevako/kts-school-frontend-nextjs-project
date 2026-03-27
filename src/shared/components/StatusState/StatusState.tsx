import type { ReactNode } from 'react';

import Text from '@/components/Text';

import styles from './StatusState.module.scss';

type StatusStateProps = {
  code?: number | string;
  title?: string;
  message?: string;
  action?: ReactNode;
};

export default function StatusState({ code, title, message, action }: StatusStateProps) {
  return (
    <div className={styles.root}>
      {code && (
        <Text tag="h1" color="accent" className={styles.code}>
          {code}
        </Text>
      )}

      {title && (
        <Text view="p-20" weight="bold">
          {title}
        </Text>
      )}

      {message && (
        <Text view="p-18" color="secondary">
          {message}
        </Text>
      )}

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
