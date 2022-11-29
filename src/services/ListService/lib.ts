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

export const getFullUrl = (
  key: SERVICE_LIST_KEY,
  filter?: ListFilter<typeof key>,
): string => mapListKeyToUrl[key];
