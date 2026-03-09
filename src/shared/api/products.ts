import type { ProductsQueryParams } from '@/utils/queryBuilder';
import { buildProductQuery, buildProductsQuery } from '@/utils/queryBuilder';

import { apiRequest } from './client';
import type { ProductsResponse, StrapiProduct } from './types';

export async function fetchProducts(params: ProductsQueryParams = {}): Promise<ProductsResponse> {
  const queryString = buildProductsQuery(params);
  return apiRequest<ProductsResponse>(`/products?${queryString}`);
}

export async function fetchProduct(documentId: string): Promise<StrapiProduct | null> {
  try {
    const queryString = buildProductQuery();
    const response = await apiRequest<{ data: StrapiProduct }>(
      `/products/${documentId}?${queryString}`
    );
    return response.data;
  } catch {
    return null;
  }
}
