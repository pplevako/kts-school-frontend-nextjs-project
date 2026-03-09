'use client';

import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import { useStore } from '@/providers/StoreProvider';

import { useProductsRouter } from '../../_hooks/useProductsRouter';

import styles from './ProductsPagination.module.scss';

const ProductsPagination = observer(() => {
  const { productListStore } = useStore();
  const { page, pageCount } = productListStore;
  const { replacePage } = useProductsRouter();

  const handlePageChange = useCallback(
    (page: number) => {
      replacePage(page);
    },
    [replacePage]
  );

  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav className={styles.paginationNav}>
      <Pagination page={page} pageCount={pageCount} onPageChange={handlePageChange} />
    </nav>
  );
});

export default ProductsPagination;
