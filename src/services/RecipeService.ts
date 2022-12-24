import { stringify } from 'query-string';
import _ from 'lodash';

import {
  Recipe,
  RecipeFilter,
  RecipeStep,
  RecipePayload,
} from 'types/recipe';
import ListService from 'services/common/ListService';

const API_URL = '/api/v1/recipe';

class RecipeService extends ListService<Recipe, RecipeFilter, RecipePayload> {
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
      normalizeItem: item => {
        if (!_.isObject(item)) throw new TypeError('Некорректный формат данных');

        const normalizedItem = _.entries(item).reduce((acc, [key, value]) => {
          switch (key) {
            case 'images':
              _.set(acc, key, _.toString(value).split(','));
              return acc;
            case 'steps': {
              const steps = JSON.parse(_.toString(value) || '[]');
              if (!_.isArray(steps)) throw new TypeError('Некорректный формат данных');

              _.set(acc, key, (steps as RecipeStep[]).sort((a, b) => a.order - b.order));
              return acc;
            }
            case 'ingredients': {
              const ingredients = JSON.parse(_.toString(value) || '[]');
              if (!_.isArray(ingredients)) throw new TypeError('Некорректный формат данных');
              _.set(acc, key, ingredients);
              return acc;
            }

            default:
              _.set(acc, key, value);
              return acc;
          }
        }, {});

        return normalizedItem as object as Recipe;
      },
      itemToFormData: payload => {
        const formData = new FormData();

        _.entries(payload).forEach(([key, value]) => {
          switch (key) {
            case 'images':
              (value as File[]).forEach(f => formData.append('image', f));
              break;
            case 'steps': {
              const steps = JSON.stringify(value);
              formData.set('steps', steps);
              break;
            }
            case 'ingredients': {
              const steps = JSON.stringify(value);
              formData.set('ingredients', steps);
              break;
            }

            default:
              formData.set(key, value as string);
          }
        });

        return formData;
      },
    });
  }
}

export default RecipeService;
