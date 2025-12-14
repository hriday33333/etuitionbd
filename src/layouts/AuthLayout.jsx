import { Outlet } from 'react-router';
import Logo from '../Components/Logo';
import img from '../assets/image1.png';

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <Logo></Logo>
      <div className="flex  items-center h-full p-3">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
