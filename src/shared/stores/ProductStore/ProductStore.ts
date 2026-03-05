import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import qs from 'qs';

import ProductModel from '@stores/models/ProductModel';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/products';

class ProductStore {
  private _product: ProductModel | null = null;
  private _loading = false;
  private _error: string | null = null;
  private abortController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this, {
      queryParams: false,
    });
  }

  get product() {
    return this._product;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get queryParams() {
    return {
      populate: ['images', 'productCategory'],
    };
  }

  reset() {
    this._product = null;
    this._loading = false;
    this._error = null;
  }

  async fetchProduct(documentId: string) {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    this.reset();
    try {
      const queryString = qs.stringify(this.queryParams, {
        encodeValuesOnly: true,
      });
      const response = await axios.get(`${BASE_URL}/${documentId}?${queryString}`, { signal });
      runInAction(() => {
        this._product = new ProductModel(response.data.data);
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      runInAction(() => {
        this._error = err instanceof Error ? err.message : 'Unknown error';
      });
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  dispose() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }
}

export default ProductStore;
