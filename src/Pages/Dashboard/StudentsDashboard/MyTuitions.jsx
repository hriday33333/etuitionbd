import { useQuery } from '@tanstack/react-query';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: studentInfo = [], refetch } = useQuery({
    queryKey: ['MyTuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/studentInfo?email=${user.email}`);
      return res.data;
    },
  });

  const handleStudentInfoDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366F1', // Indigo
      cancelButtonColor: '#EF4444',  // Red
      confirmButtonText: 'Yes, delete it!',
      background: '#F3F4F6',         // Light gray background
      color: '#1F2937',              // Dark text
      customClass: {
        popup: 'rounded-xl shadow-2xl p-6',
        title: 'text-indigo-600 font-bold',
        confirmButton: 'px-6 py-2 rounded-lg',
        cancelButton: 'px-6 py-2 rounded-lg',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/studentInfo/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your student Info request has been deleted.',
              icon: 'success',
              confirmButtonColor: '#6366F1',
              background: '#F3F4F6',
              customClass: {
                popup: 'rounded-xl shadow-2xl p-6',
                title: 'text-green-600 font-bold',
              },
            });
          }
        });
      }
    });
  };

  const handlePayment = async (student) => {
    const paymentInfo = {
      budget: student.budget,
      studentId: student._id,
      senderEmail: student.email,
      studentName: student.name,
    };
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        All of my tuition: {studentInfo.length}
      </h1>

      {/* বড় ডিভাইসে টেবিল */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Budget (৳)</th>
              <th>Payment</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentInfo.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.subject}</td>
                <td>{student.budget}</td>
                <td>
                  {student.paymentStatus === 'paid' ? (
                    <span className="text-green-400">Paid ✅</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(student)}
                      className="btn btn-sm bg-indigo-400 text-white hover:bg-indigo-600"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{student.delevaryStatus}</td>
                <td className="flex gap-2">
                  <button className="btn btn-square bg-yellow-300 hover:bg-yellow-400">
                    <FaRegEdit />
                  </button>
                  <button className="btn btn-square bg-blue-300 hover:bg-blue-400">
                    <GrView />
                  </button>
                  <button
                    onClick={() => handleStudentInfoDelete(student._id)}
                    className="btn btn-square bg-red-400 hover:bg-red-600 text-white"
                  >
                    <AiTwotoneDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ছোট ডিভাইসে কার্ড */}
      <div className="md:hidden space-y-4 px-4">
        {studentInfo.map((student, index) => (
          <div
            key={student._id}
            className="border rounded-xl shadow-lg p-6 bg-gradient-to-r from-indigo-50 to-purple-100 hover:scale-[1.02] transition-transform"
          >
            <h2 className="font-bold text-lg text-indigo-700">
              {index + 1}. {student.name}
            </h2>
            <p className="text-gray-600">Class: {student.class}</p>
            <p className="text-gray-600">Subject: {student.subject}</p>
            <p className="text-gray-800 font-semibold">Budget: ৳{student.budget}</p>
            <p>
              Payment:{' '}
              {student.paymentStatus === 'paid' ? (
                <span className="text-green-500 font-bold">Paid ✅</span>
              ) : (
                <button
                  onClick={() => handlePayment(student)}
                  className="btn btn-sm bg-indigo-400 text-white hover:bg-indigo-600"
                >
                  Pay
                </button>
              )}
            </p>
            <p>Status: {student.delevaryStatus}</p>
            <div className="flex gap-3 mt-3">
              <button className="btn btn-sm bg-yellow-300 hover:bg-yellow-400">
                <FaRegEdit />
              </button>
              <button className="btn btn-sm bg-blue-300 hover:bg-blue-400">
                <GrView />
              </button>
              <button
                onClick={() => handleStudentInfoDelete(student._id)}
                className="btn btn-sm bg-red-400 hover:bg-red-600 text-white"
              >
                <AiTwotoneDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTuitions;
