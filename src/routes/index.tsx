import DashboardLayout from "@/components/layout/dashboard-layout";
import AdminDashboardPage from "@/pages/admin/dashboard";
import AdminModulePage from "@/pages/admin/dashboard/modules";
import AssessmentPage from "@/pages/assessment";
import SignInPage from "@/pages/auth/signin";
import CareerSuccessPotentialPage from "@/pages/career-success-potential";
import ComparisonPage from "@/pages/comparison";
import DashboardPage from "@/pages/dashboard";
import AdminUserPage from "@/pages/employee";
import EmployeeDetailPage from "@/pages/employee-detail";
import LandingPage from "@/pages/landing";
import LeadershipPage from "@/pages/leadership";
import NotFound from "@/pages/not-found";
import ProfilePage from "@/pages/profile";
import TestPage from "@/pages/test";
import { Suspense } from "react";
import { Navigate, Outlet, redirect, useRoutes } from "react-router-dom";

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
      loader: () => {
        if (!localStorage.getItem("access_token")) {
          return redirect("/login");
        } else {
          return null;
        }
      },
      children: [
        {
          element: <DashboardPage />,
          index: true,
        },
        {
          path: "/dashboard/admin",
          element: <AdminDashboardPage />,
        },
        {
          path: "/dashboard/admin/user",
          element: <AdminUserPage />,
        },
        {
          path: "/dashboard/admin/modules",
          element: <AdminModulePage />,
        },
        {
          path: "/dashboard/leadership",
          element: <LeadershipPage />,
        },
        {
          path: "/dashboard/:assessmentId",
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
      loader: () => {
        if (localStorage.getItem("access_token")) {
          return redirect("/dashboard");
        } else {
          return null;
        }
      },
    },
    {
      path: "/login",
      element: <SignInPage />,
      loader: () => {
        if (localStorage.getItem("access_token")) return redirect("/dashboard");
        return null;
      },
    },
    {
      path: "/dashboard/:assessmentId/test/:sectionId",
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

  // should change to use createBrowserRouter instead so loader can work
  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
