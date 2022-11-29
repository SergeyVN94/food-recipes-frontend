import _ from 'lodash';

import { ListItemType, ListFilter, SERVICE_LIST_KEY } from 'types/listService';
import { apiRequest } from 'services/utils';
import { ServiceApiResponseWithData, ServiceApiResponse } from 'services/types';
import { objectKeysToCamelCase, objectKeysToSnakeCase } from 'utils/common';

import {
  getFullUrl,
  mapListKeyToUrl,
  normalizeListItemFunctions,
  listItemToFormDataFunctions,
} from './lib';

class ListService {
  async fetchItems<K extends SERVICE_LIST_KEY>(
    key: K,
    filter: ListFilter<K> = {},
  ): Promise<ServiceApiResponseWithData<ListItemType<K>[], unknown>> {
    const { data, error, response } = await apiRequest({
      method: 'GET',
      url: getFullUrl(key, filter),
    });

    if (error) return ({ error, success: false, response });
    if (!_.isObject(data)) {
      return ({
        response,
        success: false,
        error: new Error('Invalid response data'),
      });
    }

    const hasResults = _.hasIn(data, 'results');
    let results = _.get(data, hasResults ? 'results' : 'data.data', []) as object[];
    // ! если в фильтрах есть id, значит ответ возвращается сразу объектом, а не в поле results.
    if (_.hasIn(filter, 'id')) results = _.castArray(data); // TODO: Сделать нормальный метод для парсинга ответа
    const metadata = hasResults ? _.omit(data, 'results') : undefined;

    if (!_.isArray(results)) {
      return ({
        response,
        success: false,
        error: new Error('Invalid response data'),
      });
    }

    const normalizedList = results.map(i => this.normalizeItemData<K>(key, i));

    return ({
      response,
      metadata,
      success: true,
      data: normalizedList,
    });
  }

  async saveItem<K extends SERVICE_LIST_KEY>(
    key: K,
    item: ListItemType<K>,
  ): Promise<ServiceApiResponseWithData<unknown, unknown>> {
    const itemId = item.id === -1 ? '' : `${item.id}/`;

    const response = await apiRequest({
      method: item.id === -1 ? 'POST' : 'PUT',
      url: `${mapListKeyToUrl[key]}${itemId}`,
      data: this.itemToFormData(key, item),
    });

    return response;
  }

  async deleteItem<K extends SERVICE_LIST_KEY>(
    key: K,
    id: number | string,
  ): Promise<ServiceApiResponse> {
    const response = await apiRequest({
      method: 'DELETE',
      url: `${mapListKeyToUrl[key]}${id}/`,
    });

    return response;
  }

  private itemToFormData<K extends SERVICE_LIST_KEY>(
    key: K,
    item: ListItemType<K>,
  ): FormData {
    const convertFunc = listItemToFormDataFunctions[key];
    if (convertFunc) return convertFunc(item);

    const formData = new FormData();
    _.entries(item).forEach(([k, value]) => {
      formData.set(k, value as unknown as string);
    });

    return formData;
  }

  private normalizeItemData<K extends SERVICE_LIST_KEY>(
    key: K,
    item: unknown,
  ): ListItemType<K> {
    if (_.isObject(item)) {
      const normalizeFunc = normalizeListItemFunctions[key];
      return (normalizeFunc ? normalizeFunc(item) : item as ListItemType<K>);
    }

    return item as ListItemType<K>;
  }
}

export default ListService;
