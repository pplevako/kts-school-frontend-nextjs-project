import axios from 'axios';
import {
  makeAutoObservable,
  observable,
  reaction,
  runInAction,
  type IReactionDisposer,
} from 'mobx';
import qs from 'qs';

import ProductModel from '@stores/models/ProductModel';

import type ProductFiltersStore from '../ProductFiltersStore';

const DEFAULT_PAGE_SIZE = 25;
const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/products';

class ProductListStore {
  private _products: ProductModel[] = [];
  private _total = 0;
  private _page = 1;
  private _pageSize: number;
  private _loading = false;
  private _error: string | null = null;
  private readonly filtersStore: ProductFiltersStore;
  private disposers: IReactionDisposer[] = [];

  constructor(filtersStore: ProductFiltersStore, pageSize = DEFAULT_PAGE_SIZE) {
    this.filtersStore = filtersStore;
    this._pageSize = pageSize;
    makeAutoObservable<ProductListStore, '_products' | 'disposers'>(this, {
      _products: observable.ref,
      disposers: false,
    });

    const disposer = reaction(
      () => [filtersStore.searchTitle, filtersStore.selectedCategories],
      () => {
        this.resetPage();
      }
    );
    this.disposers.push(disposer);
  }

  get products(): readonly ProductModel[] {
    return this._products;
  }

  get total() {
    return this._total;
  }

  get page() {
    return this._page;
  }

  setPage(page: number) {
    this._page = page;
  }

  resetPage() {
    this.setPage(1);
  }

  get pageSize() {
    return this._pageSize;
  }

  setPageSize(size: number) {
    this._pageSize = size;
    this.resetPage();
  }

  get pageCount() {
    return Math.ceil(this.total / this.pageSize);
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
      pagination: {
        page: this.page,
        pageSize: this.pageSize,
      },
      ...this.filtersStore.queryParams,
    };
  }

  async fetchProducts() {
    this._loading = true;
    this._error = null;
    try {
      const queryString = qs.stringify(this.queryParams, {
        encodeValuesOnly: true,
      });
      const response = await axios.get(`${BASE_URL}?${queryString}`);
      runInAction(() => {
        this._products = response.data.data.map((item: unknown) => new ProductModel(item));
        this._total = response.data.meta.pagination.total;
      });
    } catch (err) {
      runInAction(() => {
        this._products = [];
        this._error = err instanceof Error ? err.message : 'Unknown error';
      });
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  dispose() {
    this.disposers.forEach((disposer) => disposer());
    this.disposers = [];
  }
}

export default ProductListStore;
