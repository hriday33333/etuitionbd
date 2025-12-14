import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';

const PrivetRouter = ({ Children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return Children;
};

export default PrivetRouter;
