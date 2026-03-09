import type { Metadata } from 'next';

import { fetchCategories } from '@/api/categories';
import { fetchProducts } from '@/api/products';
import { parseArrayParam, parseNumberParam } from '@/utils/queryParser';

import ProductsPageClient from './_components/ProductsPageClient';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our curated collection of modern furniture. Find the perfect pieces for your home.',
  openGraph: {
    title: 'Products - Lalasia',
    description:
      'Browse our curated collection of modern furniture. Find the perfect pieces for your home.',
  },
};

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    searchTitle?: string;
    categories?: string | string[];
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = parseNumberParam(params.page, 1);
  const search = params.searchTitle || '';
  const categories = parseArrayParam(params.categories);

  const [productsData, categoriesData] = await Promise.all([
    fetchProducts({ page, search, categories }),
    fetchCategories(),
  ]);

  const initialCategories = { categories: categoriesData };
  const initialFilters = { search, categories };
  const initialProducts = { products: productsData };

  return (
    <ProductsPageClient
      initialCategories={initialCategories}
      initialFilters={initialFilters}
      initialProducts={initialProducts}
    />
  );
}
