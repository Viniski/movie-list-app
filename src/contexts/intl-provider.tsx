import { IntlProvider as OrgIntlProvider } from 'react-intl';
import plMessages from '@/locales/pl.json';
import { ChildrenProps } from '@/types';

const IntlProvider = ({ children }: ChildrenProps) => (
  <OrgIntlProvider key="pl" locale="pl" messages={plMessages}>
    {children}
  </OrgIntlProvider>
);

export default IntlProvider;
