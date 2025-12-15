import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import Logo from '../../Components/Logo';

const PostTuition = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const stusentRegion = useWatch({ control, name: 'studentRegion' });

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtsByRegion = (region) => {
    const regionDistrics = serviceCenters.filter((c) => c.region === region);
    return regionDistrics.map((d) => d.district);
  };

  const handlePostTuition = (data) => {
    // SweetAlert confirm
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to post this tuition!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, post it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('Form Data:', data);
        // Swal.fire({
        //   title: 'Posted!',
        //   text: 'Your tuition has been posted successfully.',
        //   icon: 'success',
        // });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-3xl p-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <Logo />
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight
                         bg-clip-text text-transparent
                         bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                         drop-shadow-lg"
          >
            Post New Tuition
          </h1>
          <p className="italic text-gray-500 mt-3">
            Fill in the details below to find the best tutor
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handlePostTuition)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* === Basic Info Fieldset === */}
          <fieldset
            className="md:col-span-2 border-2 border-blue-400 rounded-2xl
                               p-6 bg-gradient-to-r from-white via-blue-50 to-white
                               shadow-xl hover:shadow-2xl transition duration-300"
          >
            <legend className="uppercase tracking-wide text-lg font-bold text-blue-700 px-2">
              Basic Info
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 3,
                      message: 'Name must be at least 3 characters',
                    },
                  })}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 border rounded-xl placeholder-gray-400 italic
                focus:outline-none focus:ring-4 focus:ring-blue-200
                focus:border-blue-400 transition duration-300 ease-in-out ${
                  errors.name ? 'border-red-500' : ''
                }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  })}
                  placeholder="e.g. student@email.com"
                  className={`w-full px-4 py-3 border rounded-xl placeholder-gray-400 italic
                focus:outline-none focus:ring-4 focus:ring-blue-200
                focus:border-blue-400 transition duration-300 ease-in-out ${
                  errors.email ? 'border-red-500' : ''
                }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    minLength: {
                      value: 11,
                      message: 'Phone number must be at least 11 digits',
                    },
                  })}
                  placeholder="e.g. 01XXXXXXXXX"
                  className={`w-full px-4 py-3 border rounded-xl placeholder-gray-400 italic
                focus:outline-none focus:ring-4 focus:ring-blue-200
                focus:border-blue-400 transition duration-300 ease-in-out ${
                  errors.phone ? 'border-red-500' : ''
                }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  placeholder="Your Subjects Name"
                  className={`w-full px-4 py-3 border rounded-xl placeholder-gray-400 italic
                              focus:outline-none focus:ring-4 focus:ring-blue-200
                              focus:border-blue-400 transition duration-300 ease-in-out ${
                                errors.subject ? 'border-red-500' : ''
                              }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Class
                </label>
                <input
                  type="text"
                  {...register('class', { required: 'Class is required' })}
                  placeholder="e.g. Class 8"
                  className={`w-full px-4 py-3 border rounded-xl placeholder-gray-400 italic
                              focus:outline-none focus:ring-4 focus:ring-blue-200
                              focus:border-blue-400 transition duration-300 ease-in-out ${
                                errors.class ? 'border-red-500' : ''
                              }`}
                />
                {errors.class && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.class.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* === Location & Budget Fieldset === */}
          <fieldset
            className="md:col-span-2 border-2 border-green-400 rounded-2xl
                               p-6 bg-gradient-to-r from-white via-green-50 to-white
                               shadow-xl hover:shadow-2xl transition duration-300"
          >
            <legend className="uppercase tracking-wide text-lg font-bold text-green-700 px-2">
              Location & Budget
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Student Region */}
              <fieldset className="w-full">
                <legend className="block text-sm font-medium text-gray-600 mb-1">
                  Student Region
                </legend>
                <select
                  {...register('studentRegion')}
                  defaultValue="Pick a region"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
               text-gray-700
               focus:outline-none focus:ring-4 focus:ring-purple-200
               focus:border-purple-400 transition duration-300"
                >
                  <option disabled>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Student District */}
              <fieldset className="w-full">
                <legend className="block text-sm font-medium text-gray-600 mb-1">
                  Student District
                </legend>
                <select
                  {...register('studentDistrict')}
                  defaultValue="Pick a district"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
               text-gray-700
               focus:outline-none focus:ring-4 focus:ring-purple-200
               focus:border-purple-400 transition duration-300"
                >
                  <option disabled>Pick a district</option>
                  {districtsByRegion(stusentRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Monthly Budget (৳)
                </label>
                <input
                  type="number"
                  {...register('budget', {
                    required: 'Budget is required',
                    min: { value: 1000, message: 'Minimum budget is 1000' },
                  })}
                  placeholder="e.g. 6000"
                  className={`w-full px-4 py-3 border rounded-xl placeholder-gray-400 italic
                              focus:outline-none focus:ring-4 focus:ring-green-200
                              focus:border-green-400 transition duration-300 ease-in-out ${
                                errors.budget ? 'border-red-500' : ''
                              }`}
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.budget.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* === Preferences Fieldset === */}
          <fieldset
            className="md:col-span-2 border-2 border-purple-400 rounded-2xl
                               p-6 bg-gradient-to-r from-white via-purple-50 to-white
                               shadow-xl hover:shadow-2xl transition duration-300"
          >
            <legend className="uppercase tracking-wide text-lg font-bold text-purple-700 px-2">
              Preferences
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Days */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Days Per Week
                </label>
                <select
                  {...register('days', {
                    required: 'Please select number of days',
                  })}
                  className={`w-full px-4 py-3 border rounded-xl
                              focus:outline-none focus:ring-4 focus:ring-purple-200
                              focus:border-purple-400 transition duration-300 ${
                                errors.days ? 'border-red-500' : ''
                              }`}
                >
                  <option value="">Select Days</option>
                  <option>3 Days</option>
                  <option>4 Days</option>
                  <option>5 Days</option>
                  <option>6 Days</option>
                </select>
                {errors.days && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.days.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tutor Gender Preference
                </label>
                <select
                  {...register('gender', {
                    required: 'Please select tutor gender',
                  })}
                  className={`w-full px-4 py-3 border rounded-xl
                              focus:outline-none focus:ring-4 focus:ring-purple-200
                              focus:border-purple-400 transition duration-300 ${
                                errors.gender ? 'border-red-500' : ''
                              }`}
                >
                  <option value="">Select Gender</option>
                  <option>Any</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Tuition Type */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tuition Type
                </label>
                <select
                  {...register('type', {
                    required: 'Please select tuition type',
                  })}
                  className={`w-full px-4 py-3 border rounded-xl
                              focus:outline-none focus:ring-4 focus:ring-purple-200
                              focus:border-purple-400 transition duration-300 ${
                                errors.type ? 'border-red-500' : ''
                              }`}
                >
                  <option value="">Select Type</option>
                  <option>Home</option>
                  <option>Online</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Additional Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Additional Details
                </label>
                <textarea
                  {...register('details', {
                    maxLength: { value: 500, message: 'Max 500 characters' },
                  })}
                  rows="4"
                  placeholder="Mention timing, syllabus, special requirements..."
                  className={`w-full px-4 py-3 border rounded-xl resize-none
                              placeholder-gray-400 italic
                              focus:outline-none focus:ring-4 focus:ring-pink-200
                              focus:border-pink-400 transition duration-300 ${
                                errors.details ? 'border-red-500' : ''
                              }`}
                ></textarea>
                {errors.details && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.details.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <input
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700
                         text-white font-semibold rounded-xl
                         shadow-lg hover:shadow-2xl transform hover:scale-105
                         transition duration-300 ease-in-out"
              value="post tuition"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;
