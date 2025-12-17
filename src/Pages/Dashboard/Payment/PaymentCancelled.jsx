import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div>
      <h1 className="text-4xl">Payment canclled</h1>
      <Link to="/dashboard/my-tuitions">
        <button className="btn btn-secondary text-black">try again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
