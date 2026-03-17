import { makeAutoObservable } from 'mobx';

export type User = {
  id: string;
  email: string;
  username: string;
};

export type AuthState = {
  user: User | null;
};

class AuthStore {
  private _user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(state: AuthState) {
    this._user = state.user;
  }

  setUser(user: User | null) {
    this._user = user;
  }

  clear() {
    this._user = null;
  }

  get user() {
    return this._user;
  }

  get isAuthenticated() {
    return !!this._user;
  }

  get username() {
    return this._user?.username || '';
  }

  get email() {
    return this._user?.email || '';
  }
}

export default AuthStore;
