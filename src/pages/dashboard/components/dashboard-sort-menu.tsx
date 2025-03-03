import { MouseEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Menu, MenuClasses, PopoverOrigin } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import { AppButton } from '@/components';
import { sortOptionsValues } from '@/utils';

interface Props {
  anchorEl: HTMLElement | null;
  selectedSortedOption: string;
  onToggle: (event: MouseEvent<HTMLElement>) => void;
  onSort: (option: (typeof sortOptionsValues)[number]) => void;
}

const anchorOrigin: PopoverOrigin = { horizontal: 'right', vertical: 'bottom' };
const transformOrigin: PopoverOrigin = { horizontal: 'right', vertical: 'top' };
const classes: Partial<MenuClasses> = {
  paper:
    'w-[27rem] mt-4 py-6 px-4 border border-[--border-secondary] rounded-lg bg-none bg-[--bg-primary] shadow-[--box-shadow-primary]',
  list: 'flex flex-col gap-2 p-0',
};

const DashboardSortMenu = ({ anchorEl, selectedSortedOption, onToggle, onSort }: Props) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={anchorOrigin}
    classes={classes}
    id="dashboard-sort-menu"
    open={!!anchorEl}
    transformOrigin={transformOrigin}
    onClick={onToggle}
    onClose={onToggle}
  >
    <div className="flex flex-col">
      {sortOptionsValues.map((sortOptionsValue) => (
        <AppButton
          key={sortOptionsValue}
          variant="text"
          className={twMerge(
            'justify-start gap-1 p-4 sm:p-4',
            selectedSortedOption === sortOptionsValue && 'pointer-events-none opacity-30',
          )}
          onClick={() => onSort(sortOptionsValue)}
        >
          <span className="text-gray-700">
            <FormattedMessage id={`Dashboard.Sort.${sortOptionsValue}`} />
          </span>
        </AppButton>
      ))}
    </div>
  </Menu>
);

export default DashboardSortMenu;
