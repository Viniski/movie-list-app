import { MouseEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Menu, MenuClasses, PopoverOrigin } from '@mui/material';
import { AppButton } from '@/components';
import { ChildrenProps } from '@/types';

interface Props extends ChildrenProps {
  anchorEl: HTMLElement | null;
  onToggle: (event: MouseEvent<HTMLElement>) => void;
  onApply: (event: MouseEvent<HTMLElement>) => void;
  onClear: (event: MouseEvent<HTMLElement>) => void;
}

const anchorOrigin: PopoverOrigin = { horizontal: 'right', vertical: 'bottom' };
const transformOrigin: PopoverOrigin = { horizontal: 'right', vertical: 'top' };
const classes: Partial<MenuClasses> = {
  paper:
    'w-[27rem] mt-4 py-6 px-4 border border-[--border-secondary] rounded-lg bg-none bg-[--bg-primary] shadow-[--box-shadow-primary]',
  list: 'flex flex-col gap-2 p-0',
};

const DashboardFilterMenu = ({ anchorEl, onToggle, children, onApply, onClear }: Props) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={anchorOrigin}
    classes={classes}
    id="dashboard-filter-menu"
    open={!!anchorEl}
    transformOrigin={transformOrigin}
    onClose={onToggle}
  >
    <div className="mb-2 flex items-center justify-between gap-8">
      <div className="font-bold">
        <FormattedMessage id="Dashboard.Filter.Title" />
      </div>
      <div className="flex gap-6">
        <AppButton className="!p-1" color="error" variant="text" onClick={onClear}>
          <FormattedMessage id="Dashboard.Filter.Clear" />
        </AppButton>
        <AppButton className="!p-1" variant="text" onClick={onApply}>
          <FormattedMessage id="Dashboard.Filter.Apply" />
        </AppButton>
      </div>
    </div>
    {children}
  </Menu>
);

export default DashboardFilterMenu;
