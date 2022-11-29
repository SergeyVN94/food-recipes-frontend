import { ParsedQuery } from 'query-string';

export type SearchParams = ParsedQuery<string | number | boolean>;
export type MakeSearchParams = (currentParams: SearchParams) => SearchParams;
export type UseSearchParamsResult = [SearchParams, (args: SearchParams | MakeSearchParams) => void];
