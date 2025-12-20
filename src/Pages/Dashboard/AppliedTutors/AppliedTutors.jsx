import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ['studentInfo', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/studentInfo?deliveryStatus=pending');
      return res.data;
    },
  });
  return (
    <div>
      <h2>Applied Tutors: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Budget</th>
              <th>Created At</th>
              <th>Region</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.name}</td>
                <td>{payment.budget}</td>
                <td>{payment.createdAt}</td>
                <td>{payment.studentRegion}</td>
                <td>{payment.studentDistrict}</td>
                <td>
                  <button className="btn btn-secondary text-black">
                    Applied Tutors
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTutors;
