import { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { parse, ParsedQuery, stringify } from 'query-string';
import { MakeSearchParams, SearchParams, UseSearchParamsResult } from 'types/queryString';

export function useSearchParams(): UseSearchParamsResult {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const paramsRef = useRef<ParsedQuery<string | number | boolean>>({});
  paramsRef.current = useMemo(() => parse(search, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'comma',
  }), [search]);

  const setParams = useCallback((args: SearchParams | MakeSearchParams) => {
    const currentParams = _.isFunction(args) ? args(paramsRef.current) : args;
    const newSearch = stringify(currentParams, {
      skipEmptyString: true,
      arrayFormat: 'comma',
    });

    navigate(`${pathname}${newSearch ? '?' : ''}${newSearch}`);
  }, [navigate, paramsRef, pathname]);

  return [paramsRef.current, setParams];
}
