import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import logo from '../../../assets/logo5.png';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistation = (data) => {
    const proFileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // store image data
        const formData = new FormData();
        formData.append('image', proFileImg);

        // get the photo in form data
        const img_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(img_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;
          const usersInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post('/userInfo', usersInfo).then((res) => {
            if (res.data.insertedId) {
              console.log('user created in the database ');
            }
          });
          // update user frofile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log('user profile updated');
              navigate(location?.state || '/');
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-bold">Wellcome To</h3>
      <p className=" text-center">
        <img src={logo} className="w-[80px] mx-auto" alt="" />
      </p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistation)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === 'required' && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
          {/* Image Fild */}
          <label className="label">Photo</label>

          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.name?.type === 'required' && (
            <p className="text-red-500 text-sm">Photo is required</p>
          )}
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
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, and one special character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account
          <Link
            state={location.state}
            className="text-primary hover:text-secondary"
            to="/login"
          >
            Login
          </Link>{' '}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
