import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { ChildrenProps } from '@/types';

type QueryStringContextType = {
  queryString: string;
  setQueryString: Dispatch<SetStateAction<string>>;
};

const QueryStringContext = createContext<QueryStringContextType | undefined>(undefined);

export const useQueryStringContext = () => {
  const context = useContext(QueryStringContext);
  if (!context) {
    throw new Error('useQueryStringContext must be used within a QueryStringProvider');
  }

  return context;
};

export const QueryStringProvider = ({ children }: ChildrenProps) => {
  const [queryString, setQueryString] = useState('');

  return <QueryStringContext.Provider value={{ queryString, setQueryString }}>{children}</QueryStringContext.Provider>;
};
