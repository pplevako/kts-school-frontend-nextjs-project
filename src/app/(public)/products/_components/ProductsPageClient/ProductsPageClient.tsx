'use client';

import { useEffect } from 'react';

import Text from '@/components/Text';
import { useStore } from '@/providers/StoreProvider';
import type { ProductCategoriesHydration } from '@/stores/ProductCategoriesStore';
import type { ProductFiltersHydration } from '@/stores/ProductFiltersStore';
import type { ProductListHydration } from '@/stores/ProductListStore';

import ProductFilters from '../ProductFilters';
import ProductList from '../ProductList';
import ProductsPagination from '../ProductsPagination';

import styles from './ProductsPageClient.module.scss';

type ProductListProps = {
  initialProducts: ProductListHydration;
  initialCategories: ProductCategoriesHydration;
  initialFilters: ProductFiltersHydration;
};

function ProductsPageView() {
  return (
    <div className={styles.productListPage}>
      <div className={styles.desc}>
        <Text view="title" color="primary" weight="bold">
          Products
        </Text>
        <Text view="p-20" color="secondary">
          We display products based on the latest products we have, if you want to see our old
          products please enter the name of the item
        </Text>
      </div>
      <ProductFilters />
      <ProductsPagination />
      <ProductList />
      <ProductsPagination />
    </div>
  );
}

function ProductsPageClient({
  initialCategories,
  initialFilters,
  initialProducts,
}: ProductListProps) {
  const { categoriesStore, filtersStore, productListStore } = useStore();

  useEffect(() => {
    categoriesStore.hydrate(initialCategories);
    filtersStore.hydrate(initialFilters);
    productListStore.hydrate(initialProducts);
  }, [
    initialCategories,
    initialFilters,
    initialProducts,
    categoriesStore,
    filtersStore,
    productListStore,
  ]);

  return <ProductsPageView />;
}

export default ProductsPageClient;
