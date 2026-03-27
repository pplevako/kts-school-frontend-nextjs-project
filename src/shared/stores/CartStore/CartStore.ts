import type { IReactionDisposer } from 'mobx';
import { makeAutoObservable, autorun, toJS } from 'mobx';

const CART_STORAGE_KEY = 'lalasia_cart';

export class CartItem {
  id: number;
  quantity: number;

  constructor(id: number, quantity = 1) {
    this.id = id;
    this.quantity = quantity;

    makeAutoObservable(this);
  }
}

type StoredCartItem = {
  id: number;
  quantity: number;
};

class CartStore {
  private _items = new Map<number, CartItem>();
  private storageDisposer: IReactionDisposer | null = null;

  constructor() {
    makeAutoObservable<CartStore, 'storageDisposer'>(this, {
      storageDisposer: false,
    });
  }

  get items(): CartItem[] {
    return Array.from(this._items.values());
  }

  getItem(productId: number): CartItem | undefined {
    return this._items.get(productId);
  }

  removeItem(productId: number): void {
    this._items.delete(productId);
  }

  increment(productId: number): void {
    this.changeItemQuantityBy(productId, 1);
  }

  decrement(productId: number): void {
    this.changeItemQuantityBy(productId, -1);
  }

  changeItemQuantityBy(productId: number, amount: number) {
    const item = this.getItem(productId) || new CartItem(productId, 0);
    item.quantity += amount;
    if (item.quantity > 0) {
      this._items.set(productId, item);
    } else {
      this.removeItem(productId);
    }
  }

  clear(): void {
    this._items.clear();
  }

  get totalQuantity(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  init() {
    if (typeof window === 'undefined') {
      return;
    }

    this.loadFromStorage();

    this.dispose();
    this.storageDisposer = autorun(() => {
      this.saveToStorage();
    });
  }

  dispose() {
    this.storageDisposer?.();
    this.storageDisposer = null;
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const items: StoredCartItem[] = JSON.parse(stored);
        items.forEach((item) => {
          this._items.set(item.id, new CartItem(item.id, item.quantity));
        });
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }

  private saveToStorage(): void {
    const items: StoredCartItem[] = this.items.map((item) => toJS(item));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}

export default CartStore;
