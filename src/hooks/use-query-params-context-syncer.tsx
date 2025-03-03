import { useEffect } from 'react';
import { BooleanParam, StringParam, useQueryParams } from 'use-query-params';
import { useQueryStringContext } from '@/contexts/query-string-context';

const generateQueryString = (params: Record<string, string | boolean | null | undefined>): string =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value === true ? '1' : value === false ? '0' : String(value))}`,
    )
    .join('&');

const useQueryParamsContextSyncer = () => {
  const { setQueryString } = useQueryStringContext();
  const [queryParams] = useQueryParams({
    sort_by: StringParam,
    include_adult: BooleanParam,
    include_video: BooleanParam,
  });

  useEffect(() => {
    setQueryString(generateQueryString(queryParams));
  }, [queryParams, setQueryString]);
};

export default useQueryParamsContextSyncer;
