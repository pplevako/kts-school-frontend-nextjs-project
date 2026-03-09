import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchProduct } from '@/api/products';
import ProductModel from '@/models/ProductModel';

import ProductDetailClient from './_components/ProductDetailClient';

type ProductDetailPageProps = {
  params: Promise<{
    documentId: string;
  }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { documentId } = await params;
  const productData = await fetchProduct(documentId);

  if (!productData) {
    return {
      title: 'Product Not Found',
    };
  }

  const product = new ProductModel(productData);
  const primaryImage = product.getImageUrl();

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { documentId } = await params;
  const product = await fetchProduct(documentId);

  if (!product) {
    notFound();
  }

  const initialProduct = { product };

  return <ProductDetailClient initialProduct={initialProduct} />;
}
