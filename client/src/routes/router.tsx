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
const RegisterEvents = lazy(() => import('@/pages/RegisterEvents'));
const PrequalifierSubmission = lazy(() => import('@/pages/PrequalifierSubmission'));
const Thulira = lazy(() => import('@/pages/Thulira'));
const ThuliraPrequalifierSubmission = lazy(() => import('@/pages/ThuliraPrequalifierSubmission'));
const TechThiral = lazy(() => import('@/pages/TechThiral'));
const Sponsors = lazy(() => import('@/pages/Sponsors'));
const Contact = lazy(() => import('@/pages/Contact'));
const Register = lazy(() => import('@/pages/Register'));
const Login = lazy(() => import('@/pages/Login'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Schedule = lazy(() => import('@/pages/Schedule'));
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
const AdminSignup = lazy(() => import('@/pages/admin/AdminSignup'));
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

/** Full pages behind the participant account gate — everything except Home, auth pages, and the
 * public certificate verification utility. */
function withProtectedSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
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
      { path: 'events/register', element: withSuspense(RegisterEvents) },
      { path: 'events/:eventId/prequalifier', element: withSuspense(PrequalifierSubmission) },
      { path: 'events/:eventId', element: withSuspense(EventDetail) },
      { path: 'thulira', element: withSuspense(Thulira) },
      { path: 'thulira/prequalifier', element: withSuspense(ThuliraPrequalifierSubmission) },
      { path: 'tech-thiral', element: withSuspense(TechThiral) },
      { path: 'sponsors', element: withSuspense(Sponsors) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: 'register', element: withSuspense(Register) },
      { path: 'login', element: withSuspense(Login) },
      { path: 'forgot-password', element: withSuspense(ForgotPassword) },
      { path: 'dashboard', element: withProtectedSuspense(Dashboard) },
      { path: 'schedule', element: withSuspense(Schedule) },
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
    path: '/admin/signup',
    element: withSuspense(AdminSignup),
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
      {
        path: 'events',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute>
              <AdminEvents />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
      {
        path: 'registrations',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute>
              <AdminRegistrations />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
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
      {
        path: 'attendance',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute>
              <AdminAttendance />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
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
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          </Suspense>
        ),
      },
      { path: '*', element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },
]);
