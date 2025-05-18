import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/ui/Loader';
import { FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Get redirect from URL if it exists
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect if logged in
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="container-custom pt-16 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaSignInAlt className="mr-2" /> Login
          </h2>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <Loader />
          ) : (
            <form onSubmit={onSubmit}>
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

              <div className="mb-6">
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mb-4">
                Login
              </button>

              <div className="text-center text-gray-600">
                New Customer?{' '}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                  className="text-primary-600 hover:underline"
                >
                  Register here
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;