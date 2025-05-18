import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Loader from '../components/ui/Loader';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate(redirect);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, redirect, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <div className="container-custom pt-16 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaUser className="mr-2" /> Register
          </h2>
        </div>

        <div className="p-6">
          {isLoading ? (
            <Loader />
          ) : (
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="input"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder="Confirm password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mb-4">
                Register
              </button>

              <div className="text-center text-gray-600">
                Already have an account?{' '}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  className="text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;