import { SERVICE_LIST_KEY } from 'types/listService';
import { SERVICE_API_DATA_KEY } from 'types/apiDataService';
import { recipeService, recipeIngredientService, apiDataService } from 'services';

import AuthenticationStore from './AuthenticationStore';
import ListStore from './ListStore';
import ApiDataStore from './ApiDataStore';

class RootStore {
  public readonly authenticationStore: AuthenticationStore;
  public readonly generalApiDataStore: ApiDataStore<SERVICE_API_DATA_KEY.GENERAL>;
  public readonly recipesStore: ListStore<SERVICE_LIST_KEY.RECIPE>;
  public readonly recipeIngredientsStore: ListStore<SERVICE_LIST_KEY.RECIPE_INGREDIENT>;

  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
    this.generalApiDataStore = new ApiDataStore(this, SERVICE_API_DATA_KEY.GENERAL, apiDataService);
    this.recipesStore = new ListStore(this, SERVICE_LIST_KEY.RECIPE, recipeService);
    // eslint-disable-next-line max-len
    this.recipeIngredientsStore = new ListStore(this, SERVICE_LIST_KEY.RECIPE_INGREDIENT, recipeIngredientService);
  }
}

export default RootStore;
