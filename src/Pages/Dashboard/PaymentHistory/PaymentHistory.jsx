import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payment = [] } = useQuery({
    queryKey: ['payment', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Payment history: {payment.length}
      </h1>

      {/* বড় ডিভাইসে টেবিল */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Transaction Id</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((pay, index) => (
              <tr key={pay._id}>
                <td>{index + 1}</td>
                <td>{pay.studentName}</td>
                <td>$ {pay.amount}</td>
                <td>{pay.transsactionId}</td>
                <td>{pay.paidAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ছোট ডিভাইসে কার্ড */}
      <div className="md:hidden space-y-4 px-4">
        {payment.map((pay, index) => (
          <div
            key={pay._id}
            className="border rounded-xl shadow-lg p-6 bg-gradient-to-r from-indigo-50 to-purple-100 hover:scale-[1.02] transition-transform"
          >
            <h2 className="font-bold text-lg text-indigo-700">
              {index + 1}. {pay.studentName}
            </h2>
            <p className="text-gray-600">Amount: $ {pay.amount}</p>
            <p className="text-gray-600">
              Transaction Id: {pay.transsactionId}
            </p>
            <p className="text-gray-600">Paid At: {pay.paidAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
