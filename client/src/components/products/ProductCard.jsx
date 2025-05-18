import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      })
    );
    
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="card group">
      {/* Product Image with hover zoom effect */}
      <div className="relative overflow-hidden h-48 md:h-56">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Quick add to cart button */}
        {product.countInStock > 0 && (
          <button
            onClick={addToCartHandler}
            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-50"
            aria-label="Add to cart"
          >
            <FaShoppingCart className="text-primary-600" />
          </button>
        )}
        
        {/* Stock badge */}
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
        
        {/* Featured badge */}
        {product.isFeatured && (
          <div className="absolute top-2 left-2 bg-secondary-400 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-medium text-lg mb-1 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400 mr-2">
            <FaStar />
            <span className="ml-1 text-gray-700">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.numReviews} reviews)</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800">₹{product.price.toFixed(2)}</span>
          
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`btn btn-sm ${
              product.countInStock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;