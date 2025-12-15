import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import logo1 from '../../../assets/logo5.png';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signinUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (data) => {
    console.log(data);
    signinUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-bold">Wellcome Back</h3>
      <p className=" text-center">
        <img src={logo1} className="w-[80px] mx-auto" alt="" />
      </p>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-500 text-sm">password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500 text-sm">
              password must be 6 character or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          New to ETUTION.BD
          <Link
            state={location.state}
            className="text-primary hover:text-secondary"
            to="/register"
          >
            Register
          </Link>{' '}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
