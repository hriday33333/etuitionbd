import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AppliedTutor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: students = [] } = useQuery({
    queryKey: ['studentInfo', user?.email, 'tuitor_applied'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/studentInfo/tutor?tutorEmail=${user.email}&deliveryStatus=tuitor_applied`
      );
      return res.data;
    },
  });

  return (
    <div>
      <h2>Tuitor Applyed:{students.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr key={student.tutorId || i}>
                <th>{i + 1}</th>
                <td>{student.tutorName}</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTutor;
