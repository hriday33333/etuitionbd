import logo from '../assets/logo1.png';
const Logo = () => {
  return (
    <div className="w-[75px] flex items-end  ">
      <img src={logo} alt="" />
      <h1 className="font-bold text-primary text-xl -ms-1 mb-2">eTuition</h1>
    </div>
  );
};

export default Logo;
