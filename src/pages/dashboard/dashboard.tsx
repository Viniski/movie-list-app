import { FormattedMessage } from 'react-intl';
import { AppTitle } from '@/components';
import { useQueryParamsContextSyncer } from '@/hooks';
import DashboardFilter from './components/dashboard-filter';
import DashboardMovieList from './components/dashboard-movie-list';
import DashboardSort from './components/dashboard-sort';
import DashboardSortInfo from './components/dashboard-sort-info';

const movieCategories = ['allMovie', 'comedy', 'horror'] as const;

const Dashboard = () => {
  useQueryParamsContextSyncer();

  return (
    <div className="mb-8 flex grow flex-col gap-2">
      <AppTitle className="mx-auto">
        <FormattedMessage id="Dashboard.Title" />
      </AppTitle>
      <div className="my-2 flex flex-wrap items-center justify-between gap-2 border-b border-[--border-secondary] pb-6">
        <DashboardSortInfo />
        <div className="flex grow gap-6 sm:grow-0">
          <DashboardSort />
          <DashboardFilter />
        </div>
      </div>
      {movieCategories.map((category) => (
        <DashboardMovieList key={category} category={category} />
      ))}
    </div>
  );
};

export default Dashboard;
