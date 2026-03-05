import axios from 'axios';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import type { Option } from '@components/MultiDropdown';
import ProductCategoryModel from '@stores/models/ProductCategoryModel';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/product-categories';

class ProductCategoriesStore {
  categories: ProductCategoryModel[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      categories: observable.ref,
    });
  }

  // TODO: add pagination
  async fetchCategories() {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(BASE_URL);
      runInAction(() => {
        this.categories = response.data.data.map((item: unknown) => new ProductCategoryModel(item));
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : 'Unknown error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get categoryOptions(): Option[] {
    return this.categories.map((c) => c.categoryOption);
  }
}

export default ProductCategoriesStore;
