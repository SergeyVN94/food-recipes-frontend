import { parse } from 'query-string';
import dayjs from 'dayjs';
import axios from 'axios';
import _ from 'lodash';

import { FieldsToCamelCase, FieldsToSnakeCase } from 'types/common';

export const parseUTCDate = (str: string): Date | null => (dayjs(str).toDate());

export const isValidDate = (item: unknown) => (
  item instanceof Date && !_.isNaN(item.getTime())
);

// конвертирует ключи объекта из snake_case в CamelCase
export const objectKeysToCamelCase = <T extends object>(item: T): FieldsToCamelCase<T> => {
  const newItem = {};

  _.keys(item).forEach(key => {
    const newKey = _.isNumber(key) ? key : _.camelCase(key);
    const value = _.get(item, key);
    _.set(newItem, newKey, value);
  });

  return newItem as FieldsToCamelCase<T>;
};

export const objectKeysToSnakeCase = <T extends object>(item: T): FieldsToSnakeCase<T> => {
  const newItem = {};

  // CamelCase to snake_case
  _.entries(item).forEach(([k, value]) => {
    const newKey = _.snakeCase(k);
    _.set(newItem, newKey, value);
  });

  return newItem as FieldsToSnakeCase<T>;
};

export const getSearchParams = () => parse(window.location.search);

export const getRequestCancelToken = () => axios.CancelToken.source();
