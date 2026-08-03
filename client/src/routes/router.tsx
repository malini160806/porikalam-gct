import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { PageLoader } from '@/components/common/PageLoader';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Events = lazy(() => import('@/pages/Events'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
const Expo = lazy(() => import('@/pages/Expo'));
const Participate = lazy(() => import('@/pages/Participate'));
const Sponsors = lazy(() => import('@/pages/Sponsors'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Contact = lazy(() => import('@/pages/Contact'));
const Register = lazy(() => import('@/pages/Register'));
const Login = lazy(() => import('@/pages/Login'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Legacy = lazy(() => import('@/pages/Legacy'));
const Team = lazy(() => import('@/pages/Team'));
const Schedule = lazy(() => import('@/pages/Schedule'));
const Departments = lazy(() => import('@/pages/Departments'));
const DepartmentDetail = lazy(() => import('@/pages/DepartmentDetail'));
const Workshops = lazy(() => import('@/pages/Workshops'));
const Accommodation = lazy(() => import('@/pages/Accommodation'));
const Faq = lazy(() => import('@/pages/Faq'));
const Announcements = lazy(() => import('@/pages/Announcements'));
const Resources = lazy(() => import('@/pages/Resources'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Media = lazy(() => import('@/pages/Media'));
const Partners = lazy(() => import('@/pages/Partners'));
const CertificateVerify = lazy(() => import('@/pages/CertificateVerify'));
const VolunteerPortal = lazy(() => import('@/pages/VolunteerPortal'));
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
      { path: 'expo', element: withSuspense(Expo) },
      { path: 'participate', element: withSuspense(Participate) },
      { path: 'sponsors', element: withSuspense(Sponsors) },
      { path: 'gallery', element: withSuspense(Gallery) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: 'register', element: withSuspense(Register) },
      { path: 'login', element: withSuspense(Login) },
      { path: 'forgot-password', element: withSuspense(ForgotPassword) },
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
      { path: 'legacy', element: withSuspense(Legacy) },
      { path: 'team', element: withSuspense(Team) },
      { path: 'schedule', element: withSuspense(Schedule) },
      { path: 'departments', element: withSuspense(Departments) },
      { path: 'departments/:slug', element: withSuspense(DepartmentDetail) },
      { path: 'workshops', element: withSuspense(Workshops) },
      { path: 'accommodation', element: withSuspense(Accommodation) },
      { path: 'faq', element: withSuspense(Faq) },
      { path: 'announcements', element: withSuspense(Announcements) },
      { path: 'resources', element: withSuspense(Resources) },
      { path: 'leaderboard', element: withSuspense(Leaderboard) },
      { path: 'media', element: withSuspense(Media) },
      { path: 'partners', element: withSuspense(Partners) },
      { path: 'certificates', element: withSuspense(CertificateVerify) },
      { path: 'volunteer', element: withSuspense(VolunteerPortal) },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
]);
