import type { ProductsQueryParams } from '@/utils/queryBuilder';
import {
  buildProductQuery,
  buildProductsByIdsQuery,
  buildProductsQuery,
} from '@/utils/queryBuilder';

import { ApiRequestError, apiRequest } from './client';
import type { ProductsResponse, StrapiProduct } from './types';

export async function fetchProducts(params: ProductsQueryParams = {}): Promise<ProductsResponse> {
  const queryString = buildProductsQuery(params);
  return apiRequest<ProductsResponse>(`/products?${queryString}`, { next: { revalidate: 60 } });
}

export async function fetchProductsByIds(ids: number[]): Promise<ProductsResponse> {
  const queryString = buildProductsByIdsQuery(ids);
  return apiRequest<ProductsResponse>(`/products?${queryString}`, { next: { revalidate: 60 } });
}

export async function fetchProduct(documentId: string): Promise<StrapiProduct | null> {
  const queryString = buildProductQuery();
  try {
    const response = await apiRequest<{ data: StrapiProduct }>(
      `/products/${documentId}?${queryString}`,
      { next: { revalidate: 60 } }
    );
    return response.data;
  } catch (e) {
    if (e instanceof ApiRequestError && e.status === 404) {
      return null;
    }

    throw e;
  }
}
