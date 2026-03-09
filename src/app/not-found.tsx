import Link from 'next/link';

import Button from '@/components/Button';
import Text from '@/components/Text';
import routes from '@/config/routes';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <Text view="p-20" weight="bold">
        Page Not Found
      </Text>
      <Text view="p-18">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>
      <Link href={routes.products.create()}>
        <Button>Back to Products</Button>
      </Link>
    </div>
  );
}
