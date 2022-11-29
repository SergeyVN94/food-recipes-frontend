import {
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';

import { ApiDataService } from 'services';
import { ApiDataType, SERVICE_API_DATA_KEY } from 'types/apiDataService';

import { LOADED_STATUS } from './lib';
import RootStore from './RootStore';

class ApiDataStore<K extends SERVICE_API_DATA_KEY> {
  public loading = false;
  public data: ApiDataType<K> | null = null;
  public error: Error | string | null = null;
  // eslint-disable-next-line max-len
  private static readonly instanceMap = new Map<SERVICE_API_DATA_KEY, ApiDataStore<SERVICE_API_DATA_KEY>>();

  constructor(
    private readonly rootStore: RootStore,
    public readonly key: K,
    private readonly apiDataService: ApiDataService,
  ) {
    if (ApiDataStore.instanceMap.has(this.key)) {
      return ApiDataStore.instanceMap.get(this.key) as ApiDataStore<typeof key>;
    }

    makeObservable(this, {
      loading: observable,
      error: observable,
      data: observable,
      fetchData: action.bound,
      status: computed,
    });

    ApiDataStore.instanceMap.set(this.key, this);
  }

  get status(): LOADED_STATUS {
    const { data, loading, error } = this;
    if (!data && !loading && !error) return LOADED_STATUS.NOT_LOADED;
    if (!loading && data && !error) return LOADED_STATUS.SUCCESS;
    if (!loading && !data && error) return LOADED_STATUS.FAIL;
    return LOADED_STATUS.LOADING;
  }

  async fetchData() {
    if (this.loading) return false;
    this.loading = true;
    this.error = null;
    this.data = null;

    const { data, error, success } = await this.apiDataService.fetchData(this.key);

    if (error) this.error = error;
    if (data) this.data = data;

    this.loading = false;

    return success;
  }

  async saveData(data: ApiDataType<K>) {
    if (this.loading) return false;
    this.loading = true;
    this.error = null;

    const { success, error } = await this.apiDataService.saveData(this.key, data);

    if (error) this.error = error;

    this.loading = false;

    return success;
  }
}

export default ApiDataStore;
