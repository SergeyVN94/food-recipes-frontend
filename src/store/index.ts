import { configure } from 'mobx';

import RootStore from './RootStore';

export const rootStore = new RootStore();
export const {
  recipesStore,
  authenticationStore,
  recipeIngredientsStore,
} = rootStore;

export const initMobx = () => {
  const t = setTimeout(() => {
    configure({
      enforceActions: 'never',
      reactionScheduler: f => setTimeout(f),
    });
    clearTimeout(t);
  });
};
