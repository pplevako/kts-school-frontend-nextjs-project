import qs from 'qs';

import { apiRequest } from './client';
import type { CategoriesResponse } from './types';

export async function fetchCategories(): Promise<CategoriesResponse> {
  const query = qs.stringify(
    {
      pagination: {
        pageSize: 100,
      },
    },
    { encodeValuesOnly: true }
  );

  return apiRequest<CategoriesResponse>(`/product-categories?${query}`);
}
