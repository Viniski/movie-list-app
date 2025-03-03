import { FormattedMessage } from 'react-intl';
import { Outlet } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';

const Layout = () => (
  <div className="flex h-full flex-col bg-[--bg-secondary]">
    <header className="flex min-h-[--app-header-height] items-center justify-between border-b border-b-[--border-primary] px-6 md:px-[1.875rem]">
      <img alt="" height={32} src="/images/tmdb.jpg" />
      <FontAwesomeIcon className="size-6 text-primary" icon={faUser} />
    </header>
    <div className="flex h-full w-full flex-col overflow-auto" id="wrapper">
      <main className="flex grow-[1] flex-col px-6 py-4 md:px-8 md:py-6">
        <Outlet />
      </main>
      <footer className="flex justify-end gap-2 border-t border-[--border-secondary] p-4 text-xs md:gap-6 md:px-8 md:text-sm">
        <a
          className="text-gray-500 no-underline"
          href="https://www.linkedin.com/in/m--winiarski/"
          rel="noreferrer"
          target="_blank"
        >
          <FormattedMessage id="Footer.Title" values={{ currentYear: dayjs().year() }} />
        </a>
      </footer>
    </div>
  </div>
);

export default Layout;
