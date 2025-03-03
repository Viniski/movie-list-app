import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { FormattedMessage } from 'react-intl';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from '@mui/material';
import { BooleanParam, StringParam, useQueryParams } from 'use-query-params';
import { AppLoader } from '@/components';
import { useMoviesQuery } from '@/hooks';
import { MovieCategoryType, MovieType } from '@/types';
import DashboardMovieCard from './dashboard-movie-card';

interface Props {
  category: MovieCategoryType;
}

const DashboardMovieList = ({ category }: Props) => {
  const [queryParams] = useQueryParams({
    sort_by: StringParam,
    include_adult: BooleanParam,
    include_video: BooleanParam,
  });
  const moviesQuery = useMoviesQuery(category);
  const { ref, inView } = useInView();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [queryParams]);

  const { hasNextPage, fetchNextPage } = moviesQuery;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-semibold md:text-xl">
        <FormattedMessage id={`Dashboard.${category}`} />
      </span>
      <div ref={scrollContainerRef} className="flex gap-5 overflow-auto p-6">
        {moviesQuery.isLoading ? (
          [...Array(10).keys()].map((key) => (
            <Skeleton key={key} className="min-w-[258px] rounded-lg" height={378} width={258} />
          ))
        ) : moviesQuery.isError ? (
          <div className="flex h-[360px] items-center gap-3 text-sm text-error">
            <FontAwesomeIcon icon={faCircleExclamation} size="xl" />
            <FormattedMessage id="Common.Error" />
          </div>
        ) : (
          <div className="flex items-center gap-5">
            {moviesQuery.data?.pages
              .map((item) => item.results)
              .flat()
              .map((result: MovieType) => <DashboardMovieCard key={result.id} result={result} />)}
            <div ref={ref}>{moviesQuery.isFetchingNextPage && <AppLoader />}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMovieList;
