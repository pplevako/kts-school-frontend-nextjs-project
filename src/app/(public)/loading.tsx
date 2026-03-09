import Loader from '@/components/Loader/Loader';

import styles from './loading.module.scss';

export default function ProductsLoading() {
  return (
    <div className={styles.loading}>
      <Loader />
    </div>
  );
}
