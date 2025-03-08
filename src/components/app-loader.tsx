import { CircularProgress } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const AppLoader = ({ className }: { className?: string }) => (
  <div className={twMerge('flex h-full w-full items-center justify-center', className)}>
    <CircularProgress size={64} />
  </div>
);

export default AppLoader;
