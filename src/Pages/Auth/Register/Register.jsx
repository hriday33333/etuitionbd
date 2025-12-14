import { useForm } from 'react-hook-form';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistation = (data) => {
    console.log('after register', data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistation)}>
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
            {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
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
          {errors.password?.type === 'pattern' && (
            <p className="text-red-500 text-sm">
              Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
