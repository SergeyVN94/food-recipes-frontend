import { Image } from './image';
import { PaginationFilter, QueryFilter } from './service';

export type RecipeIngredient = {
  id: number;
  slug: string;
  name: string;
  description: string;
  images?: Image[];
};

export type RecipeStep = {
  description: string;
  images?: Image[];
  step: number;
};

export type RecipeIngredientItem = {
  ingredientId: RecipeIngredient['id'];
  amount: string; // количество ингредиента
};

export type Recipe = {
  id: number;
  slug: string;
  title: string;
  description: string;
  images?: Image[];
  steps: RecipeStep[];
  ingredients: RecipeIngredientItem[];
};

export type RecipeIngredientFilter = {
  ids?: RecipeIngredient['id'][]
} & PaginationFilter & QueryFilter;

export type RecipeFilter = {
  ids?: Recipe['id'][];
  slugs?: Recipe['slug'][];
} & PaginationFilter & QueryFilter;
