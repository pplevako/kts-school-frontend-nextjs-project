import { makeAutoObservable, autorun, toJS } from 'mobx';

import type ProductModel from '@stores/models/ProductModel';

type CartItemModel = {
  quantity: number;
  product: ProductModel;
};

type StoredCartItemModel = {
  id: number;
  quantity: number;
  product: ReturnType<typeof toJS<ProductModel>>;
};

class CartStore {
  private _items = new Map<number, CartItemModel>();

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }

    autorun(() => {
      this.saveToStorage();
    });
  }

  get items(): CartItemModel[] {
    return Array.from(this._items.values());
  }

  getItem(productId: number): CartItemModel | undefined {
    return this._items.get(productId);
  }

  removeItem(productId: number): void {
    this._items.delete(productId);
  }

  increment(productId: number): void {
    const item = this._items.get(productId);
    if (item) {
      item.quantity += 1;
    }
  }

  decrement(productId: number): void {
    const item = this._items.get(productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this._items.delete(productId);
      }
    }
  }

  addItem(product: ProductModel, quantity = 1): void {
    const id = product.id;
    const existing = this._items.get(id);
    if (existing) {
      existing.quantity += quantity;
      existing.product = product;
    } else {
      this._items.set(id, { quantity, product });
    }
  }

  clear(): void {
    this._items.clear();
  }

  get totalQuantity(): number {
    let sum = 0;
    for (const item of this._items.values()) {
      sum += item.quantity;
    }
    return sum;
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        const items: StoredCartItemModel[] = JSON.parse(stored);
        items.forEach((item) => {
          this._items.set(item.id, {
            quantity: item.quantity,
            product: item.product as ProductModel,
          });
        });
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
  }

  private saveToStorage(): void {
    const items: StoredCartItemModel[] = Array.from(this._items.entries()).map(([id, value]) => ({
      id,
      quantity: value.quantity,
      product: toJS(value.product),
    }));
    localStorage.setItem('cart', JSON.stringify(items));
  }
}

export default CartStore;
