import { makeAutoObservable, observable } from 'mobx';

import type { ProductsResponse } from '@/api/types';
import ProductModel from '@/models/ProductModel';

export type ProductListHydration = {
  products: ProductsResponse;
};

const DEFAULT_PAGE_SIZE = 25;

class ProductListStore {
  private _products: ProductModel[] = [];
  private _total = 0;
  private _page = 1;
  private _pageSize = DEFAULT_PAGE_SIZE;

  constructor() {
    makeAutoObservable<ProductListStore, '_products'>(this, {
      _products: observable.ref,
    });
  }

  hydrate(data: ProductListHydration) {
    this.setProducts(data.products);
    this.setPagination(data.products);
  }

  get products(): readonly ProductModel[] {
    return this._products;
  }

  private setProducts(data: ProductsResponse) {
    this._products = data.data.map((item) => new ProductModel(item));
  }

  private setPagination(data: ProductsResponse) {
    const { pagination } = data.meta;
    this._total = pagination.total;
    this._page = pagination.page;
    this._pageSize = pagination.pageSize;
  }

  get total() {
    return this._total;
  }

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  get pageCount() {
    return Math.ceil(this.total / this.pageSize);
  }
}

export default ProductListStore;
