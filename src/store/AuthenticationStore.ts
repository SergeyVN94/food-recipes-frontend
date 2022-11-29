import {
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';
import Cookie from 'js-cookie';

import { authenticationService } from 'services';
import RootStore from './RootStore';

enum COOKIE_KEYS {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

class AuthenticationStore {
  public isLoading = false;
  public accessToken = '';
  public refreshToken = '';
  public error: Error | null = null;

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this, {
      accessToken: observable,
      refreshToken: observable,
      isLoading: observable,
      error: observable,
      login: action.bound,
      logout: action.bound,
      doRefreshToken: action.bound,
      isAuthenticated: computed,
    });

    const accessToken = Cookie.get(COOKIE_KEYS.ACCESS_TOKEN);
    const refreshToken = Cookie.get(COOKIE_KEYS.REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    }
  }

  get isAuthenticated() {
    return Boolean(!this.error && this.accessToken && this.refreshToken);
  }

  async login(email: string, password: string) {
    try {
      this.isLoading = true;

      const { access, refresh } = await authenticationService.authentication(email, password);

      Cookie.set(COOKIE_KEYS.ACCESS_TOKEN, access, { expires: 14 });
      Cookie.set(COOKIE_KEYS.REFRESH_TOKEN, refresh, { expires: 14 });

      this.accessToken = access;
      this.refreshToken = refresh;
    } catch (e) {
      this.error = e as Error;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.accessToken = '';
    this.refreshToken = '';
    this.error = null;
    this.isLoading = false;
    Cookie.remove(COOKIE_KEYS.ACCESS_TOKEN);
    Cookie.remove(COOKIE_KEYS.REFRESH_TOKEN);
  }

  async doRefreshToken() {
    if (this.isLoading) return;
    this.isLoading = true;

    const result = await authenticationService.refreshToken(this.refreshToken);

    if (result instanceof Error) {
      this.error = result;
    } else {
      this.accessToken = result.access;
      this.refreshToken = result.refresh;
    }

    this.isLoading = false;
  }
}

export default AuthenticationStore;
