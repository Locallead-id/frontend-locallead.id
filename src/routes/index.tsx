import DashboardLayout from "@/components/layout/dashboard-layout";
import SignInPage from "@/pages/auth/signin";
import ComparisonPage from "@/pages/comparison";
import DashboardPage from "@/pages/dashboard";
import EmployeePage from "@/pages/employee";
import EmployeeDetailPage from "@/pages/employee-detail";
import NotFound from "@/pages/not-found";
import { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: "/",
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
          path: "employee",
          element: <EmployeePage />,
        },
        {
          path: "comparison",
          element: <ComparisonPage />,
        },

        {
          path: "employee/:id",
          element: <EmployeeDetailPage />,
        },
        // {
        //   path: "form",
        //   element: <FormPage />,
        // },
      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/login",
      element: <SignInPage />,
      index: true,
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
