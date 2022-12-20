import {
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';
import Cookie from 'js-cookie';

import { AuthenticationService } from 'services';
import RootStore from './RootStore';

enum COOKIE_KEYS {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

class AuthenticationStore {
  public isLoading = false;
  public accessToken = '';
  public error: Error | null = null;

  constructor(
    private readonly rootStore: RootStore,
    private readonly authenticationService: AuthenticationService,
  ) {
    makeObservable(this, {
      accessToken: observable,
      isLoading: observable,
      error: observable,
      login: action.bound,
      logout: action.bound,
      isAuthenticated: computed,
    });

    const accessToken = Cookie.get(COOKIE_KEYS.ACCESS_TOKEN);

    if (accessToken) this.accessToken = accessToken;
  }

  get isAuthenticated() {
    return Boolean(!this.error && this.accessToken);
  }

  async login(email: string, password: string) {
    try {
      this.isLoading = true;

      const { access } = await this.authenticationService.authentication(email, password);

      Cookie.set(COOKIE_KEYS.ACCESS_TOKEN, access, { expires: 14 });

      this.accessToken = access;
    } catch (e) {
      this.error = e as Error;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.accessToken = '';
    this.error = null;
    this.isLoading = false;
    Cookie.remove(COOKIE_KEYS.ACCESS_TOKEN);
    Cookie.remove(COOKIE_KEYS.REFRESH_TOKEN);
  }
}

export default AuthenticationStore;
