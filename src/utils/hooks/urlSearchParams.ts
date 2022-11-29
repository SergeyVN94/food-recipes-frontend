import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { parse, stringify } from 'query-string';
import { MakeSearchParams, SearchParams, UseSearchParamsResult } from 'types/queryString';

export function useSearchParams(): UseSearchParamsResult {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const params = useMemo(() => parse(search, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'comma',
  }), [search]);

  const setParams = useCallback((args: SearchParams | MakeSearchParams) => {
    const currentParams = _.isFunction(args) ? args(params) : args;
    const newSearch = stringify(currentParams, {
      skipEmptyString: true,
      arrayFormat: 'comma', // '&foo=1,2,3' -> {foo: ['1', '2', '3']}
    });

    navigate(`${pathname}${newSearch ? '?' : ''}${newSearch}`);
  }, [navigate, pathname, params, pathname]);

  return [params, setParams];
}
