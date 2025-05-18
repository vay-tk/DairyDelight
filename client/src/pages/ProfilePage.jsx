import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Loader from '../components/ui/Loader';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        postalCode: user.address?.postalCode || '',
      });
    }

    if (isError) {
      toast.error(message);
    }
  }, [user, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
    };

    if (formData.password) {
      userData.password = formData.password;
    }

    dispatch(updateProfile(userData));
    toast.success('Profile updated successfully');
  };

  return (
    <div className="container-custom pt-24">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaUser className="mr-2" /> Profile
          </h2>
        </div>

        <div className="p-6">
          {isLoading ? (
            <Loader />
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label" htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="input"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="input"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="password">New Password</label>
                  <input
                    type="password"
                    className="input"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    placeholder="Leave blank to keep current"
                  />
                </div>

                <div>
                  <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="input"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    placeholder="Leave blank to keep current"
                  />
                </div>

                <div>
                  <label className="label" htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    className="input"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="street">Street Address</label>
                  <input
                    type="text"
                    className="input"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="city">City</label>
                  <input
                    type="text"
                    className="input"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="state">State</label>
                  <input
                    type="text"
                    className="input"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    className="input"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={onChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Update Profile
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;