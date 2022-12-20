import _ from 'lodash';

import { IListService } from 'types/service';

import { apiRequest as apiRequestDefault } from './utils';
import { ApiRequestFunc } from './types';

class ListService<
  Item extends { id: unknown },
  Filter extends object,
> implements IListService<Item, Filter> {
  private readonly apiRequest: ApiRequestFunc;
  private readonly getFullUrl: (args?: { id?: Item['id'], filter?: Filter }) => string;
  private readonly normalizeItem?: (item: unknown) => Item;
  private readonly itemToFormData?: (item: Item) => FormData;

  constructor(config: {
    getFullUrl: (args?: { id?: Item['id'], filter?: Filter }) => string; // url вместе с фильтрами для получения списка
    apiRequest?: ApiRequestFunc;
    normalizeItem?: (item: unknown) => Item; // нормализация элементов списка с сервера
    itemToFormData?: (item: Item) => FormData; // конвертация в данные формы.
  }) {
    const {
      getFullUrl,
      normalizeItem,
      itemToFormData,
      apiRequest = apiRequestDefault,
    } = config;

    this.getFullUrl = getFullUrl;
    this.apiRequest = apiRequest;
    this.normalizeItem = normalizeItem;
    this.itemToFormData = itemToFormData;

    // bind methods
    _.entries(this).forEach(([k, value]) => {
      if (_.isFunction(value) && _.has(this, k)) {
        _.set(this, k, value.bind(this));
      }
    });
  }

  async fetchItems(filter: Filter) {
    const { data, error } = await this.apiRequest({
      method: 'GET',
      url: this.getFullUrl({ filter }),
    });

    if (error) return ({ error });
    if (!_.isObject(data)) {
      return ({ error: new Error('Invalid response data') });
    }

    const results = _.hasIn(data, 'results');
    const metadata = _.omit(data, 'results');

    if (!_.isArray(results)) return ({ error: new Error('Invalid response data') });

    try {
      return ({
        metadata,
        data: results.map(this.normalizeItemData),
      });
    } catch (err) {
      return ({ error: err as Error });
    }
  }

  async save(item: Item & { id: null }) {
    const { error, data } = await this.apiRequest({
      method: 'POST',
      url: this.getFullUrl(),
      data: this.convertItemToFormData(item),
    });

    return ({ error: error as Error, data: this.normalizeItemData(data) });
  }

  async update(item: Item) {
    const { data, error } = await this.apiRequest({
      method: 'PUT',
      url: this.getFullUrl({ id: item.id }),
      data: this.convertItemToFormData(item),
    });

    return ({ error: error as Error, data: this.normalizeItemData(data) });
  }

  async delete(id: Item['id']) {
    const response = await this.apiRequest({
      method: 'DELETE',
      url: this.getFullUrl({ id }),
    });

    return response;
  }

  private convertItemToFormData(item: Item): FormData {
    if (this.itemToFormData) return this.itemToFormData(item);

    const formData = new FormData();
    _.entries(item).forEach(([k, value]) => {
      formData.set(k, value as unknown as string);
    });

    return formData;
  }

  private normalizeItemData(item: unknown): Item {
    return this.normalizeItem ? this.normalizeItem(item) : item as Item;
  }
}

export default ListService;
