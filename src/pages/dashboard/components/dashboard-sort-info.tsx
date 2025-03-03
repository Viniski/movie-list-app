import { FormattedMessage } from 'react-intl';
import { StringParam, useQueryParams } from 'use-query-params';
import { sortOptionsValues } from '@/utils';

const DashboardSortInfo = () => {
  const [queryParams] = useQueryParams({ sort_by: StringParam });

  return (
    <span className="text-gray-500">
      <FormattedMessage id="Dashboard.SortedBy" />{' '}
      <FormattedMessage
        id={`Dashboard.Sort.${(queryParams.sort_by as (typeof sortOptionsValues)[number]) || 'popularity.desc'}`}
      />
    </span>
  );
};

export default DashboardSortInfo;
