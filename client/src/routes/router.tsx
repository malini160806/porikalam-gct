import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PageLoader } from '@/components/common/PageLoader';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProtectedAdminRoute } from '@/components/admin/ProtectedAdminRoute';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Events = lazy(() => import('@/pages/Events'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
const Thulira = lazy(() => import('@/pages/Thulira'));
const Participate = lazy(() => import('@/pages/Participate'));
const Sponsors = lazy(() => import('@/pages/Sponsors'));
const Contact = lazy(() => import('@/pages/Contact'));
const Register = lazy(() => import('@/pages/Register'));
const Login = lazy(() => import('@/pages/Login'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Team = lazy(() => import('@/pages/Team'));
const Schedule = lazy(() => import('@/pages/Schedule'));
const Workshops = lazy(() => import('@/pages/Workshops'));
const Accommodation = lazy(() => import('@/pages/Accommodation'));
const Faq = lazy(() => import('@/pages/Faq'));
const Announcements = lazy(() => import('@/pages/Announcements'));
const Resources = lazy(() => import('@/pages/Resources'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Media = lazy(() => import('@/pages/Media'));
const CertificateVerify = lazy(() => import('@/pages/CertificateVerify'));
const VolunteerPortal = lazy(() => import('@/pages/VolunteerPortal'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminEvents = lazy(() => import('@/pages/admin/AdminEvents'));
const AdminRegistrations = lazy(() => import('@/pages/admin/AdminRegistrations'));
const AdminParticipants = lazy(() => import('@/pages/admin/AdminParticipants'));
const AdminAttendance = lazy(() => import('@/pages/admin/AdminAttendance'));
const AdminPayments = lazy(() => import('@/pages/admin/AdminPayments'));
const AdminAdmins = lazy(() => import('@/pages/admin/AdminAdmins'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));

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
      { path: 'thulira', element: withSuspense(Thulira) },
      { path: 'participate', element: withSuspense(Participate) },
      { path: 'sponsors', element: withSuspense(Sponsors) },
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
      { path: 'team', element: withSuspense(Team) },
      { path: 'schedule', element: withSuspense(Schedule) },
      { path: 'workshops', element: withSuspense(Workshops) },
      { path: 'accommodation', element: withSuspense(Accommodation) },
      { path: 'faq', element: withSuspense(Faq) },
      { path: 'announcements', element: withSuspense(Announcements) },
      { path: 'resources', element: withSuspense(Resources) },
      { path: 'leaderboard', element: withSuspense(Leaderboard) },
      { path: 'media', element: withSuspense(Media) },
      { path: 'certificates', element: withSuspense(CertificateVerify) },
      { path: 'volunteer', element: withSuspense(VolunteerPortal) },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
  {
    path: '/admin/login',
    element: withSuspense(AdminLogin),
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: withSuspense(AdminDashboard) },
      { path: 'events', element: withSuspense(AdminEvents) },
      { path: 'registrations', element: withSuspense(AdminRegistrations) },
      {
        path: 'participants',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute requireSuperAdmin>
              <AdminParticipants />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
      { path: 'attendance', element: withSuspense(AdminAttendance) },
      {
        path: 'payments',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute requireSuperAdmin>
              <AdminPayments />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
      {
        path: 'admins',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute requireSuperAdmin>
              <AdminAdmins />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
      { path: 'settings', element: withSuspense(AdminSettings) },
      { path: '*', element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },
]);
