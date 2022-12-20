import { stringify } from 'query-string';
import _ from 'lodash';

import { Recipe, RecipeFilter } from 'types/recipe';
import ListService from 'services/common/ListService';

const API_URL = '/api/v1/recipe';

class RecipeService extends ListService<Recipe, RecipeFilter> {
  constructor() {
    super({
      getFullUrl: ({ id, filter } = {}) => {
        if (!_.isNil(id)) return `${API_URL}/${id}`;
        if (!filter) return API_URL;

        const filterStr = stringify(_.omit(filter, ['slug']), {
          arrayFormat: 'comma',
          skipEmptyString: true,
          skipNull: true,
        });

        return `${API_URL}${filterStr ? '?' : ''}${filterStr}`;
      },
    });
  }
}

export default RecipeService;
