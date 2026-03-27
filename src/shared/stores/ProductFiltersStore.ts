import { makeAutoObservable } from 'mobx';

export type ProductFiltersHydration = {
  search: string;
  categories: string[];
};

class ProductFiltersStore {
  private _searchTitle = '';
  private _selectedCategories: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(data: ProductFiltersHydration) {
    this._searchTitle = data.search;
    this._selectedCategories = data.categories;
  }

  get searchTitle() {
    return this._searchTitle;
  }

  setSearchTitle(title: string) {
    this._searchTitle = title;
  }

  get selectedCategories(): readonly string[] {
    return this._selectedCategories;
  }

  setSelectedCategories(ids: string[]) {
    this._selectedCategories = ids;
  }

  reset() {
    this._searchTitle = '';
    this._selectedCategories = [];
  }
}

export default ProductFiltersStore;
