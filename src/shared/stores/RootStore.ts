import '@/config/configureMobX';
import CartStore from './CartStore';
import ProductCategoriesStore from './ProductCategoriesStore';
import ProductFiltersStore from './ProductFiltersStore';
import ProductListStore from './ProductListStore';
import ProductStore from './ProductStore';

class RootStore {
  categoriesStore: ProductCategoriesStore;
  filtersStore: ProductFiltersStore;
  productListStore: ProductListStore;
  productStore: ProductStore;
  cartStore: CartStore;

  constructor() {
    this.categoriesStore = new ProductCategoriesStore();
    this.filtersStore = new ProductFiltersStore();
    this.productListStore = new ProductListStore();
    this.productStore = new ProductStore();
    this.cartStore = new CartStore();
  }
}

export default RootStore;
