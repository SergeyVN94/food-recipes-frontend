import _ from 'lodash';
import {
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';

import ListService from 'services/ListService/ListService';
import { ListFilter, ListItemType, SERVICE_LIST_KEY } from 'types/listService';

import { LOADED_STATUS } from './lib';
import RootStore from './RootStore';

class ListStore<K extends SERVICE_LIST_KEY> {
  public loading = false;
  public data: ListItemType<K>[] | null = null;
  public metadata: unknown = null; // дополнительные данные, которые вернул сервер в дополнение к основным
  public error: Error | string | null = null;
  private static instances = new Map<SERVICE_LIST_KEY, ListStore<SERVICE_LIST_KEY>>();
  private fetchItemsFilter: ListFilter<K> | null = null;

  constructor(
    private readonly rootStore: RootStore,
    public readonly key: K,
    private readonly listService: ListService<K>,
  ) {
    if (ListStore.instances.has(key)) return ListStore.instances.get(key) as ListStore<typeof key>;

    makeObservable(this, {
      data: observable,
      error: observable,
      loading: observable,
      metadata: observable,
      fetchItems: action,
      status: computed,
    });

    ListStore.instances.set(key, this);
  }

  get status(): LOADED_STATUS {
    if (this.loading) return LOADED_STATUS.LOADING;
    if (this.error) return LOADED_STATUS.FAIL;
    return this.data ? LOADED_STATUS.SUCCESS : LOADED_STATUS.NOT_LOADED;
  }

  getFetchFilter(): ListFilter<K> | null {
    return this.fetchItemsFilter;
  }

  async fetchItems({ filter, force = false, appendToData }: {
    filter?: ListFilter<K>;
    force?: boolean;
    appendToData?: boolean; // добавить данные к текущему массиву
  } = {}) {
    if (!force && this.loading) return;

    this.fetchItemsFilter = filter ?? null;

    this.loading = true;

    const { data, error, metadata } = await this.listService.fetchItems(filter);

    if (data) this.data = appendToData ? _.concat(this.data ?? [], data) : data;
    this.error = error ?? null;
    this.metadata = metadata ?? null;
    this.loading = false;
  }

  async saveItem(item: ListItemType<K>): Promise<{ success: boolean, data?: unknown }> {
    if (this.loading) return ({ success: false });
    this.error = null;
    this.metadata = null;
    this.loading = true;

    const {
      success,
      error,
      metadata,
      data,
    } = await this.listService.saveItem(item);

    if (error) this.error = error;
    if (metadata) this.metadata = metadata;

    this.loading = false;

    return ({ success, data });
  }

  async deleteItem(id: string | number): Promise<boolean> {
    if (this.loading) return false;
    this.error = null;
    this.loading = true;

    const { success, error } = await this.listService.deleteItem(id);

    if (error) this.error = error;

    this.loading = false;

    return success;
  }
}

export default ListStore;
