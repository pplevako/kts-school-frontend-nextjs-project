'use client';

import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useCallback, useEffect } from 'react';

import { useStore } from '@/providers/StoreProvider';
import { buildProductsUrl } from '@/utils/productsUrl';

type ReplaceProductsParams = {
  searchTitle?: string;
  categories?: readonly string[];
  page?: number;
};

export type ReplaceMode = 'debounced' | 'immediate';

type ReplaceOptions = {
  mode?: ReplaceMode;
};

type UseProductsRouterOptions = {
  debounceMs?: number;
};

export function useProductsRouter(options: UseProductsRouterOptions = {}) {
  const { debounceMs = 300 } = options;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const { filtersStore } = useStore();

  const replace = useCallback(
    (next: ReplaceProductsParams) => {
      const newUrl = buildProductsUrl({
        pathname,
        currentSearchParams: searchParamsString,
        ...next,
      });

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParamsString]
  );

  const replaceDebounced = useMemo(() => debounce(replace, debounceMs), [debounceMs, replace]);

  const replaceFilters = useCallback(
    ({ mode = 'immediate' }: ReplaceOptions = {}) => {
      const next = {
        searchTitle: filtersStore.searchTitle,
        categories: filtersStore.selectedCategories,
        page: 1,
      };

      if (mode === 'immediate') {
        replaceDebounced.cancel();
        replace(next);
        return;
      }

      replaceDebounced(next);
    },
    [filtersStore, replace, replaceDebounced]
  );

  const replacePage = useCallback(
    (page: number) => {
      replaceDebounced.cancel();
      replace({ page });
    },
    [replace, replaceDebounced]
  );

  useEffect(() => {
    return () => {
      replaceDebounced.cancel();
    };
  }, [replaceDebounced]);

  return {
    replaceFilters,
    replacePage,
  };
}
