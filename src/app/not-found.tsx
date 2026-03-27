import Link from 'next/link';

import Button from '@/components/Button';
import StatusState from '@/components/StatusState';
import routes from '@/config/routes';

export default function NotFound() {
  return (
    <StatusState
      code={404}
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved"
      action={
        <Link href={routes.home.create()}>
          <Button>Go Home</Button>
        </Link>
      }
    />
  );
}
