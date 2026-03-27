import type { StrapiProduct } from '@/api/types';
import { formatPrice } from '@/utils/format';

import ProductCategoryModel from './ProductCategoryModel';

export type ImageFormatKey = 'large' | 'medium' | 'small' | 'thumbnail';

export type Image = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

class ProductModel {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  category: ProductCategoryModel | null = null;
  images: Image[] = [];

  constructor(data: StrapiProduct) {
    this.id = data.id;
    this.documentId = data.documentId;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.discountPercent = data.discountPercent;
    if (data.productCategory) {
      this.category = new ProductCategoryModel(data.productCategory);
    }
    if (Array.isArray(data.images)) {
      this.images = data.images;
    }
  }

  getImageUrl(index = 0): string {
    return this.images[index]?.url || '';
  }

  get categoryTitle(): string | undefined {
    return this.category?.title;
  }

  get discountedPrice(): number {
    return this.price * (1 - this.discountPercent / 100);
  }

  get formattedPrice(): string {
    return formatPrice(this.price);
  }
}

export default ProductModel;
