import { useQuery } from '@tanstack/react-query';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaUserCheck } from 'react-icons/fa6';
import { FaRegEye } from "react-icons/fa";
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ApproveTuitor = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: tuitors = [] } = useQuery({
    queryKey: ['tutorApplications', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutorApplications');
      return res.data;
    },
  });

  const updateTuitorStatus = (tuitor, status) => {
    const updateInfo = { status: status, email: tuitor.email };
    axiosSecure
      .patch(`/tutorApplications/${tuitor._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `tuition Status is set to ${status}.`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  const handleApproval = (tuitor) => {
    updateTuitorStatus(tuitor, 'approved');
  };
  const handleRejection = (tuitor) => {
    updateTuitorStatus(tuitor, 'rejected');
  };

  return (
    <div>
      <h2>approve-tuitor pending approveval:{tuitors.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tuitors.map((tuitor, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{tuitor.name}</td>
                <td>{tuitor.email}</td>
                <td>
                  {
                    <p
                      className={`${
                        tuitor.status === 'approved'
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}
                    >
                      {tuitor.status}
                    </p>
                  }
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(tuitor)}
                    className="btn btn-secondary text-black btn-sm"
                  >
                    <FaRegEye />
                  </button>
                  <button
                    onClick={() => handleApproval(tuitor)}
                    className="btn btn-secondary text-black btn-sm"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(tuitor)}
                    className="btn btn-secondary text-black btn-sm"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn btn-secondary text-black btn-sm">
                    <AiTwotoneDelete />
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

export default ApproveTuitor;
