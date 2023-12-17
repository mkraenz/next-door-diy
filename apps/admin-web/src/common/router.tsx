import { Outlet, createBrowserRouter } from 'react-router-dom';
import AuthenticatedApp from '../auth/AuthenticatedApp';
import LoginPage from '../auth/LoginPage';
import ErrorPage from '../components/ErrorPage';
import Layout from '../components/Layout';
import FunctionsPage from '../functions/FunctionsPage';
import SubscriptionsPage from '../subscriptions/SubscriptionsPage';
import TestPage from '../test/TestPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: (
          <AuthenticatedApp>
            <Outlet />
          </AuthenticatedApp>
        ),
        children: [
          {
            path: '',
            element: <TestPage />,
          },
          {
            path: '/functions',
            element: <FunctionsPage />,
          },
          {
            path: '/subscriptions',
            element: <SubscriptionsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/signin',
    element: <LoginPage />,
  },
]);
