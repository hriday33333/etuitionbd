import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: studentInfo = [] } = useQuery({
    queryKey: ['MyTuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/studentInfo?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>all of my tuition:{studentInfo.length}</h1>
    </div>
  );
};

export default MyTuitions;
