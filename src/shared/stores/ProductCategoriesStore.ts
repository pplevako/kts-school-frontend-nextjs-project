import { makeAutoObservable, observable } from 'mobx';

import type { CategoriesResponse } from '@/api/types';
import type { Option } from '@/components/MultiDropdown';
import ProductCategoryModel from '@/models/ProductCategoryModel';

export type ProductCategoriesHydration = {
  categories: CategoriesResponse;
};

class ProductCategoriesStore {
  categories: ProductCategoryModel[] = [];

  constructor() {
    makeAutoObservable(this, {
      categories: observable.ref,
    });
  }

  hydrate(data: ProductCategoriesHydration) {
    this.categories = data.categories.data.map((item) => new ProductCategoryModel(item));
  }

  get categoryOptions(): Option[] {
    return this.categories.map((c) => c.categoryOption);
  }
}

export default ProductCategoriesStore;
