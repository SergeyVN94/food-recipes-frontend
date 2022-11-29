import { AnyFilter, PaginationFilter, QueryFilter } from './service';
import { Recipe, RecipeIngredient } from './recipe';

export enum SERVICE_LIST_KEY {
  RECIPE = 'recipe',
  RECIPE_INGREDIENT = 'recipe-ingredient',
}

export type ListItemType<K extends SERVICE_LIST_KEY> = {
  [SERVICE_LIST_KEY.RECIPE]: Recipe;
  [SERVICE_LIST_KEY.RECIPE_INGREDIENT]: RecipeIngredient;
}[K];

export type ListFilter<K extends SERVICE_LIST_KEY> = {
  [SERVICE_LIST_KEY.RECIPE]: AnyFilter
  & PaginationFilter
  & { ids?: Recipe['id'][] }
  & QueryFilter;
  [SERVICE_LIST_KEY.RECIPE_INGREDIENT]: AnyFilter
  & PaginationFilter
  & { ids?: RecipeIngredient['id'][] }
  & QueryFilter;
}[K];
