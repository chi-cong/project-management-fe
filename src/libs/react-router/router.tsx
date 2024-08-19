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
import { AccountTrash } from "src/pages/v2/trash/account";
import { ProjectTrash } from "src/pages/v2/trash/project";
import { DepartmentTrash } from "src/pages/v2/trash/department";

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
            path: "super_admin",
            async lazy() {
              const { SuperAdmin } = await import(
                "src/pages/v2/dashboard/super-admin"
              );
              return { Component: SuperAdmin };
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
              { path: "project-trash", element: <ProjectTrash /> },
              { path: "account-trash", element: <AccountTrash /> },
              { path: "department-trash", element: <DepartmentTrash /> },
            ],
          },
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
              { path: "project-trash", element: <ProjectTrash /> },
              { path: "account-trash", element: <AccountTrash /> },
              { path: "department-trash", element: <DepartmentTrash /> },
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
              {
                path: "password",
                element: <Password />,
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
      {
        path: "test-route",
        element: <TestRoute />,
      },
    ],
  },
]);
