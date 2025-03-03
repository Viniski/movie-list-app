import { useInfiniteQuery } from '@tanstack/react-query';
import { BooleanParam, StringParam, useQueryParams } from 'use-query-params';
import tmdbApi from '@/api';
import { MovieCategoryType, MovieType } from '@/types';

type ApiResponse = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

const genreMap = {
  allMovie: undefined,
  comedy: 35,
  horror: 27,
};

const useMoviesQuery = (category: MovieCategoryType) => {
  const [queryParams] = useQueryParams({
    sort_by: StringParam,
    include_adult: BooleanParam,
    include_video: BooleanParam,
  });

  const { sort_by: sortBy, include_adult: includeAdult, include_video: includeVideo } = queryParams;
  const genre = genreMap[category];

  return useInfiniteQuery<ApiResponse, Error, ApiResponse, (number | string | boolean | null | undefined)[]>({
    queryKey: ['discover', 'movies', genre, sortBy, includeAdult, includeVideo],
    queryFn: ({ pageParam = 1 }) =>
      tmdbApi
        .get('discover/movie', {
          params: {
            sort_by: sortBy,
            include_adult: includeAdult,
            include_video: includeVideo,
            with_genres: genre,
            page: pageParam,
          },
        })
        .then(({ data }) => data),
    getNextPageParam: (lastPage: ApiResponse) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
  });
};

export default useMoviesQuery;
