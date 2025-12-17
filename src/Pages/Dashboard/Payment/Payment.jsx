import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Payment = () => {
  const { studentId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: student } = useQuery({
    queryKey: ['studentInfo', studentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/studentInfo/${studentId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      budget: student.budget,
      studentId: student._id,
      senderEmail: student.email,
      studentName: student.name,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h1>Please pay:{student.budget}</h1>
      <button
        onClick={handlePayment}
        className="btn-sm btn btn-secondary text-black"
      >
        pay
      </button>
    </div>
  );
};

export default Payment;
