import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const tutorModalRef = useRef();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const { data: payments = [], refetch: studentsRefatch } = useQuery({
    queryKey: ['studentInfo', 'deliveryStatus', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/studentInfo?deliveryStatus=pending');
      return res.data;
    },
  });

  const { data: tutors = [] } = useQuery({
    queryKey: ['tutor', selectedPayment?.studentDistrict, 'available'],
    enabled: !!selectedPayment?.studentDistrict,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutorApplications?status=approved&district=${selectedPayment.studentDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  const openModalTutor = (payment) => {
    setSelectedPayment(payment);
    tutorModalRef.current.showModal();
  };

  const handleAppliedTutor = (tutor) => {
    const tutorApplyInfo = {
      tutorId: tutor._id,
      tutorEmail: tutor.email,
      tutorName: tutor.name,
      paymentId: selectedPayment._id,
    };
    axiosSecure
      .patch(`/studentInfo/${selectedPayment._id}`, tutorApplyInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          tutorModalRef.current.close();
          studentsRefatch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Tuitor has been applied`,
            timer: 2500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Applied Tutors: {payments.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
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
                <td>{index + 1}</td>
                <td>{payment.name}</td>
                <td>{payment.budget}</td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td>{payment.studentRegion}</td>
                <td>{payment.studentDistrict}</td>
                <td>
                  <button
                    onClick={() => openModalTutor(payment)}
                    className="btn btn-secondary btn-sm text-black"
                  >
                    Applied Tutors
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <dialog
        ref={tutorModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Applied Tutors for {tutors?.length}
          </h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tutors.map((tutor, index) => (
                  <tr key={tutor._id}>
                    <th>{index + 1}</th>
                    <td>{tutor.name}</td>
                    <td>{tutor.email}</td>
                    <td>
                      <button
                        onClick={() => handleAppliedTutor(tutor)}
                        className="btn btn-secondary text-black btn-sm"
                      >
                        Applied
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AppliedTutors;
