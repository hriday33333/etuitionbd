import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UsersManagment = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userInfo`);
      return res.data;
    },
  });

  /* ===== Make Admin ===== */
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to make ${user.displayName} an Admin`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Make Admin',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/userInfo/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${user.displayName} Mark as an Admin`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  /* ===== Remove Admin ===== */
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to remove ${user.displayName} from Admin`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: 'user' };
        axiosSecure.patch(`/userInfo/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${user.displayName} remove from an Admin`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl">Users Managment:{users.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="users photo" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-400 text-base-content btn-sm"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-secondary text-base-content btn-sm"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>

                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagment;
