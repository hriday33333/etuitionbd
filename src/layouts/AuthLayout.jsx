import { Link, Outlet } from 'react-router';
import logo from '../assets/logo1.png';

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto justify-center items-center px-4">
      <div className="flex items-center justify-between flex-row gap-2 sm:gap-4">
        <div className="text-sm sm:text-base">
          <Link to={'/'}>Back to Home</Link>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-10 mt-4">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="" className="w-full max-w-sm md:max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
