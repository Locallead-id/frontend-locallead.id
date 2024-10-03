import DashboardLayout from "@/components/layout/dashboard-layout";
import AssessmentPage from "@/pages/assessment";
import SignInPage from "@/pages/auth/signin";
import CareerSuccessPotentialPage from "@/pages/career-success-potential";
import ComparisonPage from "@/pages/comparison";
import DashboardPage from "@/pages/dashboard";
import EmployeePage from "@/pages/employee";
import EmployeeDetailPage from "@/pages/employee-detail";
import LandingPage from "@/pages/landing";
import LeadershipPage from "@/pages/leadership";
import NotFound from "@/pages/not-found";
import ProfilePage from "@/pages/profile";
import TestPage from "@/pages/test";
import { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: "/dashboard",
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true,
        },
        {
          path: "/dashboard/leadership",
          element: <LeadershipPage />,
        },
        {
          path: "/dashboard/:assessment",
          element: <AssessmentPage />,
        },
        {
          path: "/dashboard/career",
          element: <CareerSuccessPotentialPage />,
        },
        {
          path: "/dashboard/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/",
      element: <LandingPage />,
      index: true,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "/dashboard/:assessment/test/:id",
      element: <TestPage />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to='/404' replace />,
    },
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
