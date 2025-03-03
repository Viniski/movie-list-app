import { forwardRef } from 'react';
import { Button, ButtonClasses , ButtonProps } from '@mui/material';

const classes: Partial<ButtonClasses> = {
  root: 'py-3 rounded-lg text-sm normal-case shadow-none px-9 !text-base font-semibold',
  contained: 'border border-transparent',
};

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(({ loading, children, ...props }, ref) => (
  <Button ref={ref} classes={classes} loading={loading} variant="contained" {...props}>
    {children}
  </Button>
));

export default AppButton;
