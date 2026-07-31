import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { PageLoader } from '@/components/common/PageLoader';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Events = lazy(() => import('@/pages/Events'));
const Participate = lazy(() => import('@/pages/Participate'));
const Sponsors = lazy(() => import('@/pages/Sponsors'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'about', element: withSuspense(About) },
      { path: 'events', element: withSuspense(Events) },
      { path: 'participate', element: withSuspense(Participate) },
      { path: 'sponsors', element: withSuspense(Sponsors) },
      { path: 'gallery', element: withSuspense(Gallery) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
]);
