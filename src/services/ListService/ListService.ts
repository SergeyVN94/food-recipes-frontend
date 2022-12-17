import _ from 'lodash';

import { ListItemType, ListFilter, SERVICE_LIST_KEY } from 'types/listService';
import { apiRequest } from 'services/utils';
import { ServiceApiResponseWithData, ServiceApiResponse } from 'services/types';

import {
  getFullUrl,
  mapListKeyToUrl,
  normalizeListItemFunctions,
  listItemToFormDataFunctions,
} from './lib';

class ListService<K extends SERVICE_LIST_KEY> {
  constructor(public readonly key: K) {
    _.entries(this).forEach(([k, value]) => {
      if (_.isFunction(value) && _.has(this, key)) {
        _.set(this, k, value.bind(this));
      }
    });
  }

  async fetchItems(
    filter: ListFilter<K> = {},
  ): Promise<ServiceApiResponseWithData<ListItemType<K>[], unknown>> {
    const { data, error } = await apiRequest({
      method: 'GET',
      url: getFullUrl(this.key, filter),
    });

    if (error) return ({ error, success: false });
    if (!_.isObject(data)) {
      return ({
        success: false,
        error: new Error('Invalid response data'),
      });
    }

    const results = _.hasIn(data, 'results');
    const metadata = results ? _.omit(data, 'results') : undefined;

    if (!_.isArray(results)) {
      return ({
        success: false,
        error: new Error('Invalid response data'),
      });
    }

    const normalizedList = results.map(this.normalizeItemData);

    return ({
      metadata,
      success: true,
      data: normalizedList,
    });
  }

  async saveItem(
    item: ListItemType<K>,
  ): Promise<ServiceApiResponseWithData<unknown, unknown>> {
    const itemId = item.id === -1 ? '' : `${item.id}/`;

    const response = await apiRequest({
      method: item.id === -1 ? 'POST' : 'PUT',
      url: `${mapListKeyToUrl[this.key]}${itemId}`,
      data: this.itemToFormData(item),
    });

    return response;
  }

  async deleteItem(id: number | string): Promise<ServiceApiResponse> {
    const response = await apiRequest({
      method: 'DELETE',
      url: `${mapListKeyToUrl[this.key]}${id}/`,
    });

    return response;
  }

  private itemToFormData(item: ListItemType<K>): FormData {
    const convertFunc = listItemToFormDataFunctions[this.key];
    if (convertFunc) return convertFunc(item);

    const formData = new FormData();
    _.entries(item).forEach(([k, value]) => {
      formData.set(k, value as unknown as string);
    });

    return formData;
  }

  private normalizeItemData(item: unknown): ListItemType<K> {
    if (_.isObject(item)) {
      const normalizeFunc = normalizeListItemFunctions[this.key];
      return (normalizeFunc ? normalizeFunc(item) : item as ListItemType<K>);
    }

    return item as ListItemType<K>;
  }
}

export default ListService;
