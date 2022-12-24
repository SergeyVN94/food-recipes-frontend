import { Recipe, RecipePayload } from 'types/recipe';

export interface IRecipeFormProps {
  recipe?: Recipe;
  onSubmit: (payload: RecipePayload) => void;
}
