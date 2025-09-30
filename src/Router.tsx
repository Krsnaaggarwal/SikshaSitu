import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

// Pages
import HomePage from '@/components/pages/HomePage';
import AssessmentsPage from '@/components/pages/AssessmentsPage';
import CoursesPage from '@/components/pages/CoursesPage';
import CollegesPage from '@/components/pages/CollegesPage';
import JobsPage from '@/components/pages/JobsPage';
import ProfilePage from '@/components/pages/ProfilePage';
import InterviewPrepPage from '@/components/pages/InterviewPrepPage';
import EmailTemplatesPage from '@/components/pages/EmailTemplatesPage';
import EngineeringExamsPage from '@/components/pages/EngineeringExamsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
      },
      {
        path: "assessments",
        element: <AssessmentsPage />, // Public route - no authentication required
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "colleges",
        element: <CollegesPage />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "interview-prep",
        element: <InterviewPrepPage />,
      },
      {
        path: "email-templates",
        element: <EmailTemplatesPage />,
      },
      {
        path: "engineering-exams",
        element: <EngineeringExamsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />, // Protected route with MemberProtectedRoute wrapper inside component
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
