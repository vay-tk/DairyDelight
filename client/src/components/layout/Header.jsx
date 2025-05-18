import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaChevronDown } from 'react-icons/fa';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/?keyword=${searchKeyword}`);
      setIsOpen(false);
    } else {
      navigate('/');
    }
  };
  
  // Handle logout
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-700 flex items-center">
            <span className="text-secondary-500">Dairy</span>Delight
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Categories dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-primary-700"
                onClick={toggleDropdown}
              >
                Categories <FaChevronDown className="ml-1 text-xs" />
              </button>
              
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  <Link 
                    to="/?category=milk"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Milk
                  </Link>
                  <Link 
                    to="/?category=cheese"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Cheese
                  </Link>
                  <Link 
                    to="/?category=butter"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Butter
                  </Link>
                  <Link 
                    to="/?category=curd"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Curd
                  </Link>
                  <Link 
                    to="/?category=yogurt"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Yogurt
                  </Link>
                  <Link 
                    to="/?category=paneer"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Paneer
                  </Link>
                  <Link 
                    to="/?category=ghee"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Ghee
                  </Link>
                </div>
              )}
            </div>
            
            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-56"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
          </nav>
          
          {/* Right Side Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="flex items-center text-gray-700 hover:text-primary-700">
              <FaShoppingCart className="mr-2" />
              Cart
              {cartItems.length > 0 && (
                <span className="ml-1 bg-secondary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-primary-700">
                  <FaUser className="mr-2" />
                  {user.name.split(' ')[0]}
                  <FaChevronDown className="ml-1 text-xs" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                    My Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-primary-700">
                <FaUser className="mr-2" />
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
            
            {/* Mobile Menu Items */}
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-primary-700"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary-700"
                  onClick={toggleDropdown}
                >
                  Categories
                  <FaChevronDown className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showDropdown && (
                  <ul className="mt-2 pl-4 space-y-2">
                    <li>
                      <Link
                        to="/?category=milk"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => {
                          setIsOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        Milk
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?category=cheese"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => {
                          setIsOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        Cheese
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?category=butter"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => {
                          setIsOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        Butter
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?category=curd"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => {
                          setIsOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        Curd
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?category=yogurt"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => {
                          setIsOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        Yogurt
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?category=paneer"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => {
                          setIsOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        Paneer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?category=ghee"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => {
                          setIsOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        Ghee
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center text-gray-700 hover:text-primary-700"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingCart className="mr-2" />
                  Cart
                  {cartItems.length > 0 && (
                    <span className="ml-1 bg-secondary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  )}
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="block text-gray-700 hover:text-primary-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="block text-gray-700 hover:text-primary-700"
                      onClick={() => setIsOpen(false)}
                    >
                      My Orders
                    </Link>
                  </li>
                  {user.role === 'admin' && (
                    <li>
                      <Link
                        to="/admin"
                        className="block text-gray-700 hover:text-primary-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setIsOpen(false);
                      }}
                      className="text-gray-700 hover:text-primary-700"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="flex items-center text-gray-700 hover:text-primary-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="mr-2" />
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;