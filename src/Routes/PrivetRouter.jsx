import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner';
import useAuth from '../Hooks/useAuth';

const PrivetRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivetRouter;
