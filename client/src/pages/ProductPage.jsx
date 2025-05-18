import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaStar, FaMinus, FaPlus } from 'react-icons/fa';
import { getProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      })
    );
    navigate('/cart');
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{message}</Message>;

  return (
    <div className="container-custom pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.numReviews} reviews
            </span>
          </div>

          <div className="text-2xl font-bold text-primary-600">
            ₹{product.price}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-b py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Status:</span>
              <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-medium text-lg">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="w-full btn btn-primary flex items-center justify-center space-x-2"
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;