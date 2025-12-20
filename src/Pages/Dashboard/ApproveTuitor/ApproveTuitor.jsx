import { useQuery } from '@tanstack/react-query';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa6';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ApproveTuitor = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: tuitors = [] } = useQuery({
    queryKey: ['tutorApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutorApplications');
      return res.data;
    },
  });

  // Update tutor status
  const updateTuitorStatus = (tuitor, status) => {
    const updateInfo = { status: status, email: tuitor.email };
    axiosSecure.patch(`/tutorApplications/${tuitor._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Tutor status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (tuitor) => updateTuitorStatus(tuitor, 'approved');
  const handleRejection = (tuitor) => updateTuitorStatus(tuitor, 'rejected');

  // View tutor details
  const handleView = async (tuitor) => {
    try {
      const res = await axiosSecure.get(`/tutorApplications/${tuitor._id}`);
      if (res.data.success) {
        const t = res.data.tutor;
        Swal.fire({
          title: `<strong>${t.name}</strong>`,
          html: `
            <p><b>Email:</b> ${t.email}</p>
            <p><b>Status:</b> ${t.status}</p>
            <p><b>Work Status:</b> ${t.workStatus || 'pending'}</p>
            <p><b>Details:</b> ${t.details || 'N/A'}</p>
          `,
          icon: 'info',
          confirmButtonText: 'Close',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Cannot fetch tutor details', 'error');
    }
  };

  // Delete tutor application
  const handleDelete = (tuitor) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the tutor application!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tutorApplications/${tuitor._id}`);
          if (res.data.success) {
            refetch();
            Swal.fire('Deleted!', 'Tutor application has been deleted.', 'success');
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'Cannot delete tutor', 'error');
        }
      }
    });
  };

  return (
    <div>
      <h2>Approve Tutor Pending Approval: {tuitors.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tuitors.map((tuitor, index) => (
              <tr key={tuitor._id}>
                <td>{index + 1}</td>
                <td>{tuitor.name}</td>
                <td>{tuitor.email}</td>
                <td className={tuitor.status === 'approved' ? 'text-green-800' : 'text-red-800'}>
                  {tuitor.status}
                </td>
                <td>{tuitor.workStatus || 'pending'}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleView(tuitor)} className="btn btn-sm btn-warning">
                    <FaRegEye />
                  </button>
                  <button onClick={() => handleApproval(tuitor)} className="btn btn-sm btn-success">
                    <FaUserCheck />
                  </button>
                  <button onClick={() => handleRejection(tuitor)} className="btn btn-sm btn-error">
                    <IoPersonRemoveSharp />
                  </button>
                  <button onClick={() => handleDelete(tuitor)} className="btn btn-sm btn-danger">
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
