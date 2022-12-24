import _ from 'lodash';

import { IApiDataService } from 'types/service';

import { apiRequest } from './utils';

class ApiDataService<T, P = T> implements IApiDataService<T, P> {
  protected readonly apiUrl: string;
  protected readonly normalizeDate?: (item: unknown) => T;
  protected readonly itemToFormDate?: (item: P) => FormData;

  constructor(config: {
    apiUrl: string;
    normalizeDate?: (item: unknown) => T; // нормализация данных с сервера
    itemToFormDate?: (item: P) => FormData; // конвертация перед отправкой на сервер
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

  async update(payload: P) {
    let formData: FormData;

    if (this.itemToFormDate) {
      formData = this.itemToFormDate(payload);
    } else {
      formData = new FormData();

      if (_.isObject(payload)) {
        _.entries(payload).forEach(([key, value]) => {
          formData.set(key, value as unknown as string);
        });
      } else {
        formData.set('payload', String(payload));
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
