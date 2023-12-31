import { useAuth } from '../hooks/auth';
import ErrorDisplay from './ErrorDisplay';
import Layout from './Layout';

const ErrorPage = () => {
  const { authenticated } = useAuth();
  if (!authenticated) return <ErrorDisplay />;
  return (
    <Layout>
      <ErrorDisplay />
    </Layout>
  );
};

export default ErrorPage;
