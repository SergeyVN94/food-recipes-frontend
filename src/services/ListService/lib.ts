import { stringify } from 'query-string';
import _ from 'lodash';

import { ListItemType, SERVICE_LIST_KEY, ListFilter } from 'types/listService';

export const mapListKeyToUrl: { [key in SERVICE_LIST_KEY]: string } = {
  [SERVICE_LIST_KEY.RECIPE]: '/api/v1/recipe/',
  [SERVICE_LIST_KEY.RECIPE_INGREDIENT]: '/api/v1/recipe-ingredient/',
};

export const normalizeListItemFunctions: {
  // ! все поля item уже в camelCase
  [key in SERVICE_LIST_KEY]?: (item: object) => ListItemType<key>;
} = {};

export const listItemToFormDataFunctions: {
  [key in SERVICE_LIST_KEY]?: (item: ListItemType<key>) => FormData
} = {};

const listItemUrlCreator: {
  [key in SERVICE_LIST_KEY]?: (filter: ListFilter<key>) => string
} = {
  [SERVICE_LIST_KEY.RECIPE]: filter => {
    const baseUrl = mapListKeyToUrl[SERVICE_LIST_KEY.RECIPE];
    const otherPaths = [];

    if (filter.slug) otherPaths.push(filter.slug);

    const filterStr = stringify(_.omit(filter, ['slug']), {
      arrayFormat: 'comma',
      skipEmptyString: true,
      skipNull: true,
    });

    return `${baseUrl}${otherPaths.join('/')}${filterStr ? '?' : ''}${filterStr}`;
  },
};

export const getFullUrl = (
  key: SERVICE_LIST_KEY,
  filter?: ListFilter<typeof key>,
): string => {
  const urlMakeFunc = listItemUrlCreator[key];

  return (urlMakeFunc && filter) ? urlMakeFunc(filter) : mapListKeyToUrl[key];
};
