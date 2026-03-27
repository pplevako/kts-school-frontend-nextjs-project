import qs from 'qs';

type FilterValue =
  | string
  | number
  | boolean
  | null
  | readonly FilterValue[]
  | { [key: string]: FilterValue };

type StrapiQuery = {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  populate?: string[];
  filters?: Record<string, FilterValue>;
};

export type ProductsQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  categories?: readonly string[];
};

export function buildProductsQuery(params: ProductsQueryParams): string {
  const { page = 1, pageSize = 9, search, categories } = params;

  const query: StrapiQuery = {
    pagination: {
      page,
      pageSize,
    },
    populate: ['images', 'productCategory'],
  };

  if (search) {
    query.filters ??= {};
    query.filters.title = {
      $containsi: search,
    };
  }

  if (categories && categories.length > 0) {
    query.filters ??= {};
    query.filters.productCategory = {
      id: {
        $in: categories,
      },
    };
  }

  return qs.stringify(query, { encodeValuesOnly: true });
}

export function buildProductQuery(): string {
  const query: StrapiQuery = {
    populate: ['images', 'productCategory'],
  };

  return qs.stringify(query, { encodeValuesOnly: true });
}

export function buildProductsByIdsQuery(ids: number[]): string {
  const query: StrapiQuery = {
    pagination: { pageSize: ids.length },
    populate: ['images', 'productCategory'],
    filters: { id: { $in: ids } },
  };

  return qs.stringify(query, { encodeValuesOnly: true });
}
