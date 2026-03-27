type ProductsUrlParams = {
  pathname: string;
  currentSearchParams: string;
  searchTitle?: string;
  categories?: readonly string[];
  page?: number;
};

export function buildProductsUrl({
  pathname,
  currentSearchParams,
  searchTitle,
  categories,
  page,
}: ProductsUrlParams): string {
  const params = new URLSearchParams(currentSearchParams);

  if (searchTitle !== undefined) {
    if (searchTitle) {
      params.set('searchTitle', searchTitle);
    } else {
      params.delete('searchTitle');
    }
  }

  if (categories !== undefined) {
    if (categories.length > 0) {
      params.set('categories', categories.join(','));
    } else {
      params.delete('categories');
    }
  }

  if (page !== undefined) {
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
  }

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
