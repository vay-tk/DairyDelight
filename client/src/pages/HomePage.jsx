import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopProducts, getFeaturedProducts } from '../redux/slices/productSlice';
import ProductList from '../components/products/ProductList';
import ProductCard from '../components/products/ProductCard';
import Loader from '../components/ui/Loader';
import { FaTruck, FaLeaf, FaRegCreditCard, FaShieldAlt } from 'react-icons/fa';

const HomePage = () => {
  const dispatch = useDispatch();
  const { topProducts, featuredProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getTopProducts());
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="">
      {/* Hero Banner */}
      {/* <div className="bg-primary-100 py-16 md:py-24">
        <div className="container-custom flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Fresh Dairy Delivered <span className="text-primary-600">Right to Your Door</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Experience the goodness of farm-fresh dairy products with our premium selection of milk, 
              cheese, butter, yogurt, and more.
            </p>
            <div className="flex space-x-4">
              <Link to="/" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
              <Link to="/?category=milk" className="btn btn-outline btn-lg">
                Explore Products
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/8407961/pexels-photo-8407961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Dairy Products"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div> */}



       {/* All Products */}
      <div className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          <ProductList />
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link 
              to="/?category=milk" 
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <img 
                src="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Milk" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-semibold text-lg">Milk</h3>
              </div>
            </Link>
            
            <Link 
              to="/?category=cheese" 
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <img 
                src="https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Cheese" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-semibold text-lg">Cheese</h3>
              </div>
            </Link>
            
            <Link 
              to="/?category=butter" 
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <img 
                src="https://images.pexels.com/photos/531334/pexels-photo-531334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Butter" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-semibold text-lg">Butter</h3>
              </div>
            </Link>
            
            <Link 
              to="/?category=yogurt" 
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFq8gDrkSxAsMwBBotp2QeCyNABTk7I5Zn_g&s" 
                alt="Yogurt" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-semibold text-lg">Yogurt</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>

      

     

       {/* Featured Products Section */}
      <div className="py-12 bg-cream">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {featuredProducts && featuredProducts.length > 0 ? (
                <div className="product-grid">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No featured products available</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary-50 p-4 rounded-full mb-4">
                <FaTruck className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on orders above ₹500</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary-50 p-4 rounded-full mb-4">
                <FaLeaf className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Organic Products</h3>
              <p className="text-gray-600">100% organic and fresh dairy products</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary-50 p-4 rounded-full mb-4">
                <FaRegCreditCard className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple secure payment options</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary-50 p-4 rounded-full mb-4">
                <FaShieldAlt className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Satisfaction guaranteed or money back</p>
            </div>
          </div>
        </div>
      </div>

     

      {/* Top Rated Products */}
      <div className="py-12 bg-primary-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Rated Products</h2>
          
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {topProducts && topProducts.length > 0 ? (
                <div className="product-grid">
                  {topProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No top rated products available</p>
              )}
            </>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;