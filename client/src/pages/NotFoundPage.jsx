import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="container-custom pt-24 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <Link to="/" className="btn btn-primary flex items-center space-x-2">
        <FaHome />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;