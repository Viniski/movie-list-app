import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLoader } from './components';
import { useScrollToTop } from './hooks';

const Main = lazy(() => import('@/layout'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Movie = lazy(() => import('@/pages/movie'));

const App = () => {
  useScrollToTop();

  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<Main />}>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Movie />} path="/movie/:id" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
