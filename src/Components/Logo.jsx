import { Link } from 'react-router';
import logo from '../assets/logo5.png';
const Logo = () => {
  return (
    <Link to="/">
      <div className="w-[110px] flex items-end  ">
        <img src={logo} alt="" />
      </div>
    </Link>
  );
};

export default Logo;
