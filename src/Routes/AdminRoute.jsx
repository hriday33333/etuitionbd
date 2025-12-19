import Forbidden from '../Components/Forbidden';
import LoadingSpinner from '../Components/LoadingSpinner';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== 'admin') {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
