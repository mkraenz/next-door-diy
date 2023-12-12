import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthenticatedApp from "../auth/AuthenticatedApp";
import LoginPage from "../auth/LoginPage";
import Calendar from "../calendar/Calendar";
import ErrorPage from "../components/ErrorPage";
import Layout from "../components/Layout";
import Test from "../test/Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        element: (
          <AuthenticatedApp>
            <Outlet />
          </AuthenticatedApp>
        ),
        children: [
          {
            path: "",
            element: <Test />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthenticatedApp>
        <Test />
      </AuthenticatedApp>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/calendar",
    element: (
      <AuthenticatedApp>
        <Calendar />
      </AuthenticatedApp>
    ),
  },
]);
