import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MovieType } from '@/types';
import { baseImageUrl } from '@/utils';

const DashboardMovieCard = ({ result }: { result: MovieType }) => (
  <Link to={`/movie/${result.id}`}>
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col gap-8 rounded-lg border border-[--border-secondary] p-2"
      initial={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <img
        alt={result.title}
        className="transform rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
        height={360}
        loading="lazy"
        src={result.poster_path ? `${baseImageUrl}${result.poster_path}` : '/images/default-img.jpg'}
        width={240}
      />
    </motion.div>
  </Link>
);

export default DashboardMovieCard;
