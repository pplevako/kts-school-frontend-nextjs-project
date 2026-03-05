'use client';

import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import Pagination from '@components/Pagination';
import Text from '@components/Text';
import routes from '@config/routes';
import { useStore } from '@stores/StoreProvider';
import type ProductModel from '@stores/models/ProductModel';

import ProductFilters from './components/ProductFilters';
import ProductListItem from './components/ProductListItem';
import styles from './page.module.scss';

const ProductListPage: React.FC = observer(() => {
  const { categoriesStore, filtersStore, productListStore } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const querySearchTitle = searchParams.get('searchTitle');
    const queryCategories = searchParams.getAll('categories');
    const queryPage = searchParams.get('page');

    if (querySearchTitle) {
      filtersStore.setSearchTitle(querySearchTitle);
    }
    if (queryCategories.length) {
      filtersStore.setSelectedCategories(queryCategories);
    }
    if (queryPage) {
      const page = parseInt(queryPage, 10);
      if (!isNaN(page) && page > 0) productListStore.setPage(page);
    }
  }, [filtersStore, productListStore, searchParams]);

  useEffect(() => {
    const disposer = reaction(
      () => ({
        searchTitle: filtersStore.searchTitle,
        categories: filtersStore.selectedCategories,
        page: productListStore.page,
      }),
      ({ searchTitle, categories, page }) => {
        const params = new URLSearchParams();
        if (page !== 1) params.set('page', String(page));
        if (searchTitle) params.set('searchTitle', searchTitle);
        categories.forEach((id: number) => params.append('categories', String(id)));
        router.push(`${routes.products.create()}?${params.toString()}`);
      }
    );
    return disposer;
  }, [filtersStore, productListStore, router]);

  useEffect(() => {
    categoriesStore.fetchCategories();
  }, [categoriesStore]);

  useEffect(() => {
    productListStore.fetchProducts();
  }, [
    productListStore,
    productListStore.page,
    filtersStore.searchTitle,
    filtersStore.selectedCategories,
  ]);

  const handlePageChange = useCallback(
    (page: number) => {
      productListStore.setPage(page);
    },
    [productListStore]
  );

  const pagination = (
    <nav className={styles.paginationNav}>
      <Pagination
        page={productListStore.page}
        pageCount={productListStore.pageCount}
        onPageChange={handlePageChange}
      />
    </nav>
  );

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
      <div className={styles.filters}>
        <ProductFilters />
        <div className={styles.totalProducts}>
          <Text view="p-32" color="primary" weight="bold">
            Total products
          </Text>
          <Text view="p-20" color="accent" weight="bold">
            {productListStore.total}
          </Text>
        </div>
      </div>
      {pagination}
      <div className={styles.productsGrid}>
        {productListStore.products.map((product: ProductModel) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
      {pagination}
    </div>
  );
});

export default ProductListPage;
