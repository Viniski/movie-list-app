import { FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import tmdbApi from '@/api';
import { AppError, AppLoader, AppTitle } from '@/components';
import { useQueryStringContext } from '@/contexts/query-string-context';
import { MovieTypeDetails } from '@/types';
import { baseImageUrl } from '@/utils';

type RouteParams = {
  id: string;
};

const imdbUrl = 'https://www.imdb.com';

const Movie = () => {
  const { id } = useParams() as RouteParams;
  const { queryString } = useQueryStringContext();
  const movieQuery = useQuery<MovieTypeDetails>({
    queryKey: ['movie', id],
    queryFn: () => tmdbApi.get(`movie/${id}`).then(({ data }) => data),
  });

  if (movieQuery.isLoading) {
    return <AppLoader />;
  }

  if (movieQuery.isError) {
    return <AppError />;
  }

  const {
    title,
    overview,
    budget,
    revenue,
    release_date: releaseDate,
    imdb_id: imdbId,
    vote_average: voteAverage,
    vote_count: voteCount,
    poster_path: posterPath,
  } = movieQuery.data || {};

  const movieAttributes = [
    { label: 'Budget', value: budget },
    { label: 'Revenue', value: revenue },
    { label: 'ReleaseDate', value: releaseDate },
  ] as const;

  const getValidReleaseDate = (value: string) => (value ? value : <FormattedMessage id="Movie.NoData" />);

  return (
    <div className="mx-auto flex max-w-3xl grow flex-col items-center p-4">
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <AppTitle>{title}</AppTitle>
      </motion.div>
      <div className="my-3 flex flex-col items-center gap-6 md:flex-row">
        <motion.img
          alt={title}
          animate={{ x: 0, opacity: 1 }}
          className="w-full max-w-xs rounded-lg shadow-lg md:max-w-sm"
          initial={{ x: -100, opacity: 0 }}
          src={posterPath ? `${baseImageUrl}${posterPath}` : '/images/default-img.jpg'}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col gap-4 text-center md:text-left"
          initial={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <p className="text-gray-400">{overview}</p>
          {movieAttributes.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 border-b border-gray-300 pb-2 text-sm text-gray-800">
              <span className="font-semibold">
                <FormattedMessage id={`Movie.${label}`} />
              </span>
              <span>{label === 'ReleaseDate' ? getValidReleaseDate(value) : `$ ${value.toLocaleString()}`}</span>
            </div>
          ))}
          <a
            className="font-semibold text-primary-500 no-underline"
            href={imdbId ? `${imdbUrl}/title/${imdbId}` : imdbUrl}
            rel="noreferrer"
            target="_blank"
          >
            <FormattedMessage id="Movie.ImbnLink" />
          </a>
          <div className="flex items-center justify-center gap-2 text-gray-700 md:justify-start">
            <div className="flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-1 text-sm font-semibold text-white">
              <FontAwesomeIcon className="text-white" icon={faStar} />
              <span>{voteAverage.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">
              <FormattedMessage id="Movie.Vote" values={{ count: voteCount }} />
            </span>
          </div>
        </motion.div>
      </div>
      <Link className="mt-8 font-semibold text-primary-500 no-underline" to={`/?${queryString}`}>
        <FormattedMessage id="Movie.BackToDashboard" />
      </Link>
    </div>
  );
};

export default Movie;
