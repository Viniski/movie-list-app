import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControlLabel } from '@mui/material';
import { BooleanParam, useQueryParams } from 'use-query-params';
import { AppButton, AppCheckbox } from '@/components';
import { useAnchorElement } from '@/hooks';
import DashboardFilterMenu from './dashboard-filter-menu';

const roles = ['include_adult', 'include_video'] as const;

const DashboardFilter = () => {
  const intl = useIntl();
  const { anchorEl, onToggle } = useAnchorElement();
  const [queryParams, setQueryParams] = useQueryParams({
    include_adult: BooleanParam,
    include_video: BooleanParam,
  });

  const [filterState, setFilterState] = useState({
    include_adult: queryParams.include_adult,
    include_video: queryParams.include_video,
  });

  const handleCheckboxChange =
    (role: (typeof roles)[number]) => (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) =>
      setFilterState((prev) => ({ ...prev, [role]: isChecked }));

  return (
    <>
      <DashboardFilterMenu
        anchorEl={anchorEl}
        onApply={(event) => {
          setQueryParams((prev) => ({ ...prev, ...filterState }));
          onToggle(event);
        }}
        onClear={(event) => {
          setQueryParams((prev) => ({ ...prev, include_adult: false, include_video: false }));
          onToggle(event);
        }}
        onToggle={(event) => {
          setFilterState({ include_adult: queryParams.include_adult, include_video: queryParams.include_video });
          onToggle(event);
        }}
      >
        {roles.map((role) => (
          <FormControlLabel
            key={role}
            control={<AppCheckbox checked={!!filterState[role]} onChange={handleCheckboxChange(role)} />}
            label={intl.$t({ id: `Dashboard.Filter.${role}` })}
          />
        ))}
      </DashboardFilterMenu>
      <AppButton
        className="grow sm:grow-0"
        startIcon={<FontAwesomeIcon icon={faFilter} />}
        variant="outlined"
        onClick={onToggle}
      >
        <FormattedMessage id="Dashboard.Filter.Add" />
      </AppButton>
    </>
  );
};

export default DashboardFilter;
