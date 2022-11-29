import { Image } from './image';

export type RecipeIngredient = {
  id: number;
  name: string;
  description: string;
  images?: Image[];
};

export type RecipeStep = {
  description: string;
  images?: Image[];
  ingredients?: RecipeIngredient['id'][];
  step: number;
};

export type Recipe = {
  id: number;
  title: string;
  description: string;
  images?: Image[];
  steps: RecipeStep[];
  ingredients: RecipeIngredient['id'][];
};
