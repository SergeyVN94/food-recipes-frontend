import {
  recipeService,
  authenticationService,
  recipeIngredientService,
  userService,
} from 'services';
import { User } from 'types/user';

import {
  Recipe,
  RecipeFilter,
  RecipeIngredient,
  RecipeIngredientFilter,
} from 'types/recipe';
import ApiDataStore from './ApiDataStore';

import AuthenticationStore from './AuthenticationStore';
import ListStore from './ListStore';

class RootStore {
  public readonly authenticationStore: AuthenticationStore;
  public readonly recipesStore: ListStore<Recipe, RecipeFilter>;
  public readonly recipeIngredientsStore: ListStore<RecipeIngredient, RecipeIngredientFilter>;
  public readonly userStore: ApiDataStore<User>;

  constructor() {
    this.authenticationStore = new AuthenticationStore(this, authenticationService);
    this.recipesStore = new ListStore(this, recipeService);
    this.recipeIngredientsStore = new ListStore(this, recipeIngredientService);
    this.userStore = new ApiDataStore<User>(this, userService);
  }
}

export default RootStore;
