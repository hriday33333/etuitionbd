import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Logo from '../../Components/Logo';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Tutor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  /* ===== Loader Data (Region / District) ===== */
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const tutorRegion = useWatch({ control, name: 'region' });

  const districtsByRegion = (region) => {
    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  /* ===== Submit Handler ===== */
  const handleTutorApply = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to apply as a tutor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Apply',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/tutorApplications', data).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              icon: 'success',
              title: 'Application Submitted',
              text: 'Admin will review your application',
              timer: 2000,
              showConfirmButton: false,
            });
            // navigate('/dashboard/approve-tuitor');
          }
        });
      }
    });
    console.log('Tutor Application Data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-3xl p-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <Logo />
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Tutor Application
          </h1>
          <p className="italic text-gray-500 mt-3">
            Apply to become a verified tutor
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleTutorApply)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* ===== Personal Info ===== */}
          <fieldset className="md:col-span-2 border-2 border-indigo-400 rounded-2xl p-6 bg-indigo-50">
            <legend className="font-bold text-indigo-700 px-2">
              Personal Information
            </legend>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  {...register('name')}
                  readOnly
                  value={user?.displayName}
                  className="w-full px-4 py-3 border rounded-xl bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  {...register('email')}
                  readOnly
                  value={user?.email}
                  className="w-full px-4 py-3 border rounded-xl bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  placeholder="01XXXXXXXXX"
                  className={`w-full px-4 py-3 border rounded-xl ${
                    errors.phone && 'border-red-500'
                  }`}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  {...register('gender', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* ===== Education ===== */}
          <fieldset className="md:col-span-2 border-2 border-green-400 rounded-2xl p-6 bg-green-50">
            <legend className="font-bold text-green-700 px-2">Education</legend>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <select
                {...register('education', { required: true })}
                className="px-4 py-3 border rounded-xl"
              >
                <option value="">Highest Education</option>
                <option>SSC</option>
                <option>HSC</option>
                <option>Bachelor</option>
                <option>Master</option>
              </select>

              <input
                {...register('institute', { required: true })}
                placeholder="Institute Name"
                className="px-4 py-3 border rounded-xl"
              />
            </div>
          </fieldset>

          {/* ===== Teaching Info ===== */}
          <fieldset className="md:col-span-2 border-2 border-purple-400 rounded-2xl p-6 bg-purple-50">
            <legend className="font-bold text-purple-700 px-2">
              Teaching Information
            </legend>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <input
                {...register('subjects', { required: true })}
                placeholder="Subjects (Math, English)"
                className="px-4 py-3 border rounded-xl"
              />

              <input
                {...register('classes', { required: true })}
                placeholder="Classes (6–10 / HSC)"
                className="px-4 py-3 border rounded-xl"
              />

              <select
                {...register('experience', { required: true })}
                className="px-4 py-3 border rounded-xl"
              >
                <option value="">Experience</option>
                <option>Fresher</option>
                <option>1–2 Years</option>
                <option>3+ Years</option>
              </select>

              <input
                type="number"
                {...register('salary', { required: true })}
                placeholder="Expected Salary"
                className="px-4 py-3 border rounded-xl"
              />

              {/* Region */}
              <select
                {...register('region', { required: true })}
                className="px-4 py-3 border rounded-xl"
              >
                <option value="">Select Region</option>
                {regions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>

              {/* District */}
              <select
                {...register('district', { required: true })}
                className="px-4 py-3 border rounded-xl"
              >
                <option value="">Select District</option>
                {districtsByRegion(tutorRegion).map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>

              <textarea
                {...register('about')}
                rows="4"
                placeholder="About yourself"
                className="md:col-span-2 px-4 py-3 border rounded-xl resize-none"
              />
            </div>
          </fieldset>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600
                         text-white font-semibold rounded-xl shadow-lg
                         hover:scale-105 transition"
            >
              Apply as Tutor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tutor;
