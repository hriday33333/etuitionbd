import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for redirects

  // Form submit for email/password registration
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log('Firebase user:', user);

        // Update profile with name
        updateUserProfile(data.name, null)
          .then(() => {
            console.log('Profile updated');
            navigate('/'); // Redirect to Home
          })
          .catch((err) => console.log('Profile update error:', err));

        // Optional: send role and phone to backend
        console.log('Role:', data.role, 'Phone:', data.phone);
      })
      .catch((error) => console.log('Registration error:', error.message));
  };

  // Google login handler
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log('Google user:', result.user);
        // Optional: save user info to backend
        navigate('/'); // Redirect to Home
      })
      .catch((err) => console.log('Google login error:', err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block mb-2 text-sm">Role</label>
              <select
                id="role"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                {...register('role', { required: 'Role is required' })}
                defaultValue=""
              >
                <option value="" disabled>Select Role</option>
                <option value="Student">Student</option>
                <option value="Tutor">Tutor</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm">Phone</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Your Phone Number"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9]{10,15}$/, message: 'Enter a valid phone number' }
                })}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="text-sm mb-2 block">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: 'Password must include uppercase, lowercase, and a number' }
                })}
              />
              <div
                className="absolute right-3 top-10 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          <button type="submit" className="bg-primary w-full rounded-md py-3 text-white">
            Register
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="px-3 text-sm text-gray-400">Signup with social accounts</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div
          onClick={handleGoogleLogin}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline hover:text-primary text-gray-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
