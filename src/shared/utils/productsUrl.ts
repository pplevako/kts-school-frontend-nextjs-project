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

  if (categories) {
    params.delete('categories');
    categories.forEach((id) => params.append('categories', id));
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
