import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: studentInfo = [] } = useQuery({
    queryKey: ['studentInfo', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/studentInfo?deliveryStatus=pending');
      return res.data;
    },
  });
  return (
    <div>
      <h2>Applied Tutors: {studentInfo.length}</h2>
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
            {studentInfo.map((student, index) => (
              <tr key={student._id}>
                <th>{index + 1}</th>
                <td>{student.name}</td>
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

export default AppliedTutors;
