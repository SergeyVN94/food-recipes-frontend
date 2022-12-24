import _ from 'lodash';
import {
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';

import { IListService } from 'types/service';

import { LOADED_STATUS } from './lib';
import RootStore from './RootStore';

class ListStore<
  Item extends { id: unknown },
  Filter extends object,
  Payload = Omit<Item, 'id'>,
> {
  public loading = false;
  public data: Item[] | null = null;
  public metadata: unknown = null; // дополнительные данные, которые вернул сервер в дополнение к основным
  public error: Error | string | null = null;
  private fetchItemsFilter: Filter | null = null;

  constructor(
    private readonly rootStore: RootStore,
    private readonly service: IListService<Item, Filter, Payload>,
  ) {
    makeObservable(this, {
      data: observable,
      error: observable,
      loading: observable,
      metadata: observable,
      fetchItems: action,
      status: computed,
    });
  }

  get status(): LOADED_STATUS {
    if (this.loading) return LOADED_STATUS.LOADING;
    if (this.error) return LOADED_STATUS.FAIL;
    return this.data ? LOADED_STATUS.SUCCESS : LOADED_STATUS.NOT_LOADED;
  }

  getFetchFilter(): Filter | null {
    return this.fetchItemsFilter;
  }

  async fetchItems({ filter, force = false, appendToData }: {
    filter?: Filter;
    force?: boolean;
    appendToData?: boolean; // добавить данные к текущему массиву
  } = {}) {
    if (!force && this.loading) return;

    this.fetchItemsFilter = filter ?? null;
    this.loading = true;

    const response = await this.service.fetchItems(filter);

    if ('error' in response) {
      this.error = response.error;
    } else {
      const { data, metadata } = response;

      this.data = appendToData ? _.concat(this.data ?? [], data) : data;
      this.metadata = metadata ?? null;
    }

    this.loading = false;
  }

  async saveItem(payload: Payload & { id?: Item['id'] }): Promise<{ success: boolean }> {
    if (this.loading) return ({ success: false });
    this.error = null;
    this.metadata = null;
    this.loading = true;

    const response = await ('id' in payload
      ? this.service.update(payload as Payload & { id: Item['id'] })
      : this.service.save(payload)
    );

    if ('error' in response) this.error = response.error as Error;

    this.loading = false;

    return ({ success: !('error' in response) });
  }

  async deleteItem(id: Item['id']): Promise<boolean> {
    if (this.loading) return false;
    this.error = null;
    this.loading = true;

    const { error } = await this.service.delete(id);

    this.error = error ?? null;
    this.loading = false;

    return !error;
  }
}

export default ListStore;
