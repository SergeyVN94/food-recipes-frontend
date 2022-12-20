import _ from 'lodash';

import { IApiDataService } from 'types/service';

import { apiRequest } from './utils';

class ApiDataService<T> implements IApiDataService<T> {
  private readonly apiUrl: string;
  private readonly normalizeDate?: (item: unknown) => T;
  private readonly itemToFormDate?: (item: T) => FormData;

  constructor(config: {
    apiUrl: string;
    normalizeDate?: (item: unknown) => T; // нормализация данных с сервера
    itemToFormDate?: (item: T) => FormData; // конвертация перед отправкой на сервер
  }) {
    const { apiUrl, normalizeDate, itemToFormDate } = config;

    this.apiUrl = apiUrl;
    this.normalizeDate = normalizeDate;
    this.itemToFormDate = itemToFormDate;
  }

  async fetch() {
    const { data, error } = await apiRequest({
      method: 'GET',
      url: this.apiUrl,
    });

    if (error) return ({ error });
    return ({ data: this.normalizeDate ? this.normalizeDate(data) : data as T });
  }

  async update(item: T) {
    let formData: FormData;

    if (this.itemToFormDate) {
      formData = this.itemToFormDate(item);
    } else {
      formData = new FormData();

      if (_.isObject(item)) {
        _.entries(item).forEach(([key, value]) => {
          formData.set(key, value as unknown as string);
        });
      } else {
        formData.set('data', String(item));
      }
    }

    const response = await apiRequest({
      method: 'POST',
      url: this.apiUrl,
      data: formData,
    });

    if (response.data) {
      return ({
        item: this.normalizeDate
          ? this.normalizeDate(response.data)
          : response.data as T,
      });
    }

    return ({ error: response.error ?? new Error('unknown error') });
  }
}

export default ApiDataService;
