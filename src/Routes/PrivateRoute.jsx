import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
