import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/types';

interface Props extends ChildrenProps {
  className?: string;
}

const AppTitle = ({ children, className }: Props) => (
  <h1 className={twMerge('text-xl font-bold md:text-2xl', className)}>{children}</h1>
);

export default AppTitle;
