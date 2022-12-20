import AuthenticationService from './AuthenticationService';
import RecipeIngredientService from './RecipeIngredientService';
import RecipeService from './RecipeService';
import UserService from './UserService';

export { default as AuthenticationService } from './AuthenticationService';
export { default as RecipeIngredientService } from './RecipeIngredientService';
export { default as RecipeService } from './RecipeService';
export { default as UserService } from './UserService';

export const authenticationService = new AuthenticationService();
export const recipeService = new RecipeService();
export const recipeIngredientService = new RecipeIngredientService();
export const userService = new UserService();
