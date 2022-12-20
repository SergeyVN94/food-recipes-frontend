import { stringify } from 'query-string';
import _ from 'lodash';

import { Recipe } from 'types/recipe';
import { PaginationFilter, QueryFilter } from 'types/service';
import ListService from 'services/common/ListService';

export type RecipeFilter = {
  ids?: Recipe['id'][];
  slugs?: Recipe['slug'][];
  slug?: Recipe['slug'];
} & PaginationFilter & QueryFilter;

const API_URL = '/api/v1/recipe';

class RecipeService extends ListService<Recipe, RecipeFilter> {
  constructor() {
    super({
      getFullUrl: ({ id, filter } = {}) => {
        if (!_.isNil(id)) return `${API_URL}/${id}`;
        if (!filter) return API_URL;
        if (filter.slug) return `${API_URL}/${filter.slug}`;

        const filterStr = stringify(_.omit(filter, ['slug']), {
          arrayFormat: 'comma',
          skipEmptyString: true,
          skipNull: true,
        });

        return `${API_URL}${filter.slug ? `/${filter.slug}` : ''}${filterStr ? '?' : ''}${filterStr}`;
      },
    });
  }
}

export default RecipeService;
