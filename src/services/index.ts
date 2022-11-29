import AuthenticationService from './AuthenticationService';
// eslint-disable-next-line import/no-named-as-default
import ApiDataService from './ApiDataService/ApiDataService';
import ListService from './ListService/ListService';

export { default as AuthenticationService } from './AuthenticationService';
export { default as ApiDataService } from './ApiDataService/ApiDataService';
export { default as ListService } from './ListService/ListService';

export const authenticationService = new AuthenticationService();
export const apiDataService = new ApiDataService();
export const listService = new ListService();
