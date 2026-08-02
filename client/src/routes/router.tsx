import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { PageLoader } from '@/components/common/PageLoader';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Events = lazy(() => import('@/pages/Events'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
const Participate = lazy(() => import('@/pages/Participate'));
const Sponsors = lazy(() => import('@/pages/Sponsors'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Contact = lazy(() => import('@/pages/Contact'));
const Register = lazy(() => import('@/pages/Register'));
const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
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
      { path: 'events/:eventId', element: withSuspense(EventDetail) },
      { path: 'participate', element: withSuspense(Participate) },
      { path: 'sponsors', element: withSuspense(Sponsors) },
      { path: 'gallery', element: withSuspense(Gallery) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: 'register', element: withSuspense(Register) },
      { path: 'login', element: withSuspense(Login) },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
]);
