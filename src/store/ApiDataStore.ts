import {
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';

import { IApiDataService } from 'types/service';

import { LOADED_STATUS } from './lib';
import RootStore from './RootStore';

class ApiDataStore<K> {
  public loading = false;
  public data: K | null = null;
  public error: Error | null = null;

  constructor(
    private readonly rootStore: RootStore,
    private readonly service: IApiDataService<K>,
  ) {
    makeObservable(this, {
      loading: observable,
      error: observable,
      data: observable,
      fetch: action.bound,
      status: computed,
    });
  }

  get status(): LOADED_STATUS {
    if (this.loading) return LOADED_STATUS.LOADING;
    if (this.error) return LOADED_STATUS.FAIL;
    return this.data ? LOADED_STATUS.SUCCESS : LOADED_STATUS.NOT_LOADED;
  }

  async fetch() {
    if (this.loading) return false;
    this.loading = true;
    this.error = null;
    this.data = null;

    const response = await this.service.fetch();

    if ('error' in response) this.error = response.error;
    else this.data = response.data;

    this.loading = false;

    return !('error' in response);
  }

  async save(data: K) {
    if (this.loading) return false;
    this.loading = true;
    this.error = null;

    const response = await this.service.update(data);

    if ('error' in response) this.error = response.error;
    else this.data = response.item;

    this.loading = false;

    return !('error' in response);
  }
}

export default ApiDataStore;
