import { recipeService, authenticationService, recipeIngredientService } from 'services';

import {
  Recipe,
  RecipeFilter,
  RecipeIngredient,
  RecipeIngredientFilter,
} from 'types/recipe';

import AuthenticationStore from './AuthenticationStore';
import ListStore from './ListStore';

class RootStore {
  public readonly authenticationStore: AuthenticationStore;
  public readonly recipesStore: ListStore<Recipe, RecipeFilter>;
  public readonly recipeIngredientsStore: ListStore<RecipeIngredient, RecipeIngredientFilter>;

  constructor() {
    this.authenticationStore = new AuthenticationStore(this, authenticationService);
    this.recipesStore = new ListStore(this, recipeService);
    this.recipeIngredientsStore = new ListStore(this, recipeIngredientService);
  }
}

export default RootStore;
