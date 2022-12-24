import _ from 'lodash';

import { IListService } from 'types/service';

import { apiRequest as apiRequestDefault } from './utils';
import { ApiRequestFunc } from './types';

class ListService<
  Item extends { id: unknown },
  Filter,
  Payload = Omit<Item, 'id'>,
> implements IListService<Item, Filter, Payload> {
  protected readonly apiRequest: ApiRequestFunc;
  protected readonly getFullUrl: (args?: { id?: Item['id'], filter?: Filter }) => string;
  protected readonly normalizeItem?: (item: unknown) => Item;
  protected readonly itemToFormData?: (payload: Payload | (Payload & { id: Item['id'] })) => FormData;

  constructor(config: {
    getFullUrl: (args?: { id?: Item['id'], filter?: Filter }) => string; // url вместе с фильтрами для получения списка
    apiRequest?: ApiRequestFunc;
    normalizeItem?: (item: unknown) => Item; // нормализация элементов списка с сервера
    itemToFormData?: (payload: Payload | (Payload & { id: Item['id'] })) => FormData; // конвертация в данные формы.
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

    _.bindAll(this, ['normalizeItemData', 'convertItemToFormData']);
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

    const results = _.get(data, 'results');
    const metadata = _.omit(data, 'results');

    if (!_.isArray(results)) return ({ error: new Error('Invalid response data') });

    try {
      return ({
        metadata,
        data: (results as unknown[]).map(this.normalizeItemData),
      });
    } catch (err) {
      return ({ error: err as Error });
    }
  }

  async save(payload: Payload) {
    const { error, data } = await this.apiRequest({
      method: 'POST',
      url: this.getFullUrl(),
      data: this.convertItemToFormData(payload),
    });

    return ({ error: error as Error, data: this.normalizeItemData(data) });
  }

  async update(payload: Payload & { id: Item['id'] }) {
    const { data, error } = await this.apiRequest({
      method: 'PUT',
      url: this.getFullUrl({ id: payload.id }),
      data: this.convertItemToFormData(payload),
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

  private convertItemToFormData(payload: Payload): FormData {
    if (this.itemToFormData) return this.itemToFormData(payload);

    const formData = new FormData();

    if (_.isObject(payload)) {
      _.entries(payload).forEach(([k, value]) => {
        formData.set(k, value as unknown as string);
      });
    } else {
      formData.set('payload', _.toString(payload));
    }

    return formData;
  }

  private normalizeItemData(item: unknown): Item {
    return this.normalizeItem ? this.normalizeItem(item) : item as Item;
  }
}

export default ListService;
