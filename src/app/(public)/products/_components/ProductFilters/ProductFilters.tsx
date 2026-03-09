'use client';

import cx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import Input from '@/components/Input';
import MultiDropdown from '@/components/MultiDropdown';
import type { Option } from '@/components/MultiDropdown';
import Text from '@/components/Text';
import { useStore } from '@/providers/StoreProvider';

import { useProductsRouter } from '../../_hooks/useProductsRouter';

import styles from './ProductFilters.module.scss';

const ProductFilters: React.FC<React.HTMLAttributes<HTMLDivElement>> = observer(
  ({ className, ...props }) => {
    const { filtersStore, categoriesStore, productListStore } = useStore();
    const { replaceFilters } = useProductsRouter();

    const handleSearchChange = useCallback(
      (value: string) => {
        filtersStore.setSearchTitle(value);
        replaceFilters({ mode: 'debounced' });
      },
      [filtersStore, replaceFilters]
    );

    const selectedOptions = categoriesStore.categories
      .filter((c) => filtersStore.selectedCategories.includes(c.id.toString()))
      .map((c) => c.categoryOption);

    const handleCategoryChange = useCallback(
      (options: Option[]) => {
        filtersStore.setSelectedCategories(options.map((opt) => opt.key));
        replaceFilters();
      },
      [filtersStore, replaceFilters]
    );

    const getTitle = (selected: Option[]) => {
      return selected.length === 0 ? 'Filter' : selected.map(({ value }) => value).join(', ');
    };

    return (
      <>
        <div className={cx(styles.filters, className)} {...props}>
          <Input
            className={styles.search}
            value={filtersStore.searchTitle}
            onChange={handleSearchChange}
            placeholder="Search product"
          />
          <MultiDropdown
            className={styles.categories}
            options={categoriesStore.categoryOptions}
            value={selectedOptions}
            onChange={handleCategoryChange}
            getTitle={getTitle}
          />
        </div>
        <div className={styles.totalProducts}>
          <Text view="p-32" color="primary" weight="bold">
            Total products
          </Text>
          <Text view="p-20" color="accent" weight="bold">
            {productListStore.total}
          </Text>
        </div>
      </>
    );
  }
);

export default ProductFilters;
