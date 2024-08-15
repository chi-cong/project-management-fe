import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login, ForgotPassword } from "src/pages";
import { UserInfo } from "src/pages/dashboard/user-info";
import { Accounts } from "src/pages/dashboard/accounts";
import { CardDepartmentss } from "src/components/card-departments";
import {
  V2,
  Login as LoginV2,
  ForgotPass,
  TestRoute,
  Dashboard as DashboardV2,
  AdminDepartment,
  AdminProject,
  Account,
  Profile,
} from "src/pages/v2";
import {
  ManagerDepartment,
  ManagerProjects,
  ManagerProject,
} from "src/pages/v2/dashboard/manager";
import App from "src/App";
import { Projects } from "src/pages/v2/projects";
import { Departments } from "src/pages/v2/departments";
import { Password } from "src/pages/v2/password";
import {
  Staff,
  StaffProject,
  StaffDepartment,
} from "src/pages/v2/dashboard/staff";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/test", element: <CardDepartmentss /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "user-info", element: <UserInfo /> },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/v2",
    element: <V2 />,
    children: [
      {
        path: "login",
        element: <LoginV2 />,
      },
      {
        path: "forgot-password",
        element: <ForgotPass />,
      },
      {
        path: "dashboard",
        element: <DashboardV2 />,
        children: [
          {
            path: "admin",
            async lazy() {
              const { Admin } = await import("src/pages/v2/dashboard/admin");
              return { Component: Admin };
            },
            children: [
              { path: "department/:id", element: <AdminDepartment /> },
              { path: "projects", element: <Projects /> },
              { path: "project/:id", element: <AdminProject /> },
              { path: "account", element: <Account /> },
              { path: "departments", element: <Departments /> },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "password",
                element: <Password />,
              },
            ],
          },
          {
            path: "manager",
            async lazy() {
              const { Manager } = await import(
                "src/pages/v2/dashboard/manager"
              );
              return { Component: Manager };
            },
            children: [
              {
                path: "department/:id",
                element: <ManagerDepartment />,
              },
              {
                path: "projects",
                element: <ManagerProjects />,
              },
              {
                path: "project/:id",
                element: <ManagerProject />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
            ],
          },
          {
            path: "staff",
            element: <Staff />,
            children: [
              { path: "department/:id", element: <StaffDepartment /> },
              { path: "projects", element: <Projects /> },
              { path: "project/:id", element: <StaffProject /> },
              { path: "departments", element: <Departments /> },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "password",
                element: <Password />,
              },
            ],
          },
        ],
      },
      // {
      //   path: "dashboard",
      //   element: <DashboardV2 />,
      //   children: [
      //     {
      //       path: "staff",
      //       element: <Staff />,
      //       children: [
      //         { path: "department/:id", element: <AdminDepartment /> },
      //         { path: "projects", element: <Projects /> },
      //         { path: "project/:id", element: <AdminProject /> },
      //         { path: "account", element: <Account /> },
      //         {
      //           path: "profile",
      //           element: <Profile />,
      //         },
      //         {
      //           path: "password",
      //           element: <Password />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "manager",
      //       element: <Manager />,
      //       children: [
      //         {
      //           path: "department/:id",
      //           element: <ManagerDepartment />,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
      {
        path: "test-route",
        element: <TestRoute />,
      },
    ],
  },
]);
