import { makeAutoObservable } from 'mobx';

import type { StrapiProduct } from '@/api/types';
import ProductModel from '@/models/ProductModel';

export type ProductHydration = {
  product: StrapiProduct;
};

class ProductStore {
  private _product: ProductModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(data: ProductHydration) {
    this._product = new ProductModel(data.product);
  }

  get product() {
    return this._product;
  }

  reset() {
    this._product = null;
  }
}

export default ProductStore;
