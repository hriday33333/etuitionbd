import Forbidden from '../Components/Forbidden';
import LoadingSpinner from '../Components/LoadingSpinner';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const TuitorRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== 'tuitor') {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default TuitorRoute;
