import {
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';

import { AuthenticationService } from 'services';
import authToken from 'utils/authToken';

import RootStore from './RootStore';

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

    if (authToken.access) this.accessToken = authToken.access;
  }

  get isAuthenticated() {
    return Boolean(!this.error && this.accessToken);
  }

  async login(email: string, password: string) {
    try {
      this.isLoading = true;

      const { access } = await this.authenticationService.authentication(email, password);
      authToken.access = access;
      this.accessToken = access;
    } catch (e) {
      this.error = e as Error;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.accessToken = '';
    authToken.access = '';
    this.error = null;
    this.isLoading = false;
  }
}

export default AuthenticationStore;
