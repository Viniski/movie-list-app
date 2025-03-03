import { FormattedMessage } from 'react-intl';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StringParam, useQueryParams } from 'use-query-params';
import { AppButton } from '@/components';
import { useAnchorElement } from '@/hooks';
import DashboardSortMenu from './dashboard-sort-menu';

const DashboardSort = () => {
  const { anchorEl, onToggle } = useAnchorElement();
  const [queryParams, setQueryParams] = useQueryParams({ sort_by: StringParam });

  return (
    <>
      <DashboardSortMenu
        anchorEl={anchorEl}
        selectedSortedOption={queryParams.sort_by || 'popularity.desc'}
        onSort={(option) => setQueryParams((prev) => ({ ...prev, sort_by: option }))}
        onToggle={onToggle}
      />
      <AppButton
        className="grow sm:grow-0"
        startIcon={<FontAwesomeIcon icon={faArrowsUpDown} />}
        variant="outlined"
        onClick={onToggle}
      >
        <FormattedMessage id="Dashboard.SortBy" />
      </AppButton>
    </>
  );
};

export default DashboardSort;
