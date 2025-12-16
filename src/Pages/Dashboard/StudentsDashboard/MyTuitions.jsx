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
  const { data: studentInfo = [] } = useQuery({
    queryKey: ['MyTuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/studentInfo?email=${user.email}`);
      return res.data;
    },
  });

  const handleStudentInfoDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/studentInfo/${id}`)
        .then(res=>{
          console.log(res.data)
          if(res.data.deletedCount){
             Swal.fire({
          title: "Deleted!",
          text: "Your student Info requst has been deleted.",
          icon: "success"
        });
          }

        })


      }
    });
  };

  return (
    <div>
      <h1>all of my tuition:{studentInfo.length}</h1>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Budget (৳)</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentInfo.map((student, index) => (
              <tr key={student._id}>
                <th>{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.subject}</td>
                <td>{student.budget}</td>
                <td></td>
                <td>
                  <button className="btn btn-square hover:bg-secondary">
                    <FaRegEdit />
                  </button>
                  <button className="btn btn-square hover:bg-secondary">
                    <GrView />
                  </button>
                  <button
                    onClick={() => handleStudentInfoDelete(student._id)}
                    className="btn btn-square hover:bg-secondary"
                  >
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

export default MyTuitions;
