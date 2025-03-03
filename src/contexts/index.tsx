import { QueryParamOptions, QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import IntlProvider from '@/contexts/intl-provider';
import QueryClientProvider from '@/contexts/query-client-provider';
import ThemeProvider from '@/contexts/theme-provider';
import { ChildrenProps } from '@/types';
import { QueryStringProvider } from './query-string-context';

const QueryParamProviderOptions: QueryParamOptions = { updateType: 'replaceIn' };

const AppContextsProvider = ({ children }: ChildrenProps) => (
  <QueryStringProvider>
    <QueryParamProvider adapter={ReactRouter6Adapter} options={QueryParamProviderOptions}>
      <IntlProvider>
        <ThemeProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </IntlProvider>
    </QueryParamProvider>
  </QueryStringProvider>
);

export default AppContextsProvider;
